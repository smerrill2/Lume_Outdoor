'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { homeFaqs } from '@/lib/content';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

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
          {homeFaqs.map((faq, index) => {
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
                    <p className={`${faq.link ? 'pb-3' : 'pb-6'} pr-10 text-base text-gray-600 leading-relaxed max-w-2xl`}>
                      {faq.answer}
                    </p>
                    {faq.link && (
                      <Link
                        href={faq.link.href}
                        tabIndex={isOpen ? undefined : -1}
                        className="inline-block mb-6 text-sm font-medium text-orange-600 underline underline-offset-4 decoration-orange-600/40 hover:decoration-orange-600 transition-colors duration-300"
                      >
                        {faq.link.label}
                      </Link>
                    )}
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
