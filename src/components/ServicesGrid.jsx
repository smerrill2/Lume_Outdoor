import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImage } from '@/lib/imageConfig';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Services data moved inside component to use dynamic images

function ServicesGrid() {
  // Get service images using the useImage hook
  const residentialIcon = useImage('services', 'residential');
  const commercialIcon = useImage('services', 'commercial');
  const architecturalIcon = useImage('services', 'architectural');
  const pathwayIcon = useImage('services', 'pathway');
  const deckPatioIcon = useImage('services', 'deckPatio');
  const poolWaterIcon = useImage('services', 'poolWater');
  const securityIcon = useImage('services', 'security');
  const holidayIcon = useImage('services', 'holiday');
  
  // Services data using dynamic images
  const services = [
    {
      id: "residential-landscape",
      title: "Residential Landscape",
      icon: residentialIcon,
      slug: "/residential-landscape",
      description: "Transform your home's outdoor spaces"
    },
    {
      id: "commercial-lighting",
      title: "Commercial Lighting", 
      icon: commercialIcon,
      slug: "/commercial-lighting",
      description: "Professional business illumination"
    },
    {
      id: "pathway-lighting",
      title: "Pathway Lighting",
      icon: pathwayIcon, 
      slug: "/pathway-lighting",
      description: "Safe and beautiful walkways"
    },
    {
      id: "security-lighting",
      title: "Security Lighting",
      icon: securityIcon,
      slug: "/security-lighting", 
      description: "Enhanced safety and protection"
    },
    {
      id: "deck-patio",
      title: "Deck & Patio",
      icon: deckPatioIcon,
      slug: "/deck-patio",
      description: "Perfect outdoor entertaining spaces"
    },
    {
      id: "architectural",
      title: "Architectural Lighting",
      icon: architecturalIcon,
      slug: "/architectural", 
      description: "Highlight your building's features"
    },
    {
      id: "pool-water",
      title: "Pool & Water Features",
      icon: poolWaterIcon,
      slug: "/pool-water",
      description: "Stunning aquatic illumination"
    },
    {
      id: "holiday-lighting",
      title: "Holiday Lighting",
      icon: holidayIcon,
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
  }, []);

  const handleServiceClick = (service) => {
    // Navigate to service page with the service ID
    window.location.href = `/?view=service&id=${service.id}`;
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
                  <img 
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8 object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
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
          <button 
            onClick={() => window.location.href = '/?view=consultation'}
            className="px-8 py-3 bg-[#1D4B26] text-white rounded-lg hover:bg-[#1D4B26]/90 transition-colors duration-300 font-medium"
          >
            Schedule Light Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid; 