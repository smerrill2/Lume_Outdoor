'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SimpleJobberForm from '@/components/SimpleJobberForm';
import ContactDetails from '@/components/ContactDetails';

export default function ConsultationPage() {
  const [isRepairVisit, setIsRepairVisit] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsRepairVisit(params.get('service') === 'repair-maintenance');
  }, []);

  const steps = isRepairVisit
    ? [
        { title: 'System assessment', description: 'We inspect the complete low-voltage system: fixtures, wiring, transformer, and controls.' },
        { title: 'Clear repair plan', description: 'We explain the recommended work and expected cost before anything is fixed.' },
        { title: 'Full-system service', description: 'Repairs, replacements, adjustments, and upgrades, all handled by us.' },
      ]
    : [
        { title: 'We walk your property', description: 'A free, no-obligation visit to see the space and talk through what you want.' },
        { title: 'You get a custom design', description: 'A lighting plan built around your home’s architecture and landscape.' },
        { title: 'We install it', description: 'Careful installation with concealed wiring and minimal disruption.' },
      ];

  return (
    <main className="bg-[#FDFBF6]">
      {/* Photo header */}
      <section className="relative h-[46svh] min-h-[380px] md:h-[52vh] flex items-end overflow-hidden bg-neutral-950">
        <Image
          src="/projects/coves_project/coves-stone-corner.webp"
          alt="Warm uplighting on the stone corner of a modern Wichita home"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-[center_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.75)_100%)]"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-14 text-white">
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] mb-4">
            {isRepairVisit ? (
              <>Schedule a <em className="italic font-normal">repair visit</em></>
            ) : (
              <>Let&rsquo;s light <em className="italic font-normal">your</em> home</>
            )}
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-lg">
            {isRepairVisit
              ? 'Tell us what your lighting system is doing. We’ll find the problem and explain the repair.'
              : 'Tell us a little about your property and we’ll set up a free on-site consultation.'}
          </p>
        </div>
      </section>

      {/* Steps + details + form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-body text-sm font-normal text-gray-500 mb-4">What happens next</h2>
            <ol className="border-t border-gray-300 mb-12">
              {steps.map((step, stepIndex) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] py-5 border-b border-gray-300">
                  <span className="font-display text-2xl text-orange-600 tabular-nums">
                    {String(stepIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-body text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="hidden lg:block">
              <ContactDetails tone="light" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-sm p-3 sm:p-6 lg:p-10">
              <SimpleJobberForm />
            </div>
            <div className="lg:hidden mt-12">
              <ContactDetails tone="light" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
