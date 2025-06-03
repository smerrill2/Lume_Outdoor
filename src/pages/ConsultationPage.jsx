import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import SimpleJobberForm from '@/components/SimpleJobberForm';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { gsap } from 'gsap';

function ConsultationPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
    
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Schedule Consultation - Lume Outdoor Lighting"
        description="Schedule your free outdoor lighting consultation. Let us help transform your property with professional landscape lighting design and installation."
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Your Free Consultation
            </h1>
            <p ref={subtitleRef} className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take the first step toward transforming your outdoor space. 
              Our lighting experts will visit your property, discuss your vision, 
              and provide a custom design proposal.
            </p>
          </div>
        </section>

        {/* Form Section - Using the Jobber embedded form */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll contact you within 24-48 hours to schedule your free consultation.
              </p>
            </div>
            
            {/* Jobber Form Container */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <SimpleJobberForm />
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
      </main>

      <Footer />
    </div>
  );
}

export default ConsultationPage;