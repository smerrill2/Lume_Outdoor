'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/content';

function PreviousWorkShowcase() {
  const homePageProjects = projects.filter(project => project.showOnHomePage !== false);

  return (
    <section id="previous-work" className="py-24 md:py-28 bg-amber-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Recent Projects
          </h2>
        </div>

        {/* Alternating Mosaic Rows */}
        <div className="flex flex-col gap-16 md:gap-20">
          {homePageProjects.map((project, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center ${
                  !isImageLeft ? 'md:[direction:rtl]' : ''
                }`}>
                  {/* Image Side */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden md:[direction:ltr]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* Text Side */}
                  <div className="md:[direction:ltr] flex flex-col justify-center py-2 md:py-4">
                    <span className="text-xs font-light tracking-wide text-gray-400 uppercase mb-3 block">
                      {project.location}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm md:text-base font-light text-gray-500 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-light tracking-wide text-gray-400 border border-gray-200 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-gray-900 font-semibold text-xs tracking-wide group-hover:text-gray-600 transition-colors duration-300">
                      View Project <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-16 md:mt-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-900 font-semibold text-xs tracking-wide hover:text-gray-600 transition-colors duration-300"
          >
            See More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PreviousWorkShowcase;
