'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Star, Phone, ArrowRight, CheckCircle } from 'lucide-react';

const beforeAfterPairs = [
  {
    before: '/before-after/before.png',
    after: '/before-after/after.png',
    label: 'Same Home. Same Evening. Lume Lighting.',
  },
];

const projectPhotos = [
  { src: '/projects/BACKYARD_2.jpeg', alt: 'Landscape lighting backyard' },
  { src: '/projects/BACKYARD_3.jpeg', alt: 'Outdoor patio lighting' },
  { src: '/projects/NEWTON2.jpeg', alt: 'Architectural home lighting' },
  { src: '/projects/NEWTON3.jpeg', alt: 'Pathway and garden lighting' },
  { src: '/projects/BACKYARD_4.jpeg', alt: 'Evening outdoor ambiance' },
  { src: '/projects/NEWTON4.jpeg', alt: 'Premium fixture installation' },
];

const testimonials = [
  {
    name: 'Samantha L.',
    location: 'Wichita, KS',
    rating: 5,
    text: "Lume Outdoor completely transformed our home's curb appeal. Their design sense is impeccable, and the quality of the lighting has exceeded our expectations.",
  },
  {
    name: 'John & Maria R.',
    location: 'Eastborough, KS',
    rating: 5,
    text: 'The architectural lighting Lume installed has added a new dimension to our property. We are thrilled with the result and have received numerous compliments from our neighbors.',
  },
  {
    name: 'Mike Thompson',
    location: 'Andover, KS',
    rating: 5,
    text: "Glad I finally called Lume — the patio looks incredible at night now. We're out there grilling and hanging out way more than we used to. Buddies can't believe it's the same yard.",
  },
];

const benefits = [
  'Free on-site design consultation',
  'Premium brass & copper fixtures',
  'Professional installation in 1-2 days',
  'Lifetime warranty on all fixtures',
  'Smart lighting controls included',
  'Increases home value by up to 20%',
];

function BeforeAfterSlider({ before, after, label }) {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isDragging]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
      >
        <Image src={after} alt={`${label} - After`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <Image src={before} alt={`${label} - Before`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 10L2 10M2 10L4.5 7.5M2 10L4.5 12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 10L18 10M18 10L15.5 7.5M18 10L15.5 12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">Before</div>
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">After</div>
      </div>
      <p className="text-center text-gray-600 mt-3 font-medium">{label}</p>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function PMaxLandingPage() {
  const handleCtaClick = () => {
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }
    window.location.href = '/consultation';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Top Bar */}
      <div className="bg-neutral-900 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Image src="/LogoLume.svg" alt="Lume Outdoor" width={120} height={40} className="invert" />
          <a
            href="tel:+13166551270"
            className="flex items-center gap-2 text-sm font-medium hover:text-orange-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            (316) 655-1270
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/projects/BACKYARD_1.jpeg"
            alt="Luxury outdoor lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/80 text-sm">5.0 Rated in Wichita</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Home Deserves to Shine
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Premium outdoor lighting design & installation for Wichita homeowners.
              See why your neighbors are choosing Lume.
            </p>
            <button
              onClick={handleCtaClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Get Your Free Design Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-white/60 text-sm mt-4">Free consultation &middot; No obligation &middot; Same-week scheduling</p>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-neutral-900 py-4 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white/70 text-sm font-medium">
          <span>100+ Homes Illuminated</span>
          <span>5.0 Star Average Rating</span>
          <span>Lifetime Fixture Warranty</span>
          <span>Wichita&apos;s #1 Choice</span>
        </div>
      </div>

      {/* Before & After Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Drag the slider to see what professional outdoor lighting does for a home.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {beforeAfterPairs.map((pair, index) => (
              <BeforeAfterSlider key={index} {...pair} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why Wichita Homeowners Choose Lume
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleCtaClick}
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Schedule Your Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {projectPhotos.slice(0, 4).map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Recent Work
            </h2>
            <p className="text-lg text-gray-600">Real homes in the Wichita area, transformed by Lume.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projectPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-700 mt-4 mb-6 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your free design consultation today. We&apos;ll visit your property,
            create a custom lighting plan, and show you exactly what&apos;s possible.
          </p>
          <button
            onClick={handleCtaClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-lg text-xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
          >
            Get Your Free Consultation
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-gray-500 text-sm mt-6">
            Or call us directly: <a href="tel:+13166551270" className="text-orange-400 hover:text-orange-300">(316) 655-1270</a>
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <div className="bg-neutral-950 py-6 px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Lume Outdoor Lighting &middot; Wichita, KS &middot; All rights reserved
        </p>
      </div>
    </div>
  );
}
