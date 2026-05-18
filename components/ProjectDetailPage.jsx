'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projectDetails } from '@/lib/content';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ProjectDetailPage({ projectId }) {
  const projectData = projectDetails[projectId];
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryScrollRef = useRef(null);
  const galleryStartX = useRef(0);
  const galleryIsDragging = useRef(false);
  
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRefs = useRef([]);
  const galleryRef = useRef(null);
  const galleryItemsRef = useRef([]);
  
  useEffect(() => {
    // Header parallax effect
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 100,
      ease: "none"
    });
    
    // Content sections animation
    contentRefs.current.forEach((section, index) => {
      if (!section) return;
      
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Gallery items animation
    if (galleryItemsRef.current.length > 0) {
      gsap.fromTo(
        galleryItemsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [projectId]);
  
  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-white" ref={sectionRef}>
      {/* Hero Header with Parallax */}
      <header 
        ref={headerRef}
        className="relative h-[calc(49vh+80px)] min-h-[500px] md:h-[calc(70vh+80px)] md:min-h-[680px] -mt-[80px] pt-[80px] flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={projectData.coverImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto relative z-10 px-4 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
              {projectData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-light tracking-wide text-white/70">
              <span>{projectData.location}</span>
              <span className="hidden sm:inline text-white/30">&mdash;</span>
              <span>Completed: {projectData.date}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Swipeable Photo Gallery — right after hero */}
      <section className="py-10 md:py-16 bg-neutral-900">
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-white">Project Photos</h2>
        </div>

        <div className="relative">
          {/* Scroll container */}
          <div
            ref={galleryScrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-[calc((100vw-64rem)/2+1rem)] pb-4 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={(e) => { galleryStartX.current = e.clientX + galleryScrollRef.current.scrollLeft; galleryIsDragging.current = true; }}
            onMouseMove={(e) => { if (!galleryIsDragging.current) return; e.preventDefault(); galleryScrollRef.current.scrollLeft = galleryStartX.current - e.clientX; }}
            onMouseUp={() => { galleryIsDragging.current = false; }}
            onMouseLeave={() => { galleryIsDragging.current = false; }}
          >
            {projectData.galleryImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 35vw"
                />
              </div>
            ))}
          </div>

          {/* Nav arrows — desktop only */}
          <button
            onClick={() => galleryScrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => galleryScrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      <main>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">

            {/* Project Overview */}
            <section ref={el => contentRefs.current[0] = el} className="mb-20">
              <div className="bg-amber-50/40 rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">The Vision</h2>
                <p className="text-base md:text-lg font-light leading-relaxed text-gray-600 mb-8">
                  {projectData.overview}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-light tracking-wide text-gray-900 mb-4 uppercase">Client Goals</h3>
                    <ul className="space-y-3">
                      {projectData.clientGoals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm font-light text-gray-600">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-light tracking-wide text-gray-900 mb-4 uppercase">The Challenge</h3>
                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                      {projectData.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Approach */}
            <section ref={el => contentRefs.current[1] = el} className="mb-20">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">Our Approach</h2>
              <p className="text-base font-light text-gray-500 leading-relaxed mb-12 max-w-2xl">
                {projectData.approach}
              </p>

              <div className="space-y-10">
                {projectData.process.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <span className="text-3xl font-extralight text-gray-300 w-10 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-light text-gray-900 tracking-wide mb-2">{step.title}</h3>
                      <p className="text-xs font-light text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section ref={el => contentRefs.current[2] = el} className="mb-20">
              <div className="bg-neutral-900 rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-6">The Transformation</h2>
                <p className="text-base font-light leading-relaxed text-white/60">
                  {projectData.results}
                </p>
              </div>
            </section>

            {/* Testimonial */}
            <section ref={el => contentRefs.current[3] = el} className="mb-20">
              <div className="text-center py-10">
                <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed italic max-w-3xl mx-auto">
                  &ldquo;{projectData.testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="w-10 h-px bg-gray-300" />
                  <span className="text-xs font-light tracking-wide text-gray-400 uppercase">
                    {projectData.testimonial.author} &mdash; {projectData.testimonial.role}
                  </span>
                  <div className="w-10 h-px bg-gray-300" />
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">Ready to transform your property?</h2>
              <p className="text-sm font-light text-gray-500 mb-8 max-w-xl mx-auto">
                Every project starts with a free consultation.
              </p>
              <Button
                className="text-white px-8 py-3 text-sm font-light rounded-lg transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: '#C96A1B' }}
                onClick={() => window.location.href = '/consultation'}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </section>
          </div>
        </div>
      </main>
      
      {/* Lightbox for full-size images */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full h-[90vh]">
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;
