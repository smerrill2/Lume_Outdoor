import React from 'react';

const ServiceProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Free Consultation",
      description: "We visit your property for a complimentary lighting consultation to understand your vision.",
      duration: "Same week"
    },
    {
      id: 2,
      title: "Custom Design",
      description: "A personalized lighting plan that highlights your home's architecture and landscape.",
      duration: "1–2 days"
    },
    {
      id: 3,
      title: "Professional Installation",
      description: "Licensed technicians install your system with minimal disruption and concealed wiring.",
      duration: "1–3 days"
    },
    {
      id: 4,
      title: "Product Warranty",
      description: "Fixtures and transformers include a 20-year product warranty. Labor and installation are not covered.",
      duration: "20 years"
    }
  ];

  return (
    <section id="process" className="pb-20 md:pb-28 bg-[#FDFBF6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-300 pt-16 md:pt-20">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16">
          <h2 className="md:col-span-7 font-display text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900">
            Our <em className="italic font-normal">process</em>
          </h2>
          <p className="md:col-span-5 md:self-end text-base md:text-lg text-gray-600 leading-relaxed">
            Four steps from the first walkthrough to the first night your lights turn on.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-12">
          {steps.map((step) => (
            <li key={step.id} className="border-t border-gray-300 pt-5">
              <div className="flex items-baseline justify-between mb-6 md:mb-8">
                <span className="font-display text-3xl text-orange-600 tabular-nums">
                  {String(step.id).padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-500">{step.duration}</span>
              </div>
              <h3 className="font-display text-2xl md:text-[1.75rem] font-medium leading-tight text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
