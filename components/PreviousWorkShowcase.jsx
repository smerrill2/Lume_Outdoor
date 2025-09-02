'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { projects } from '@/lib/content';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function PreviousWorkShowcase() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);
  const lastScrollY = useRef(0);
  const scrollSpeed = useRef(0);

  useEffect(() => {
    // Track scroll speed
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed.current = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Animate section title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate project cards
    projectRefs.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(project, 
          { opacity: 0 },
          {
            opacity: 1, 
            duration: prefersReducedMotion ? 0.1 : 0.6,
            delay: prefersReducedMotion ? 0 : index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top 90%",
              toggleActions: "play none none none",
              onEnter: () => {
                // Skip animation if scrolling fast
                if (scrollSpeed.current > 20) {
                  gsap.set(project, { opacity: 1, duration: 0.1 });
                }
              }
            }
          }
        );
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we&apos;ve transformed outdoor spaces across Kansas with professional lighting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-0">
          {projects.map((project, index) => (
            <Link 
              key={project.id}
              href={`/projects/${project.id}`}
              ref={el => projectRefs.current[index] = el}
              className="group relative bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer block"
            >
              {/* Project Image with smooth fade to black */}
              <div className="relative z-0 h-[300px] overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="project-image object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Smooth gradient fade from transparent to black */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></div>
                
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none"></div>

                {/* Featured Star Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      <Star className="w-8 h-8 text-[#FFA928] fill-[#FFA928] drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content overlaying bottom of image */}
              <div className="relative z-10 px-6 pb-5 pt-4 -mt-20 text-white">
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-200 mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-orange-500/20 text-orange-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-orange-400 group-hover:text-orange-300 font-medium transition-colors duration-300">
                  View Project <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300"
          >
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PreviousWorkShowcase;
