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

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with optimization */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Professional outdoor lighting installation"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Stars Background with optimization */}
        <div 
          id="starsBackground"
          className="absolute inset-0 z-10 opacity-40"
          style={{
            backgroundImage: `url(${starsBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: '0% 0%',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Subtle gradient overlay behind text only */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent rounded-3xl blur-sm"></div>
          
          {/* Text content */}
          <div className="relative z-10">
            <div ref={heroTagRef} className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              Premium Outdoor Lighting Solutions
            </div>
            
            <h1 ref={heroTitleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Illuminate Your <span className="text-orange-500">Outdoor Dreams</span>
            </h1>
            
            <p ref={heroSubtitleRef} className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Transform your property with professional landscape lighting that enhances beauty, security, and value.
            </p>
            
            <Button 
              ref={heroButtonRef}
              onClick={scrollToServices}
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* #1 Professional Banner */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
          <span className="text-xl md:text-2xl font-black tracking-wider mx-8">
            #1 LIGHTING PROFESSIONAL IN WICHITA!
          </span>
        </div>
      </div>

      {/* Trusted Companies & USP Banner */}
      <section className="relative py-16 bg-gradient-to-b from-black/5 via-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trusted Companies */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
              Trusted by Leading Companies & Homeowners
            </h2>
            
            {/* Company Logos with Links */}
            <div className="flex flex-wrap justify-center items-center gap-24 md:gap-32 lg:gap-40">
              <a 
                href="https://eliteelectriccompany.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-16 w-48 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/logos/elite.png"
                  alt="Elite Electric Company"
                  width={192}
                  height={64}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.midwestlakesidesolutions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-16 w-48 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/logos/lakeside-logo.png"
                  alt="Lakeside Solutions"
                  width={192}
                  height={64}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.realproducersmagazine.com/home/wichita" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-18 w-55 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/logos/real_producers.png"
                  alt="Real Producers - Wichita"
                  width={221}
                  height={74}
                  className="object-contain"
                />
              </a>
            </div>
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
    </div>
  );
}