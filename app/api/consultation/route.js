import { Resend } from 'resend';
import { createServiceClient } from '@/lib/supabase';
import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Addresses ──
   Sending must use the Resend-verified lumeoutdoor.com domain, but that domain
   has no mailbox (no MX record). Drake's real inbox is on lumeoutdoorlighting.com,
   so lead notifications and customer replies route there. */
const SENDER_ADDRESS = 'Lume Outdoor Lighting <Drake@lumeoutdoor.com>';
const LEAD_INBOX_ADDRESS = 'Drake@lumeoutdoorlighting.com';
const SUPABASE_INSERT_TIMEOUT_MS = 8000;

/* ── Read logo once at module load ── */
const logoPath = path.join(process.cwd(), 'public', 'Lumepng.png');
const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

/* ── Brand tokens ── */
const BRAND_GREEN = '#1D4B26';
const LIGHT_GREEN = '#EBF2ED';

/* ── Escape HTML for email bodies ── */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── PDF Styles ── */
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: BRAND_GREEN,
  },
  logo: {
    width: 55,
    height: 55,
  },
  headerTextBlock: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
  },
  headerSubtitle: {
    fontSize: 9,
    color: '#888',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    width: 80,
    color: '#888',
    fontSize: 10,
  },
  infoValue: {
    fontSize: 10,
    color: '#333',
  },
  serviceCard: {
    backgroundColor: LIGHT_GREEN,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    marginBottom: 3,
  },
  serviceConfig: {
    fontSize: 10,
    color: '#555',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 15,
    marginBottom: 15,
  },
  notesBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  notesText: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#aaa',
  },
});

/* ── PDF Document Component ── */
function ConsultationPdf({ contactInfo, services, date }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={logoBase64} style={styles.logo} />
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>Consultation Summary</Text>
            <Text style={styles.headerSubtitle}>
              Lume Outdoor Lighting — {date}
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{contactInfo.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{contactInfo.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{contactInfo.phone}</Text>
        </View>
        {contactInfo.address ? (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{contactInfo.address}</Text>
          </View>
        ) : null}

        <View style={styles.divider} />

        {/* Services */}
        <Text style={styles.sectionTitle}>Selected Services</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceConfig}>{service.configSummary}</Text>
          </View>
        ))}

        {/* Notes */}
        {contactInfo.notes ? (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{contactInfo.notes}</Text>
            </View>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Lume Outdoor Lighting</Text>
          <Text style={styles.footerText}>{LEAD_INBOX_ADDRESS}</Text>
        </View>
      </Page>
    </Document>
  );
}

