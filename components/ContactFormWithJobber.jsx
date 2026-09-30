'use client';

import React from 'react';
import SimpleJobberForm from '@/components/SimpleJobberForm';
import ContactDetails from '@/components/ContactDetails';

const ContactFormWithJobber = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FDFBF6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900 mb-5">
            Let&rsquo;s talk about <em className="italic font-normal">your home</em>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-md">
            Tell us a little about your property and we&rsquo;ll set up a free on-site consultation and custom lighting design.
          </p>
          <ContactDetails tone="light" />
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-200 rounded-sm p-3 sm:p-6 lg:p-10">
            <SimpleJobberForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormWithJobber;
