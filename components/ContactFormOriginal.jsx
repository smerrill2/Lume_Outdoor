'use client';

import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactFormOriginal = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formContainerRef = useRef(null);
  const infoCardsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    propertyAddress: '',
    bestTime: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  const serviceOptions = [
    'Path & Walkway Lighting',
    'Deck & Patio Lighting',
    'Landscape & Garden Lighting',
    'Architectural Lighting',
    'Security Lighting',
    'Complete Property Package',
    'Not Sure - Need Consultation'
  ];

  const timeOptions = [
    'Morning (8am-12pm)',
    'Afternoon (12pm-5pm)',
    'Evening (5pm-8pm)',
    'Flexible'
  ];

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
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: false, message: '' });

    try {
      // Replace with your EmailJS service details
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );

      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Thank you! We\'ll contact you within 24-48 hours to schedule your consultation.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        propertyAddress: '',
        bestTime: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Oops! Something went wrong. Please try again or call us directly.'
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 bg-gray-50">
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

          {/* Contact Form */}
          <div ref={formContainerRef} className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Your Free Consultation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Property Address */}
                <div>
                  <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Best Time */}
                <div>
                  <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Contact
                  </label>
                  <select
                    id="bestTime"
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {timeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details or Questions
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tell us about your outdoor lighting project..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.submitting ? 'Sending...' : 'Schedule My Free Consultation'}
                </button>
              </div>

              {/* Status Messages */}
              {formStatus.submitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800">{formStatus.message}</p>
                </div>
              )}

              {formStatus.error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{formStatus.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormOriginal;