'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqRefs = useRef([]);

  const faqs = [
    {
      question: "Will outdoor lighting increase my electricity bill?",
      answer: "Not by much. Our systems use low-voltage, energy-efficient LED fixtures that are designed to run at minimal cost. On average, a full lighting system may cost just a few dollars per month to operate."
    },
    {
      question: "Will trenching for the wires leave ruts or damage my yard?",
      answer: "No. We take great care in minimizing disruption. Most trenching is shallow and done with precision tools. After installation, we clean up and restore the area so it looks as if we were never there."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes! We offer a 20-year manufacturer warranty on all fixtures and transformers. System controls are covered by the manufacturer's warranty. Labor is not included."
    },
    {
      question: "What if I want to expand the system later?",
      answer: "That's no problem. Our designs are modular and easily expandable, so we can add more lights down the road without starting from scratch."
    },
    {
      question: "What kind of maintenance is required?",
      answer: "Very little. LEDs are long-lasting, and our systems are built to handle the elements. If something ever needs adjusting or replacing, we're just a call away. We also offer service visits for system checkups."
    },
    {
      question: "Can I control my lights with a timer or app?",
      answer: "Absolutely. We offer multiple control options, including simple dusk-to-dawn timers, digital smart timers, and app-controlled systems for full remote access."
    },
    {
      question: "How long does installation take?",
      answer: "Most residential jobs are completed in 1–2 days, depending on size and complexity. We'll give you a clear timeline before we begin."
    },
    {
      question: "Do I need to be home during installation?",
      answer: "Not necessarily. As long as we have access to the areas we're working on and power for the transformer, we can get everything installed while you're away."
    },
    {
      question: "Will the lights be too bright or harsh at night?",
      answer: "Not at all. We use professional-grade fixtures with warm-toned LEDs and design each system to create a natural, elegant glow — never harsh or overbearing."
    },
    {
      question: "How do I get started?",
      answer: "Just book your free consultation! We'll walk your property, discuss your goals, and provide a custom design and quote — no pressure."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate FAQ items
      faqRefs.current.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Lightbulb className="w-8 h-8 text-orange-500 mr-2" />
            <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600 mt-4">
            Everything you need to know about outdoor lighting
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => faqRefs.current[index] = el}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <button
            onClick={() => window.location.href = '/?view=consultation'}
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;