'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, Palette, Wrench, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceProcess = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepsRef = useRef([]);
  const connectorsRef = useRef([]);

  const steps = [
    {
      id: 1,
      icon: Phone,
      title: "Free Consultation",
      description: "We'll visit your property for a complimentary light consultation, showing you the transformative power of professional lighting",
      duration: "Same Week"
    },
    {
      id: 2,
      icon: Palette,
      title: "Custom Design",
      description: "Our experts create a personalized lighting plan that highlights your home's architecture and landscape features",
      duration: "1-2 Days"
    },
    {
      id: 3,
      icon: Wrench,
      title: "Professional Installation",
      description: "Licensed technicians install your system with minimal disruption to your property, ensuring perfect placement and concealed wiring",
      duration: "1-3 Days"
    },
    {
      id: 4,
      icon: Shield,
      title: "Lifetime Support",
      description: "Enjoy peace of mind with our maintenance program, warranty protection, and seasonal adjustments",
      duration: "Ongoing"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const stepElements = stepsRef.current;
    const connectorElements = connectorsRef.current;

    gsap.set([title, subtitle], { opacity: 0, y: 30 });
    gsap.set(stepElements, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(connectorElements, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.8 })
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');

    // Animate steps and connectors
    stepElements.forEach((step, index) => {
      tl.to(step, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, index === 0 ? '-=0.4' : '-=0.6');

      if (index < connectorElements.length) {
        tl.to(connectorElements[index], {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.inOut'
        }, '-=0.4');
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Proven Process
          </h2>
          <p ref={subtitleRef} className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            From initial consultation to lifetime support, we make premium outdoor lighting simple and stress-free
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div
                      ref={el => stepsRef.current[index] = el}
                      className="flex flex-col items-center text-center relative z-10 flex-1"
                    >
                      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-2 max-w-xs text-sm lg:text-base">{step.description}</p>
                      <span className="text-sm font-semibold text-orange-600">{step.duration}</span>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div 
                        ref={el => connectorsRef.current[index] = el}
                        className="absolute top-10 h-1 bg-orange-200"
                        style={{
                          left: `${(100 / steps.length) * (index + 0.5)}%`,
                          width: `${100 / steps.length}%`
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  ref={el => stepsRef.current[index] = el}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-16 sm:h-20 bg-orange-200 mx-auto mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">{step.description}</p>
                    <span className="text-xs sm:text-sm font-semibold text-orange-600">{step.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold text-base sm:text-lg transition-colors duration-300 transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none">
            Start Your Transformation Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;