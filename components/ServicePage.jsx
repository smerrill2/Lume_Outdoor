'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { useImage } from '@/lib/imageConfig';
import { serviceData as allServiceData } from '@/lib/content'; // Import from content.js

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ServicePage({ slug }) {
  const service = allServiceData[slug];
  const router = useRouter();
  const heroRef = useRef(null);
  const contentRefs = useRef([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    
    contentRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, [slug]);

  const scrollToContact = () => {
    router.push('/consultation');
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-800"
      >
        <div className="absolute inset-0">
          <Image 
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">{service.subtitle}</p>
          <Button 
            onClick={scrollToContact}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg"
          >
            Schedule Light Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        {/* Overview Section */}
        <section ref={el => (contentRefs.current[0] = el)} className="max-w-4xl mx-auto px-4 mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            {service.description}
          </p>
        </section>

        {/* Benefits Section */}
        <section ref={el => (contentRefs.current[1] = el)} className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our {service.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {service.galleryImages && service.galleryImages.length > 0 && (
          <section ref={el => (contentRefs.current[2] = el)} className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Project Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image 
                      src={image.src}
                      alt={image.alt || `${service.title} example ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        <section ref={el => (contentRefs.current[4] = el)} className="bg-gray-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={el => (contentRefs.current[5] = el)} className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Let's create a custom lighting design that perfectly suits your needs and budget.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg"
            >
              Schedule Light Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ServicePage;