import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ServicesGrid from '@/components/ServicesGrid';
import PreviousWorkShowcase from '@/components/PreviousWorkShowcase';
import Testimonials from '@/components/Testimonials';
import ServiceProcess from '@/components/ServiceProcess';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImage } from '@/lib/imageConfig';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const heroBackground = useImage('hero', 'background');
  const starsBackground = useImage('hero', 'stars');
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);
  
  useEffect(() => {
    // Initialize references to DOM elements
    const starsElement = document.getElementById('starsBackground');
    
    // Initial state - set opacity to 0 for all elements
    gsap.set([heroTagRef.current, heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current], { 
      opacity: 0, 
      y: 20 
    });
    
    // Create a timeline for staggered animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Subtle stars animation
    gsap.to(starsElement, {
      backgroundPosition: '0% 10%',
      duration: 100,
      repeat: -1,
      ease: "none",
      yoyo: true
    });
    
    // Animate stars opacity
    gsap.fromTo(starsElement, 
      { opacity: 0 },
      { opacity: 0.4, duration: 2, ease: "power2.out" }
    );
    
    // Staggered entrance animation
    tl.to(heroTagRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(heroSubtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(heroButtonRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        onComplete: () => {
          // Optional pulse animation for the button to draw attention
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
    <div className="min-h-screen bg-white">
      <SEO />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image with Overlay */}
          <div className="relative h-[calc(100vh-64px)] min-h-[500px] bg-black overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${heroBackground})`,
                filter: 'brightness(1)'
              }}
            ></div>
            
            {/* Background with stars */}
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
            
            {/* Hero Content */}
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
                onClick={() => window.location.href = '/?view=consultation'}
              >
                Schedule Light Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <ServicesGrid />

        {/* Previous Work Showcase Section */}
        <PreviousWorkShowcase />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Service Process Section */}
        <ServiceProcess />

        {/* Service Area Map Section */}
        <ServiceAreaMap />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage; 