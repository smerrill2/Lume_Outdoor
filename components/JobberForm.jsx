'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import JobberFormEmbed from '@/components/JobberFormEmbed';

const JobberForm = () => {
  const formContainerRef = useRef(null);

  useEffect(() => {

    // Animate the form container
    gsap.fromTo(formContainerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll contact you within 24-48 hours to schedule your free consultation.
          </p>
        </div>
        
        {/* Jobber Form Container */}
        <div ref={formContainerRef} className="bg-white rounded-lg shadow-lg p-8">
          <JobberFormEmbed formId="consultation-page" />
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Free Consultation</h3>
            <p className="text-gray-600">No obligation design consultation at your property</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Custom Design</h3>
            <p className="text-gray-600">Tailored lighting plan for your unique space</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Expert Installation</h3>
            <p className="text-gray-600">Professional installation with warranty</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobberForm;