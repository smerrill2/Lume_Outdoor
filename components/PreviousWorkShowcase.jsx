'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/content';
import { Star } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function PreviousWorkShowcase() {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  
  useEffect(() => {
    // Initialize project refs array
    projectRefs.current = projectRefs.current.slice(0, projects.length);
    
    // Create a scroll animation for the section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Staggered animations for each project
    gsap.fromTo(
      projectRefs.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Add hover animations for each project card
    projectRefs.current.forEach(card => {
      const image = card.querySelector('.project-image');
      const overlay = card.querySelector('.overlay');
      const content = card.querySelector('.content');
      
      // Create a hover animation timeline
      const hoverTimeline = gsap.timeline({ paused: true });
      
      hoverTimeline
        .to(image, { scale: 1.05, duration: 0.4 })
        .to(overlay, { opacity: 0.7, duration: 0.4 }, 0)
        .to(content, { y: -10, duration: 0.4 }, 0);
      
      // Add event listeners
      card.addEventListener('mouseenter', () => hoverTimeline.play());
      card.addEventListener('mouseleave', () => hoverTimeline.reverse());
    });
  }, [projects.length]);
  
  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">Our Previous Work</h2>
        <div className="w-24 h-1 bg-[#FFA928] mx-auto mb-6"></div>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
          Explore our portfolio of successfully completed projects and see how we&apos;ve transformed properties with our custom lighting solutions.
        </p>
        
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
                  className="project-image object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="overlay absolute inset-0 bg-black opacity-50 transition-opacity duration-300"></div>
              
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
              <div className="content absolute inset-0 flex flex-col justify-end p-8 transition-all duration-300">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-[#FFA928] text-black text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{project.location}</p>
                <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
                {project.featured ? (
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-[#FFA928] font-medium transition-transform transform group-hover:translate-x-2 duration-300"
                  >
                    <span className="bg-[#FFA928]/20 text-[#FFA928] px-2 py-1 rounded text-xs mr-1">FEATURED</span>
                    View Full Project Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-[#FFA928] font-medium transition-transform transform group-hover:translate-x-2 duration-300"
                  >
                    View Project Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFA928] text-black rounded-lg hover:bg-[#FFA928]/90 transition-colors shadow-md font-medium"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PreviousWorkShowcase;