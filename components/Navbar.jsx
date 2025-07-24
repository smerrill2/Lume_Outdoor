'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useImage } from '@/lib/imageConfig';

function Navbar() {
  const logoUrl = useImage('logo', 'svg');
  const router = useRouter();
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { 
      name: 'Services', 
      href: '#services',
      isDropdown: true,
      dropdownItems: [
        { name: 'Residential Landscape', href: '/services/residential-landscape' },
        { name: 'Commercial Lighting', href: '/services/commercial-lighting' },
        { name: 'Pathway Lighting', href: '/services/pathway-lighting' },
        { name: 'Security Lighting', href: '/services/security-lighting' },
        { name: 'Deck & Patio', href: '/services/deck-patio' },
        { name: 'Architectural Lighting', href: '/services/architectural' },
        { name: 'Pool & Water Features', href: '/services/pool-water' },
        { name: 'Holiday Lighting', href: '/services/holiday-lighting' }
      ]
    },
    { name: 'Our Work', href: '#previous-work' },
    { name: 'Service Area', href: '#service-area' },
    { name: 'Contact', href: '#contact' }
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('/')) {
      router.push(href);
      return;
    }

    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        router.push(`/${href}`);
        return;
      }
      
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-black/10 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Left aligned with projects section */}
            <Link href="/" className="relative z-10 flex items-center justify-center flex-shrink-0 -ml-1 sm:ml-0 h-full">
              <div className="relative h-14 md:h-20 w-40 md:w-52 md:mt-0" style={{marginTop: '15px', marginLeft: '-10px', transform: 'scale(1.1)'}}>
                <Image 
                  src={logoUrl} 
                  alt="Lume Outdoors Logo" 
                  fill
                  className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 176px, 208px"
                />
              </div>
            </Link>
            
            {/* Desktop Navigation & CTA - Grouped and aligned right */}
            <div className="hidden lg:flex items-center justify-end flex-1 ml-8">
              <nav className="flex items-center justify-center space-x-8">
                {navItems.map((item, index) => {
                  if (item.isDropdown) {
                    return (
                      <div key={item.name} className="relative group py-4">
                        <button
                          className="text-white hover:text-orange-500 transition-colors font-medium flex items-center"
                          onClick={(e) => handleNavClick(e, item.href)}
                        >
                          {item.name}
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                          <div className="py-1">
                            {item.dropdownItems.map(dropdownItem => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={(e) => handleNavClick(e, dropdownItem.href)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-orange-500 transition-colors font-medium"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium ml-8"
                onClick={() => router.push('/consultation')}
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Mobile Menu Button - Always on the right */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 flex items-center justify-center w-12 h-12 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? 
                <X className="w-6 h-6" /> : 
                <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Only shown on mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col justify-center items-center pt-16">
          <nav className="text-center">
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li 
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="text-white text-2xl font-medium hover:text-orange-500 transition-colors block py-2"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div 
            className="mt-12"
          >
            <Button 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg"
              onClick={() => router.push('/consultation')}
            >
              Schedule Light Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;