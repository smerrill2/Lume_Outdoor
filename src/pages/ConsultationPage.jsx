import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
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

        {/* Form Section - Using the existing ContactForm component */}
        <div className="bg-gray-50">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ConsultationPage;