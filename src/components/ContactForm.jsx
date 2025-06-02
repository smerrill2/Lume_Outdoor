import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
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
      details: '(555) 123-4567',
      subtext: 'Mon-Fri 8am-6pm'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@lumeoutdoor.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: '50 Mile Radius',
      subtext: 'All major neighborhoods'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '24-48 Hours',
      subtext: 'Quick consultation booking'
    }
  ];

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with actual key

    // GSAP Animations
    const section = sectionRef.current;
    const title = titleRef.current;
    const formContainer = formContainerRef.current;
    const infoCards = infoCardsRef.current;

    gsap.set([title, formContainer], { opacity: 0, y: 30 });
    gsap.set(infoCards, { opacity: 0, x: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: false, message: '' });

    try {
      // Log form data to console for testing
      console.log('🚀 New Lead Submission:', {
        timestamp: new Date().toISOString(),
        formData: formData,
        userAgent: navigator.userAgent
      });
      
      // TODO: Replace with actual API integration when ready
      // For now, we'll simulate the API call
      
      /* FUTURE IMPLEMENTATION OPTIONS:
      // Send email to business owner
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_OWNER_TEMPLATE_ID', // Replace with your template ID
        {
          to_email: 'owner@lumeoutdoor.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          property_address: formData.propertyAddress,
          best_time: formData.bestTime,
          message: formData.message,
          submission_date: new Date().toLocaleString(),
          urgent_flag: 'NEW LEAD - IMMEDIATE ATTENTION'
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      // Send confirmation to customer
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CUSTOMER_TEMPLATE_ID',
        {
          to_email: formData.email,
          customer_name: formData.name,
          service_requested: formData.serviceType,
          consultation_timeframe: '24-48 hours'
        },
        'YOUR_PUBLIC_KEY'
      );
      */
      
      // Simulate API delay for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success
      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Thank you! We\'ll contact you within 24 hours to schedule your consultation.'
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          propertyAddress: '',
          bestTime: '',
          message: ''
        });
        setFormStatus({ submitting: false, submitted: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Sorry, there was an error. Please call us directly at (555) 123-4567.'
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          Schedule Your Light Consultation
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div ref={formContainerRef} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              {formStatus.submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                  <p className="text-gray-600">{formStatus.message}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address
                    </label>
                    <input
                      type="text"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Street address, city, state"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time to Contact
                    </label>
                    <select
                      name="bestTime"
                      value={formData.bestTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      {timeOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us about your project goals, timeline, or any specific requirements..."
                    />
                  </div>

                  {formStatus.error && (
                    <div className="flex items-center p-4 bg-red-50 rounded-md">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-700">{formStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus.submitting ? 'Sending...' : 'Schedule Light Consultation'}
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
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
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-lg text-gray-900 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.subtext}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-orange-500 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Why Choose Lume Outdoor?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Free light consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Custom design for your property</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Professional installation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Lifetime warranty & support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;