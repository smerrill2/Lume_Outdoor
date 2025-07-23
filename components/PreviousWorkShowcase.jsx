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

  useEffect(() => {
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
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we've transformed outdoor spaces across Kansas with professional lighting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="group relative rounded-xl overflow-hidden shadow-xl h-[400px] cursor-pointer"
            >
              {/* Project Image with Overlay */}
              <div className="absolute inset-0">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="project-image object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <div className="overlay absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-40"></div>
              
              {/* Featured Star Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <Star className="w-12 h-12 text-[#FFA928] fill-[#FFA928] drop-shadow-lg animate-pulse" />
                    <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold">★</span>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2 text-sm text-orange-300">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="bg-orange-500/80 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
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