'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Will outdoor lighting increase my electricity bill?",
      answer: "Not by much. Our systems use low-voltage, energy-efficient LED fixtures that are designed to run at minimal cost. On average, a full lighting system may cost just a few dollars per month to operate."
    },
    {
      question: "Will trenching for the wires leave ruts or damage my yard?",
      answer: "No. We take great care in minimizing disruption. Most trenching is shallow and done with precision tools. After installation, we clean up and restore the area so it looks as if we were never there."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes. Fixtures and transformers include a 20-year product warranty. System controls carry their applicable manufacturer's warranty. Labor and installation are not covered."
    },
    {
      question: "What if I want to expand the system later?",
      answer: "That's no problem. Our designs are modular and easily expandable, so we can add more lights down the road without starting from scratch."
    },
    {
      question: "What kind of maintenance is required?",
      answer: "Very little. LEDs are long-lasting, and our systems are built to handle the elements. If something ever needs adjusting or replacing, we're just a call away. We also offer service visits for system checkups."
    },
    {
      question: "Can I control my lights with a timer or app?",
      answer: "Absolutely. We offer multiple control options, including simple dusk-to-dawn timers, digital smart timers, and app-controlled systems for full remote access."
    },
    {
      question: "How long does installation take?",
      answer: "Most residential jobs are completed in 1–2 days, depending on size and complexity. We'll give you a clear timeline before we begin."
    },
    {
      question: "Do I need to be home during installation?",
      answer: "Not necessarily. As long as we have access to the areas we're working on and power for the transformer, we can get everything installed while you're away."
    },
    {
      question: "Will the lights be too bright or harsh at night?",
      answer: "Not at all. We use professional-grade fixtures with warm-toned LEDs and design each system to create a natural, elegant glow — never harsh or overbearing."
    },
    {
      question: "How do I get started?",
      answer: "Just book your free consultation! We'll walk your property, discuss your goals, and provide a custom design and quote — no pressure."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FDFBF6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
        {/* Header */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900 mb-5">
              Questions, <em className="italic font-normal">answered</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-sm">
              Everything homeowners usually ask before their first consultation. Don&rsquo;t see yours? Ask us on the walkthrough.
            </p>
            <Link
              href="/consultation"
              onClick={() => { if (typeof window.gtag_report_lead_start === 'function') window.gtag_report_lead_start('faq'); }}
              className="inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>

        {/* Questions */}
        <div className="md:col-span-8 border-t border-gray-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div key={faq.question} className="border-b border-gray-300">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left group"
                  >
                    <span className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <Plus
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {/* grid-rows transition animates to the answer's real height */}
                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-base text-gray-600 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
