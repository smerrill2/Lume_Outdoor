'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { resolvePricing, resolveFinishPhoto } from '@/lib/pricing';
import {
  ArrowLeft,
  Download,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Plus,
  Minus,
} from 'lucide-react';

export default function ProposalBuilderPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lineItems, setLineItems] = useState([]);
  const [proposalNotes, setProposalNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    const { data, error } = await supabase
      .from('consultation_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Failed to fetch submission:', error);
      setIsLoading(false);
      return;
    }

    setSubmission(data);

    /* If proposal_data already exists, restore it */
    if (data.proposal_data?.lineItems) {
      setLineItems(data.proposal_data.lineItems);
      setProposalNotes(data.proposal_data.notes || '');
    } else {
      /* Initialize line items from the customer's service selections */
      const initialLineItems = (data.services || []).map((service, index) => {
        const { pricePerUnit } = resolvePricing(service.configType, service.rawConfig);
        const finishInfo = resolveFinishPhoto(service.configType, service.rawConfig);
        return {
          index,
          serviceName: service.name,
          configSummary: service.configSummary,
          finishPhoto: finishInfo?.photo || null,
          finishWhiteBg: finishInfo?.whiteBg || false,
          quantity: 0,
          pricePerUnit: pricePerUnit ?? 0,
          manualPrice: pricePerUnit === null,
        };
      });
      setLineItems(initialLineItems);
    }

    setIsLoading(false);
  };

  const updateLineItem = (index, field, value) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.index === index ? { ...item, [field]: value } : item
      )
    );
  };

  const incrementQuantity = (index) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.index === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.index === index
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const grandTotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    setGenerateError(null);

    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: id,
          customerInfo: {
            name: submission.customer_name,
            email: submission.customer_email,
            phone: submission.customer_phone,
            address: submission.customer_address,
          },
          lineItems,
          grandTotal,
          notes: proposalNotes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate proposal.');
      }

      /* Download the PDF */
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Lume_Proposal_${submission.customer_name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);

      /* Refresh submission to show updated status */
      await fetchSubmission();
    } catch (err) {
      setGenerateError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Submission not found.</p>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-sm text-[#4a9e6a] hover:underline"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <h1 className="text-sm font-light text-neutral-500 font-[family-name:var(--font-montserrat)]">
            Proposal Builder
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Customer Info Card */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-neutral-500 flex-shrink-0" />
              <span>{submission.customer_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0" />
              <span className="text-neutral-300">{submission.customer_email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-neutral-500 flex-shrink-0" />
              <span className="text-neutral-300">{submission.customer_phone}</span>
            </div>
            {submission.customer_address && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <span className="text-neutral-300">{submission.customer_address}</span>
              </div>
            )}
          </div>
          {submission.customer_notes && (
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <div className="flex items-start gap-2 text-sm">
                <FileText className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-400">{submission.customer_notes}</p>
              </div>
            </div>
          )}
        </section>

        {/* Line Items */}
        <section>
          <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
            Services &amp; Quantities
          </h2>
          <div className="space-y-3">
            {lineItems.map((item) => (
              <div
                key={item.index}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Finish photo */}
                  {item.finishPhoto && (
                    <div className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-700 ${item.finishWhiteBg ? 'bg-white' : ''}`}>
                      <Image src={item.finishPhoto} alt={item.serviceName} fill className="object-contain" sizes="56px" />
                    </div>
                  )}
                  {/* Service info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium">{item.serviceName}</h3>
                    <p className="text-sm text-neutral-400 mt-0.5">{item.configSummary}</p>
                  </div>

                  {/* Quantity + Price controls */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {/* Unit price (auto-resolved, editable as override) */}
                    <div className="flex flex-col items-center gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        $/Unit
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.pricePerUnit || ''}
                        onChange={(e) =>
                          updateLineItem(item.index, 'pricePerUnit', parseFloat(e.target.value) || 0)
                        }
                        className={`w-24 text-center py-1.5 rounded-md text-sm bg-neutral-800 border focus:outline-none focus:border-[#1D4B26] transition-colors ${
                          item.manualPrice
                            ? 'border-amber-700/50 text-amber-300'
                            : 'border-neutral-700 text-white'
                        }`}
                      />
                    </div>

                    {/* Quantity stepper */}
                    <div className="flex flex-col items-center gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        Qty
                      </label>
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() => decrementQuantity(item.index)}
                          className="w-8 h-8 flex items-center justify-center bg-neutral-800 border border-neutral-700 rounded-l-md hover:bg-neutral-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) =>
                            updateLineItem(item.index, 'quantity', Math.max(0, parseInt(e.target.value) || 0))
                          }
                          className="w-14 text-center py-1.5 bg-neutral-800 border-y border-neutral-700 text-sm text-white focus:outline-none"
                        />
                        <button
                          onClick={() => incrementQuantity(item.index)}
                          className="w-8 h-8 flex items-center justify-center bg-neutral-800 border border-neutral-700 rounded-r-md hover:bg-neutral-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="flex flex-col items-end gap-1 min-w-[80px]">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        Total
                      </label>
                      <span className="text-sm font-medium text-white py-1.5">
                        {formatCurrency(item.quantity * item.pricePerUnit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grand Total */}
        <section className="bg-neutral-900 border border-[#1D4B26]/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 uppercase text-sm tracking-wider">
              Grand Total
            </span>
            <span className="text-2xl font-medium text-[#4a9e6a]">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </section>

        {/* Proposal Notes */}
        <section>
          <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
            Proposal Notes <span className="normal-case text-neutral-600">(optional)</span>
          </label>
          <textarea
            value={proposalNotes}
            onChange={(e) => setProposalNotes(e.target.value)}
            rows={3}
            placeholder="Add any notes to include in the proposal..."
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#1D4B26] transition-colors resize-none"
          />
        </section>

        {/* Generate Button */}
        <section className="pb-8">
          {generateError && (
            <p className="text-red-400 text-sm mb-3">{generateError}</p>
          )}
          <button
            onClick={handleGenerateProposal}
            disabled={isGenerating || grandTotal === 0}
            className="w-full py-4 bg-[#1D4B26] text-white rounded-lg font-medium hover:bg-[#256332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Generate Proposal PDF
              </>
            )}
          </button>
          {grandTotal === 0 && !isGenerating && (
            <p className="text-neutral-600 text-xs text-center mt-2">
              Add quantities to at least one service to generate a proposal.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
