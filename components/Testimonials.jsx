'use client';

import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Samantha L.",
      location: "City View Street, Wichita",
      rating: 5,
      text: "Lume Outdoor completely transformed our home's curb appeal. Their design sense is impeccable, and the quality of the lighting has exceeded our expectations. Our home now has a warm, inviting glow every evening. The team was professional and the process was seamless.",
      project: "Brick Home Transformation"
    },
    {
      id: 2,
      name: "John & Maria R.",
      location: "Eastborough, Wichita",
      rating: 5,
      text: "The architectural lighting Lume installed has added a new dimension to our property. The subtle, elegant illumination highlights the unique features of our home beautifully. We are thrilled with the result and have received numerous compliments from our neighbors.",
      project: "Modern Architectural Highlight"
    },
    {
      id: 3,
      name: "David Chen",
      location: "Andover, KS",
      rating: 5,
      text: "Our backyard and patio have become our favorite part of our home, thanks to Lume. The landscape lighting has created a magical resort-like atmosphere. It's perfect for entertaining guests or simply relaxing after a long day. A fantastic investment.",
      project: "Patio & Garden Oasis"
    }
  ];

  // Placeholder for future testimonials
  const comingSoonSlots = [
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;

    gsap.set([title, subtitle], { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.8 })
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p ref={subtitleRef} className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover why homeowners trust Lume Outdoor for their premium landscape lighting needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Actual Testimonial */}
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 sm:w-12 h-8 sm:h-12 text-orange-100" />
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-6 italic text-sm sm:text-base">&quot;{testimonial.text}&quot;</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-sm text-orange-600 mt-1">{testimonial.project}</p>
              </div>
            </div>
          ))}

          {/* Coming Soon Placeholders */}
          {comingSoonSlots.map((slot, index) => (
            <div
              key={slot.id}
              ref={el => cardsRef.current[testimonials.length + index] = el}
              className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center"
            >
              <Quote className="w-8 sm:w-12 h-8 sm:h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">{slot.text}</p>
              <div className="flex mt-4">
                {renderStars(0)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm sm:text-base">
            Ready to transform your outdoor space? 
            <a href="#contact" className="text-orange-600 font-semibold block sm:inline mt-2 sm:mt-0 sm:ml-2 hover:text-orange-700 transition-colors">
              Get Your Free Consultation
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;