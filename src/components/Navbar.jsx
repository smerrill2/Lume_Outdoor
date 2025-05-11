import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

function Navbar() {
  const navItems = ['Home', 'About Us', 'Services', 'Gallery', 'Blog', 'Contact'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Trigger change slightly off the top
    };

    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Get header height for mobile menu positioning
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Recalculate header height if mobile menu is toggled, as it might affect layout briefly if not handled.
  // This is more of a failsafe; with current structure, header height itself isn't changed by mobile menu state.
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isMobileMenuOpen]);

  const baseHeaderClasses = "w-full p-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ease-in-out";
  const scrolledHeaderStyles = "bg-white shadow-lg border-2 border-brand-green rounded-lg";
  const transparentHeaderStyles = "bg-transparent border-none";
  
  const headerDynamicStyles = isScrolled ? scrolledHeaderStyles : transparentHeaderStyles;
  const textColorClass = isScrolled ? 'text-slate-800' : 'text-white';

  return (
    <>
      <header ref={headerRef} className={`${baseHeaderClasses} ${headerDynamicStyles}`}>
        <img src="/Lume_logo_official.svg" alt="Lume Outdoors Logo" className="h-12 w-auto" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className={`${textColorClass} hover:${isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/20 text-white'} px-3 py-2`}
            >
              {item}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className={`${textColorClass} hover:${isScrolled ? 'bg-slate-100' : 'bg-white/20'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-x-0 top-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden
            ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
            bg-white shadow-xl rounded-b-lg border-b-2 border-x-2 border-brand-green`}
          // Apply padding top to push content below the actual sticky header
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <nav className="flex flex-col space-y-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="w-full justify-start text-slate-800 hover:bg-slate-100 hover:text-slate-900 py-3 px-3 text-lg"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
              >
                {item}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar; 