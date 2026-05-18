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
          <Text style={styles.footerText}>Drake@lumeoutdoor.com</Text>
        </View>
      </Page>
    </Document>
  );
}

/* ── API Route Handler ── */
export async function POST(request) {
  try {
    const { contactInfo, services } = await request.json();

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

    /* ── Persist to Supabase (graceful — emails still send on failure) ── */
    try {
      const supabase = createServiceClient();
      await supabase.from('consultation_submissions').insert({
        customer_name: contactInfo.name,
        customer_email: contactInfo.email,
        customer_phone: contactInfo.phone,
        customer_address: contactInfo.address || null,
        customer_notes: contactInfo.notes || null,
        services,
      });
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

    /* ── Email to customer ── */
    const customerName = escapeHtml(contactInfo.name);

    await resend.emails.send({
      from: 'Lume Outdoor Lighting <Drake@lumeoutdoor.com>',
      to: contactInfo.email,
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
            Lume Outdoor Lighting<br />Drake@lumeoutdoor.com
          </p>
        </div>
      `,
      attachments: [pdfAttachment],
    });

    /* ── Receipt email to Drake ── */
    const serviceListHtml = services
      .map(
        (s) =>
          `<li style="margin-bottom: 6px;"><strong>${escapeHtml(s.name)}</strong> — ${escapeHtml(s.configSummary)}</li>`,
      )
      .join('');

    await resend.emails.send({
      from: 'Lume Outdoor Lighting <Drake@lumeoutdoor.com>',
      to: 'Drake@lumeoutdoor.com',
      subject: `New Consultation Request — ${contactInfo.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
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
          <p style="color: #999; font-size: 12px;">Full consultation summary PDF attached.</p>
        </div>
      `,
      attachments: [pdfAttachment],
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return Response.json(
      { error: 'Failed to process consultation request.' },
      { status: 500 },
    );
  }
}
