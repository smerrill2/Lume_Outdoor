'use client'

import React, { useEffect, useRef } from 'react';
import ServicesGrid from '@/components/ServicesGrid';
import PreviousWorkShowcase from '@/components/PreviousWorkShowcase';
import Testimonials from '@/components/Testimonials';
import ServiceProcess from '@/components/ServiceProcess';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import FAQ from '@/components/FAQ';
import ContactFormWithJobber from '@/components/ContactFormWithJobber';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImage } from '@/lib/imageConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroBackground = useImage('hero', 'background');
  const starsBackground = useImage('hero', 'stars');
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);
  
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;
    
    const starsElement = document.getElementById('starsBackground');
    
    gsap.set([heroTagRef.current, heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current], { 
      opacity: 0, 
      y: 20 
    });
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Only animate stars if element exists
    if (starsElement) {
      gsap.to(starsElement, {
        backgroundPosition: '0% 10%',
        duration: 100,
        repeat: -1,
        ease: "none",
        yoyo: true
      });
      
      gsap.fromTo(starsElement, 
        { opacity: 0 },
        { opacity: 0.4, duration: 2, ease: "power2.out" }
      );
    }
    
    tl.to(heroTagRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(heroSubtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(heroButtonRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        onComplete: () => {
          gsap.to(heroButtonRef.current, {
            scale: 1.05,
            duration: 0.5,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      }, "-=0.5");
      
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[calc(100vh-64px)] min-h-[500px] bg-black overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroBackground})`,
              filter: 'brightness(1)'
            }}
          ></div>
          
          <div className="absolute inset-0 bg-black/50">
            <div 
              className="absolute inset-0 opacity-40"
              style={{ 
                backgroundImage: `url(${starsBackground})`,
                backgroundSize: 'cover'
              }}
              id="starsBackground"
            ></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <div 
              ref={heroTagRef}
              className="inline-block bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-4"
            >
              OUTDOOR &amp; LANDSCAPE LIGHTING
            </div>
            
            <h1 
              ref={heroTitleRef}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Transform Your<br />Nightscape
            </h1>
            
            <p 
              ref={heroSubtitleRef}
              className="text-white text-lg md:text-xl max-w-2xl mb-8"
            >
              Professional outdoor & landscape lighting that<br />brings your property to life after dark.
            </p>
            
            <Button 
              ref={heroButtonRef}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md flex items-center gap-2 text-base font-medium"
              onClick={() => window.location.href = '/consultation'}
            >
              Schedule Light Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <PreviousWorkShowcase />
      <Testimonials />
      <ServiceProcess />
      <ServiceAreaMap />
      <FAQ />
      <ContactFormWithJobber />
    </main>
  );
}