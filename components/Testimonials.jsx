'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const testimonials = [
    {
      id: 1,
      name: "Samantha L.",
      location: "Wichita, KS",
      rating: 5,
      text: "Lume Outdoor completely transformed our home's curb appeal. Their design sense is impeccable, and the quality of the lighting has exceeded our expectations.",
    },
    {
      id: 2,
      name: "John & Maria R.",
      location: "Eastborough, Wichita",
      rating: 5,
      text: "The architectural lighting has added a new dimension to our property. The subtle, elegant illumination highlights the unique features of our home beautifully.",
    },
    {
      id: 3,
      name: "Mike Thompson",
      location: "Andover, KS",
      rating: 5,
      text: "Glad I finally called Lume — the patio looks incredible at night now. We're out there grilling and hanging out way more than we used to.",
    }
  ];

  const goTo = useCallback((newIndex, dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goTo(nextIndex, 1);
  }, [activeIndex, testimonials.length, goTo]);

  const goPrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goTo(prevIndex, -1);
  }, [activeIndex, testimonials.length, goTo]);

  const handleSwipe = (endX) => {
    const diff = startX.current - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Touch events (mobile)
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    handleSwipe(e.changedTouches[0].clientX);
  };

  // Mouse events (desktop drag)
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleSwipe(e.clientX);
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < rating ? 'fill-orange-500 text-orange-500' : 'text-white/20'
        }`}
      />
    ));
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 md:py-28 px-4 bg-neutral-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="relative text-center min-h-[200px] md:min-h-[220px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Quote Content */}
          <div
            key={activeIndex}
            className="animate-fadeSlide"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed md:leading-relaxed tracking-tight italic max-w-3xl mx-auto">
              &ldquo;{currentTestimonial.text}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-10 h-px bg-white/20" />
              <div>
                <div className="flex justify-center gap-0.5 mb-1.5">
                  {renderStars(currentTestimonial.rating)}
                </div>
                <span className="text-xs font-light tracking-wide text-white/50 uppercase">
                  {currentTestimonial.name} &mdash; {currentTestimonial.location}
                </span>
              </div>
              <div className="w-10 h-px bg-white/20" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={goPrev}
            className="text-white/30 hover:text-white/70 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                className={`h-px transition-all duration-500 ${
                  index === activeIndex ? 'w-8 bg-white/60' : 'w-4 bg-white/20 hover:bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="text-white/30 hover:text-white/70 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
