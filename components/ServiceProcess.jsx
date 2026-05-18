'use client';

import React from 'react';

const ServiceProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Free Consultation",
      description: "We visit your property for a complimentary lighting consultation to understand your vision.",
      duration: "Same Week"
    },
    {
      id: 2,
      title: "Custom Design",
      description: "A personalized lighting plan that highlights your home's architecture and landscape.",
      duration: "1-2 Days"
    },
    {
      id: 3,
      title: "Professional Installation",
      description: "Licensed technicians install your system with minimal disruption and concealed wiring.",
      duration: "1-3 Days"
    },
    {
      id: 4,
      title: "Lifetime Support",
      description: "Ongoing maintenance, warranty protection, and seasonal adjustments included.",
      duration: "Ongoing"
    }
  ];

  return (
    <section id="process" className="py-24 md:py-28 px-4 bg-amber-50/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Our Process
          </h2>
        </div>

        {/* Desktop - Horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <span className="text-4xl font-extralight text-gray-300 block mb-4">
                {String(step.id).padStart(2, '0')}
              </span>
              <h3 className="text-sm font-light text-gray-900 tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="text-xs font-light text-gray-500 leading-relaxed mb-4">
                {step.description}
              </p>
              <span className="text-[10px] font-light tracking-[0.2em] text-gray-400 uppercase">
                {step.duration}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile - Vertical */}
        <div className="md:hidden space-y-10">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-5">
              <span className="text-3xl font-extralight text-gray-300 w-10 flex-shrink-0">
                {String(step.id).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-sm font-light text-gray-900 tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-xs font-light text-gray-500 leading-relaxed mb-2">
                  {step.description}
                </p>
                <span className="text-[10px] font-light tracking-[0.2em] text-gray-400 uppercase">
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
