import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { createServiceClient } from '@/lib/supabase';
import ProposalPdf from '@/components/pdf/ProposalPdf';
import path from 'path';
import fs from 'fs';

/* ── Read logo once at module load ── */
const logoPath = path.join(process.cwd(), 'public', 'Lumepng.png');
const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

export async function POST(request) {
  try {
    const { submissionId, customerInfo, lineItems, grandTotal, notes } = await request.json();

    if (!submissionId || !lineItems?.length) {
      return Response.json(
        { error: 'Submission ID and line items are required.' },
        { status: 400 }
      );
    }

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    /* ── Generate PDF ── */
    const pdfBuffer = Buffer.from(
      await renderToBuffer(
        <ProposalPdf
          customerInfo={customerInfo}
          lineItems={lineItems}
          grandTotal={grandTotal}
          notes={notes}
          date={date}
          logoBase64={logoBase64}
        />
      )
    );

    /* ── Save proposal data to Supabase ── */
    try {
      const supabase = createServiceClient();
      const { data: submission } = await supabase
        .from('consultation_submissions')
        .select('proposal_data')
        .eq('id', submissionId)
        .single();
      await supabase
        .from('consultation_submissions')
        .update({
          proposal_status: 'proposal_created',
          proposal_data: {
            ...(submission?.proposal_data || {}),
            lineItems,
            grandTotal,
            notes,
            generatedAt: new Date().toISOString(),
          },
        })
        .eq('id', submissionId);
    } catch (dbError) {
      console.error('Supabase update error (non-blocking):', dbError);
    }

    /* ── Return PDF as download ── */
    const safeFileName = (customerInfo.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Lume_Proposal_${safeFileName}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Proposal generation error:', error);
    return Response.json(
      { error: 'Failed to generate proposal.' },
      { status: 500 }
    );
  }
}
