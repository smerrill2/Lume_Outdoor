import React, { useEffect, useRef } from 'react';
import { useImage } from '@/lib/imageConfig';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Zap, Star, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const logoUrl = useImage('logo', 'svg');
  const starsBackground = useImage('hero', 'stars');
  const footerRef = useRef(null);
  const lightBeamsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate floating light particles
      gsap.to('.light-particle', {
        y: -100,
        opacity: 0,
        duration: 3,
        stagger: {
          each: 0.2,
          repeat: -1,
          repeatDelay: 1
        },
        ease: "power2.out"
      });

      // Animate the decorative light beams
      gsap.fromTo('.light-beam', 
        { height: 0, opacity: 0 },
        {
          height: "100%",
          opacity: 0.1,
          duration: 2,
          stagger: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Animated background with stars */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: `url(${starsBackground})`,
          backgroundSize: 'cover'
        }}
      ></div>

      {/* Decorative light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-beam absolute left-[10%] w-[2px] bg-gradient-to-t from-orange-500/30 to-transparent"></div>
        <div className="light-beam absolute left-[30%] w-[2px] bg-gradient-to-t from-yellow-500/20 to-transparent"></div>
        <div className="light-beam absolute left-[50%] w-[2px] bg-gradient-to-t from-orange-500/20 to-transparent"></div>
        <div className="light-beam absolute left-[70%] w-[2px] bg-gradient-to-t from-yellow-500/30 to-transparent"></div>
        <div className="light-beam absolute left-[90%] w-[2px] bg-gradient-to-t from-orange-500/20 to-transparent"></div>
      </div>

      {/* Floating light particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="light-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              width: '4px',
              height: '4px'
            }}
          >
            <div className="w-full h-full bg-orange-400 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top decorative element */}
        <div className="flex items-center justify-center mb-12">
          <Star className="w-4 h-4 text-orange-500" />
          <div className="mx-4 h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <Sparkles className="w-5 h-5 text-orange-500" />
          <div className="mx-4 h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <Star className="w-4 h-4 text-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2 inline-block">
              <img 
                src={logoUrl} 
                alt="Lume Outdoor" 
                className="h-12 w-auto brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
              />
              <Zap className="w-5 h-5 text-orange-500" />
            </a>
            <p className="text-gray-300 text-sm leading-relaxed">
              Illuminating outdoor spaces with premium lighting solutions that transform your property into a nighttime masterpiece.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61575907045065" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Facebook className="relative w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/lumeoutdoorlighting/" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Instagram className="relative w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/company/107065988/" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Linkedin className="relative w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">Our Services</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Residential Landscape', id: 'residential-landscape' },
                { name: 'Commercial Lighting', id: 'commercial-lighting' },
                { name: 'Pathway Lighting', id: 'pathway-lighting' },
                { name: 'Security Lighting', id: 'security-lighting' },
                { name: 'Deck & Patio', id: 'deck-patio' },
                { name: 'Architectural', id: 'architectural' },
                { name: 'Pool & Water Features', id: 'pool-water' },
                { name: 'Holiday Lighting', id: 'holiday-lighting' }
              ].map((service) => (
                <li key={service.id}>
                  <a 
                    href={`/?view=service&id=${service.id}`}
                    className="group flex items-center text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/?view=about' },
                { label: 'Services', href: '/#services' },
                { label: 'Service Area', href: '/#service-area' },
                { label: 'Our Process', href: '/#process' },
                { label: 'Testimonials', href: '/#testimonials' }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="group flex items-center text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  onClick={scrollToContact}
                  className="group flex items-center text-gray-300 hover:text-orange-400 transition-colors text-sm text-left"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <Phone className="relative w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                  <a href="tel:5551234567" className="text-white hover:text-orange-400 transition-colors font-medium">
                    (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <Mail className="relative w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <a href="mailto:info@lumeoutdoor.com" className="text-white hover:text-orange-400 transition-colors">
                    info@lumeoutdoor.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <MapPin className="relative w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Service Area</p>
                  <p className="text-white">Wichita Metro & Surrounding Areas</p>
                </div>
              </li>
            </ul>

            <button
              onClick={() => window.location.href = '/?view=consultation'}
              className="mt-6 w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transition-transform group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center text-white px-4 py-3 font-medium">
                Light Up Your Property
                <Zap className="ml-2 w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 flex items-center">
              © 2024 Lume Outdoor. Brightening nights since 2020
              <Sparkles className="ml-2 w-3 h-3 text-orange-500" />
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <a href="/sitemap.xml" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;