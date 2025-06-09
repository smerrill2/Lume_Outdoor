'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building, Route, Shield, Fence, Landmark, Waves, PartyPopper } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Services data moved inside component to use dynamic images

function ServicesGrid() {
  const router = useRouter();
  
  // Services data using dynamic images
  const services = [
    {
      id: "residential-landscape",
      title: "Residential Landscape",
      icon: <Home className="w-8 h-8 text-white" />,
      slug: "/residential-landscape",
      description: "Transform your home's outdoor spaces"
    },
    {
      id: "commercial-lighting",
      title: "Commercial Lighting", 
      icon: <Building className="w-8 h-8 text-white" />,
      slug: "/commercial-lighting",
      description: "Professional business illumination"
    },
    {
      id: "pathway-lighting",
      title: "Pathway Lighting",
      icon: <Route className="w-8 h-8 text-white" />, 
      slug: "/pathway-lighting",
      description: "Safe and beautiful walkways"
    },
    {
      id: "security-lighting",
      title: "Security Lighting",
      icon: <Shield className="w-8 h-8 text-white" />,
      slug: "/security-lighting", 
      description: "Enhanced safety and protection"
    },
    {
      id: "deck-patio",
      title: "Deck & Patio",
      icon: <Fence className="w-8 h-8 text-white" />,
      slug: "/deck-patio",
      description: "Perfect outdoor entertaining spaces"
    },
    {
      id: "architectural",
      title: "Architectural Lighting",
      icon: <Landmark className="w-8 h-8 text-white" />,
      slug: "/architectural", 
      description: "Highlight your building's features"
    },
    {
      id: "pool-water",
      title: "Pool & Water Features",
      icon: <Waves className="w-8 h-8 text-white" />,
      slug: "/pool-water",
      description: "Stunning aquatic illumination"
    },
    {
      id: "holiday-lighting",
      title: "Holiday Lighting",
      icon: <PartyPopper className="w-8 h-8 text-white" />,
      slug: "/holiday-lighting",
      description: "Seasonal decorative displays"
    }
  ];
  
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const serviceRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    serviceRefs.current = serviceRefs.current.slice(0, services.length);

    // Animation for section entrance
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Staggered animation for service items
    gsap.fromTo(
      serviceRefs.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [services.length]);

  const handleServiceClick = (service) => {
    // Navigate to service page with the service ID
    router.push(`/services/${service.id}`);
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D4B26] mb-4">
            Lume Outdoor Offers More for You
          </h2>
          <div className="w-24 h-1 bg-[#FFA928] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional lighting solutions for every outdoor space and need
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => serviceRefs.current[index] = el}
              onClick={() => handleServiceClick(service)}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-[#FFA928] transition-all duration-300 group-hover:-translate-y-1">
                {/* Icon Container */}
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FFA928] rounded-lg flex items-center justify-center group-hover:bg-[#FF8A00] transition-colors duration-300">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-semibold text-[#1D4B26] mb-2 group-hover:text-[#FFA928] transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            onClick={() => router.push('/consultation')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg font-medium"
          >
            Schedule Today
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid; 