/* ── API Route Handler ── */
export async function POST(request) {
  try {
    const { contactInfo, services, attribution, transactionId } = await request.json();

    if (!contactInfo?.name || !contactInfo?.email || !contactInfo?.phone) {
      return Response.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 },
      );
    }

    if (!services?.length) {
      return Response.json(
        { error: 'At least one service must be selected.' },
        { status: 400 },
      );
    }

    const allowedAttributionKeys = [
      'gclid',
      'gbraid',
      'wbraid',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'first_seen_at',
      'last_seen_at',
      'landing_page',
    ];
    const leadAttribution = Object.fromEntries(
      allowedAttributionKeys
        .filter((key) => typeof attribution?.[key] === 'string')
        .map((key) => [key, attribution[key].trim().slice(0, 1000)]),
    );
    const leadTransactionId =
      typeof transactionId === 'string'
        ? transactionId.trim().slice(0, 100)
        : null;
    let submissionId = null;

    /* ── Persist to Supabase (graceful — emails still send on failure) ── */
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from('consultation_submissions')
        .insert({
          customer_name: contactInfo.name,
          customer_email: contactInfo.email,
          customer_phone: contactInfo.phone,
          customer_address: contactInfo.address || null,
          customer_notes: contactInfo.notes || null,
          services,
          proposal_data: {
            leadAttribution,
            leadTransactionId,
          },
        })
        .select('id')
        .abortSignal(AbortSignal.timeout(SUPABASE_INSERT_TIMEOUT_MS))
        .single();

      if (error) throw error;
      submissionId = data?.id || null;
    } catch (dbError) {
      console.error('Supabase insert error (non-blocking):', dbError);
    }

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    /* ── Generate PDF ── */
    const pdfBuffer = Buffer.from(
      await renderToBuffer(
        <ConsultationPdf
          contactInfo={contactInfo}
          services={services}
          date={date}
        />,
      ),
    );

    const safeFileName = contactInfo.name.replace(/[^a-zA-Z0-9]/g, '_');
    const pdfAttachment = {
      filename: `Lume_Consultation_${safeFileName}.pdf`,
      content: pdfBuffer,
    };

    const customerName = escapeHtml(contactInfo.name);
    const savedToDashboard = Boolean(submissionId);

    /* ── Lead email to Drake (sent first — it's the backup record when the DB save fails) ── */
    const serviceListHtml = services
      .map(
        (s) =>
          `<li style="margin-bottom: 6px;"><strong>${escapeHtml(s.name)}</strong> — ${escapeHtml(s.configSummary)}</li>`,
      )
      .join('');

    const leadEmailSubject = savedToDashboard
      ? `New Consultation Request — ${contactInfo.name}`
      : `⚠️ NOT SAVED TO DASHBOARD — New Consultation Request — ${contactInfo.name}`;

    const unsavedWarningHtml = savedToDashboard
      ? ''
      : `<div style="background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 6px; padding: 12px; margin-bottom: 20px; color: #991B1B;">
          <strong>This lead was not saved to the admin dashboard</strong> (database error). This email is the only copy — keep it.
        </div>`;

    const rawSubmissionHtml = savedToDashboard
      ? ''
      : `<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">Raw submission data (for re-entering into the dashboard):</p>
        <pre style="background: #f9f9f9; padding: 10px; font-size: 11px; white-space: pre-wrap; word-break: break-word;">${escapeHtml(
          JSON.stringify({ contactInfo, services, leadAttribution, leadTransactionId }, null, 2),
        )}</pre>`;

    const { error: leadEmailError } = await resend.emails.send({
      from: SENDER_ADDRESS,
      to: LEAD_INBOX_ADDRESS,
      replyTo: contactInfo.email,
      subject: leadEmailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${unsavedWarningHtml}
          <h2 style="color: ${BRAND_GREEN};">New Consultation Request</h2>
          <p style="color: #555;"><strong>Name:</strong> ${customerName}</p>
          <p style="color: #555;"><strong>Email:</strong> ${escapeHtml(contactInfo.email)}</p>
          <p style="color: #555;"><strong>Phone:</strong> ${escapeHtml(contactInfo.phone)}</p>
          ${contactInfo.address ? `<p style="color: #555;"><strong>Address:</strong> ${escapeHtml(contactInfo.address)}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <h3 style="color: ${BRAND_GREEN};">Services Requested</h3>
          <ul style="color: #555; line-height: 1.8;">${serviceListHtml}</ul>
          ${contactInfo.notes ? `<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" /><h3 style="color: ${BRAND_GREEN};">Notes</h3><p style="color: #555;">${escapeHtml(contactInfo.notes)}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">Full consultation summary PDF attached. Reply to this email to respond to the customer directly.</p>
          ${rawSubmissionHtml}
        </div>
      `,
      attachments: [pdfAttachment],
    });

    if (leadEmailError) {
      console.error('Lead notification email error:', leadEmailError);
    }

    /* ── Neither the dashboard nor Drake has this lead — fail loudly so the customer retries ── */
    if (!savedToDashboard && leadEmailError) {
      return Response.json(
        {
          error: `We couldn't submit your request right now. Please try again in a few minutes, or email us at ${LEAD_INBOX_ADDRESS}.`,
        },
        { status: 502 },
      );
    }

    /* ── Confirmation email to customer (non-blocking — the lead is already recorded) ── */
    const { error: customerEmailError } = await resend.emails.send({
      from: SENDER_ADDRESS,
      to: contactInfo.email,
      replyTo: LEAD_INBOX_ADDRESS,
      subject: 'Your Lume Outdoor Consultation Summary',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: ${BRAND_GREEN};">Thank you, ${customerName}!</h2>
          <p style="color: #555; line-height: 1.6;">
            We've received your outdoor lighting consultation request.
            Your consultation summary is attached as a PDF.
          </p>
          <p style="color: #555; line-height: 1.6;">
            A member of our team will review your selections and reach out
            to discuss next steps.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">
            Lume Outdoor Lighting<br />${LEAD_INBOX_ADDRESS}
          </p>
        </div>
      `,
      attachments: [pdfAttachment],
    });

    if (customerEmailError) {
      console.error('Customer confirmation email error:', customerEmailError);
    }

    return Response.json({
      success: true,
      submissionId,
      transactionId: leadTransactionId,
    });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return Response.json(
      { error: 'Failed to process consultation request.' },
      { status: 500 },
    );
  }
}
