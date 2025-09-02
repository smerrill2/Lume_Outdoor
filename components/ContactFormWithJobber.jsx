'use client';

import React, { useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SimpleJobberForm from '@/components/SimpleJobberForm';

gsap.registerPlugin(ScrollTrigger);

const ContactFormWithJobber = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formContainerRef = useRef(null);
  const infoCardsRef = useRef([]);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (316) 655-1270', 'Mon-Fri 8am-6pm'],
      action: { type: 'tel', value: '+13166551270' }
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['Drake@lumeoutdoorlighting.com', 'We reply within 24 hours'],
      action: { type: 'email', value: 'Drake@lumeoutdoorlighting.com' }
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: ['Wichita Metro', 'And Surrounding Areas'],
      action: null
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: ['24-48 Hours', 'For all inquiries'],
      action: null
    }
  ];

  useEffect(() => {

    // GSAP Animations
    const section = sectionRef.current;
    const title = titleRef.current;
    const formContainer = formContainerRef.current;
    const infoCards = infoCardsRef.current;

    gsap.set([title, formContainer], { opacity: 0, y: 30 });
    gsap.set(infoCards, { opacity: 0, x: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.8 })
      .to(formContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(infoCards, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Don't remove scripts as it might affect the form
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Free Lighting Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your outdoor space with professional landscape lighting. 
            Contact us today for a free design consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  ref={el => infoCardsRef.current[index] = el}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.action ? (
                        <a
                          href={info.action.type === 'tel' ? `tel:${info.action.value}` : `mailto:${info.action.value}`}
                          className="text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {info.details.map((detail, idx) => (
                            <span key={idx} className="block">{detail}</span>
                          ))}
                        </a>
                      ) : (
                        info.details.map((detail, idx) => (
                          <span key={idx} className="block text-gray-600">{detail}</span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <p className="mt-4 text-sm opacity-90">
                24/7 Emergency service available for existing customers
              </p>
            </div>
          </div>

          {/* Jobber Form */}
          <div ref={formContainerRef} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Your Free Consultation</h3>
              <SimpleJobberForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormWithJobber;