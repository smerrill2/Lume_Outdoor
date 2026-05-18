'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const heroSectionRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Quick fade in on initial load only - much faster
      gsap.set([heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current], {
        opacity: 0
      });

      gsap.to([heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current], {
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative h-[calc(72vh+200px)] md:h-[calc(90vh+200px)] -mt-[200px] pt-[200px] flex items-center justify-center overflow-hidden">
        {/* Background Image with optimization */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Professional outdoor lighting installation"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="scale-x-[-1] object-cover object-[center_45%] md:scale-x-100 md:object-[center_30%]"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Text content */}
          <div className="relative z-10">
            <h1 ref={heroTitleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}>
              Illuminate Your Outdoor Dreams
            </h1>

            <p ref={heroSubtitleRef} className="text-lg md:text-xl font-light mb-8 text-gray-200 max-w-3xl mx-auto tracking-wide" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)' }}>
              Professional landscape lighting designed to elevate your home after dark.
            </p>
            
            <Button
              ref={heroButtonRef}
              onClick={() => window.location.href = '/consultation'}
              size="lg"
              className="text-white px-8 py-4 text-lg font-light rounded-lg transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: '#C96A1B' }}
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* #1 Professional Banner */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-neutral-900 py-2 text-white/60 overflow-hidden border-b border-white/5">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
        </div>
      </div>

      {/* As Featured In */}
      <div className="py-10 md:py-14 bg-amber-50/40">
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-[11px] md:text-xs font-light tracking-[0.3em] text-gray-400 uppercase">As Featured In</span>
          <a
            href="https://www.realproducersmagazine.com/home/wichita"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/logos/real_producers.png"
              alt="Real Producers - Wichita"
              width={180}
              height={60}
              className="object-contain"
            />
          </a>
        </div>
      </div>

      <ServicesGrid />
      <PreviousWorkShowcase />
      <Testimonials />
      <ServiceProcess />
      <ServiceAreaMap />
      <ContactFormWithJobber />
      <FAQ />
    </div>
  );
}
