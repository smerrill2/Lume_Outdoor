'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { serviceData } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

function ServicesIndexPage() {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const thumbnailOverrides = {
    'pathway-lighting': '/projects/newton_project/NEWTON3.jpeg',
    'architectural': '/projects/crestview_project/showcase_photo.jpeg',
  };

  const serviceEntries = Object.entries(serviceData)
    .filter(([slug]) => slug !== 'commercial-lighting');

  useEffect(() => {
    // Header fade in
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Stagger cards in
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-neutral-900 -mt-[80px] pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white font-light text-sm transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative bg-neutral-900">
        <div
          ref={headerRef}
          className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
            Our Services
          </h1>
          <p className="text-base md:text-lg font-light text-white/50 max-w-2xl mx-auto leading-relaxed">
            Professional outdoor lighting solutions tailored to every space.
            From residential landscapes to commercial properties, we bring your
            vision to light.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {serviceEntries.map(([slug, service], index) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
            >
              {/* Background Image */}
              <Image
                src={thumbnailOverrides[slug] || service.heroImage}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-light text-white mb-1 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-sm font-light text-white/50 mb-4 line-clamp-2">
                  {service.subtitle}
                </p>
                <span className="inline-flex items-center text-xs font-light text-white/60 group-hover:text-white transition-colors duration-300 tracking-wide uppercase">
                  View Details
                  <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-neutral-900 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
            Not sure which service you need?
          </h2>
          <p className="text-sm font-light text-white/50 mb-8 max-w-xl mx-auto">
            Schedule a free consultation and we&apos;ll design the perfect
            lighting plan for your property.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center text-white px-8 py-3 text-sm font-light rounded-lg transition-all duration-300 hover:brightness-110"
            style={{ backgroundColor: '#C96A1B' }}
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ServicesIndexPage;
