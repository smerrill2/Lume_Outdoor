'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Sparkles, Lightbulb, Calendar, MapPin, X } from 'lucide-react';
import { projectDetails } from '@/lib/content';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ProjectDetailPage({ projectId }) {
  const projectData = projectDetails[projectId];
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
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

  const filteredImages = activeFilter === 'all' 
    ? projectData.galleryImages 
    : projectData.galleryImages.filter(img => img.category === activeFilter);
  
  return (
    <div className="min-h-screen bg-white" ref={sectionRef}>
      <Navbar />
      
      {/* Hero Header with Parallax */}
      <header 
        ref={headerRef}
        className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden"
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
            <div className="flex items-center gap-4 mb-6">
              <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
              <span className="text-orange-500 font-semibold uppercase tracking-wider">Featured Project</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              {projectData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>{projectData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>{projectData.date}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative light beams */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </header>
      
      <main>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Project Overview with Enhanced Styling */}
            <section ref={el => contentRefs.current[0] = el} className="mb-20">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-10 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-8 h-8 text-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-900">The Vision</h2>
                </div>
                <p className="text-xl leading-relaxed text-gray-700 mb-8">
                  {projectData.overview}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Client Goals</h3>
                    <ul className="space-y-3">
                      {projectData.clientGoals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">The Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {projectData.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Our Approach with Timeline */}
            <section ref={el => contentRefs.current[1] = el} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {projectData.approach}
                </p>
              </div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-500/30"></div>
                
                <div className="space-y-12">
                  {projectData.process.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className="absolute left-8 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                      <div className="ml-20">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Results Section with Special Styling */}
            <section ref={el => contentRefs.current[2] = el} className="mb-20">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-orange-600" />
                    <h2 className="text-3xl font-bold text-gray-900">The Transformation</h2>
                  </div>
                  <p className="text-xl leading-relaxed text-gray-700">
                    {projectData.results}
                  </p>
                  <p className="mt-6 text-lg font-medium text-orange-600">
                    Now her entry is safe, the curb appeal is unmistakable, and the neighbors can&apos;t stop talking. 
                    One evening, one transformation—exactly what Lūme Outdoor Lighting is all about.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Testimonial with Enhanced Design */}
            <section ref={el => contentRefs.current[3] = el} className="mb-20">
              <div className="bg-gray-900 text-white rounded-2xl p-10 relative">
                <div className="absolute top-6 left-6 text-6xl text-orange-500/20">&quot;</div>
                <div className="relative z-10">
                  <blockquote className="text-2xl leading-relaxed mb-6 italic">
                    {projectData.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-px bg-orange-500"></div>
                    <div>
                      <cite className="text-lg font-semibold not-italic">{projectData.testimonial.author}</cite>
                      <p className="text-orange-400">{projectData.testimonial.role}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 text-6xl text-orange-500/20 rotate-180">&quot;</div>
              </div>
            </section>
            
            {/* Enhanced Gallery Section */}
            <section ref={galleryRef} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
                <p className="text-lg text-gray-600 mb-8">
                  See the stunning transformation from every angle
                </p>
                
                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'all' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Photos
                  </button>
                  <button
                    onClick={() => setActiveFilter('before')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'before' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setActiveFilter('after')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'after' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    After
                  </button>
                  <button
                    onClick={() => setActiveFilter('detail')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'detail' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Details
                  </button>
                </div>
              </div>
              
              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div 
                    key={index}
                    ref={el => galleryItemsRef.current[index] = el}
                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image 
                        src={image.src} 
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-sm font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add more photos placeholder */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 italic">
                  More photos coming soon...
                </p>
              </div>
            </section>
            
            {/* CTA with Enhanced Design */}
            <section className="text-center py-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-orange-100 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Ready to Light Up Your Property?</h2>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Join our growing list of satisfied homeowners who now see their properties in a whole new light.
                </p>
                <Button 
                  className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg text-lg font-medium transform hover:scale-105 transition-all"
                  onClick={() => window.location.href = '/?view=consultation'}
                >
                  Schedule Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
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
      
      <Footer />
    </div>
  );
}

export default ProjectDetailPage;