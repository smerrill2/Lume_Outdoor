'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projectDetails } from '@/lib/content';

function ProjectDetailPage({ projectId }) {
  const projectData = projectDetails[projectId];
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryScrollRef = useRef(null);
  const galleryStartX = useRef(0);
  const galleryIsDragging = useRef(false);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  // Some entries store "Completed: 2025", others just "2026"
  const completedYear = String(projectData.date).replace(/^Completed:\s*/i, '');

  return (
    <div className="min-h-screen bg-[#FDFBF6]">
      {/* Hero */}
      <header className="relative h-[72svh] min-h-[480px] md:h-[80vh] flex items-end overflow-hidden bg-neutral-950">
        <Image
          src={projectData.coverImage}
          alt={projectData.title}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_35%,rgba(0,0,0,0.8)_100%)]"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 text-white">
          <Link href="/projects" className="inline-block text-sm text-white/70 hover:text-white transition-colors duration-300 mb-4">
            Projects
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] max-w-4xl mb-4 md:mb-5">
            {projectData.title}
          </h1>
          <p className="text-sm md:text-base text-white/75">
            {projectData.location} &middot; Completed {completedYear}
          </p>
        </div>
      </header>

      {/* The Vision */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
            <h2 className="md:col-span-3 font-body font-normal text-sm text-gray-500 pt-2">The vision</h2>
            <p className="md:col-span-9 font-display text-2xl md:text-4xl leading-snug text-gray-900">
              {projectData.overview}
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-3" />
            <div className="md:col-span-5">
              <h3 className="font-body text-sm font-normal text-gray-500 mb-4">Client goals</h3>
              <ul className="border-t border-gray-300">
                {projectData.clientGoals.map((goal, goalIndex) => (
                  <li key={goal} className="flex gap-5 py-4 border-b border-gray-300">
                    <span className="text-sm text-gray-400 tabular-nums pt-0.5">
                      {String(goalIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base text-gray-800">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h3 className="font-body text-sm font-normal text-gray-500 mb-4">The challenge</h3>
              <p className="text-base text-gray-700 leading-relaxed border-t border-gray-300 pt-4">
                {projectData.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-neutral-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-end justify-between gap-6 mb-10 md:mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-white">
            Project <em className="italic font-normal">photos</em>
          </h2>
          <div className="hidden md:flex gap-3">
            <button
              type="button"
              onClick={() => galleryScrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' })}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/25 text-white/70 hover:text-white hover:border-white transition-colors duration-300"
              aria-label="Previous photos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => galleryScrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' })}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/25 text-white/70 hover:text-white hover:border-white transition-colors duration-300"
              aria-label="Next photos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={galleryScrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-[max(3rem,calc((100vw-80rem)/2+3rem))] pb-2 cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseDown={(event) => { galleryStartX.current = event.clientX + galleryScrollRef.current.scrollLeft; galleryIsDragging.current = true; }}
          onMouseMove={(event) => { if (!galleryIsDragging.current) return; event.preventDefault(); galleryScrollRef.current.scrollLeft = galleryStartX.current - event.clientX; }}
          onMouseUp={() => { galleryIsDragging.current = false; }}
          onMouseLeave={() => { galleryIsDragging.current = false; }}
        >
          {projectData.galleryImages.map((image) => (
            <button
              type="button"
              key={image.src}
              className="flex-shrink-0 snap-start w-[82vw] sm:w-[60vw] md:w-[42vw] lg:w-[34vw] relative aspect-[4/5] rounded-sm overflow-hidden bg-neutral-900"
              onClick={() => setSelectedImage(image)}
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 82vw, (max-width: 768px) 60vw, (max-width: 1024px) 42vw, 34vw"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900 mb-5">
              Our <em className="italic font-normal">approach</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{projectData.approach}</p>
          </div>
          <ol className="md:col-span-8 border-t border-gray-300">
            {projectData.process.map((step, stepIndex) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] md:grid-cols-[4.5rem_1fr] py-6 md:py-8 border-b border-gray-300">
                <span className="font-display text-2xl md:text-3xl text-orange-600 tabular-nums">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-body text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The Transformation + Testimonial */}
      <section className="bg-neutral-950 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className={`grid md:grid-cols-12 gap-6 md:gap-12 ${projectData.testimonial ? 'mb-20 md:mb-28' : ''}`}>
            <h2 className="md:col-span-3 font-body font-normal text-sm text-white/50 pt-2">The transformation</h2>
            <p className="md:col-span-9 font-display text-2xl md:text-4xl leading-snug text-white/90">
              {projectData.results}
            </p>
          </div>

          {projectData.testimonial && (
            <figure className="max-w-4xl mx-auto text-center">
              <blockquote className="font-display italic text-3xl md:text-5xl leading-[1.2] text-white">
                &ldquo;{projectData.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm text-white/60">
                {projectData.testimonial.author} &middot; {projectData.testimonial.role}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 text-white border-t border-white/10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] mb-5">
            Imagine your home <em className="italic font-normal">here.</em>
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10">
            Every project starts with a free on-site consultation and a custom lighting design.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
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
