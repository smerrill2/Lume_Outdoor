import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useImage } from '@/lib/imageConfig';

function Navbar() {
  const logoUrl = useImage('logo', 'svg');
  const navItems = [
    { name: 'About Us', href: '/?view=about' },
    { name: 'Services', href: '#services' },
    { name: 'Service Area', href: '#service-area' },
    { name: 'Contact', href: '#contact' }
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const desktopNavRef = useRef([]);
  const menuTimelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation for navbar on scroll
  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        duration: 0.3,
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        padding: isScrolled ? '12px 0' : '20px 0',
        ease: 'power2.out'
      });
    }
  }, [isScrolled]);

  // Initialize mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      // Create timeline for menu animation
      menuTimelineRef.current = gsap.timeline({ paused: true });
      
      // Add animations to timeline
      menuTimelineRef.current
        .to(mobileMenuRef.current, {
          duration: 0.3,
          x: 0,
          ease: 'power3.out'
        })
        .fromTo(
          navItemsRef.current,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out'
          },
          '-=0.1'
        );
    }
  }, []);

  // Play/reverse animation when menu state changes
  useEffect(() => {
    if (menuTimelineRef.current) {
      if (isMobileMenuOpen) {
        menuTimelineRef.current.play();
      } else {
        menuTimelineRef.current.reverse();
      }
    }
  }, [isMobileMenuOpen]);

  // Animations on page load
  useEffect(() => {
    // Logo animation
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    // Desktop nav items animation
    if (desktopNavRef.current.length > 0) {
      gsap.fromTo(
        desktopNavRef.current,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out' 
        }
      );
    }
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === '#') return;
    
    // Handle external links (like About page)
    if (href.includes('?view=')) {
      window.location.href = href;
      return;
    }
    
    // Handle anchor links on the same page
    if (href.startsWith('#')) {
      // If we're not on the home page, go to home page first
      if (window.location.search) {
        window.location.href = '/' + href;
        return;
      }
      
      // We're on the home page, scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/')) {
      // Handle other absolute paths
      window.location.href = href;
    }
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="relative z-10" ref={logoRef}>
              <img 
                src={logoUrl} 
                alt="Lume Outdoors Logo" 
                className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  filter: "brightness(0) invert(1)",
                }} 
              />
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  ref={el => desktopNavRef.current[index] = el}
                  href={item.href}
                  className="text-white hover:text-orange-500 transition-colors font-medium"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                ref={el => desktopNavRef.current[navItems.length] = el}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium"
                onClick={() => window.location.href = '/?view=consultation'}
              >
                Schedule Consultation
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
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
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 transform translate-x-full"
      >
        <div className="h-full flex flex-col justify-center items-center pt-16">
          <nav className="text-center">
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li 
                  key={item.name}
                  ref={el => navItemsRef.current[index] = el}
                  className="opacity-0"
                >
                  <a
                    href={item.href}
                    className="text-white text-2xl font-medium hover:text-orange-500 transition-colors block py-2"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div 
            className="mt-12 opacity-0"
            ref={el => navItemsRef.current[navItems.length] = el}
          >
            <Button 
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg"
              onClick={() => window.location.href = '/?view=consultation'}
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