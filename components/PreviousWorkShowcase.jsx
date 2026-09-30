import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/content';

function PreviousWorkShowcase() {
  const homePageProjects = projects.filter(project => project.showOnHomePage !== false);

  return (
    <section id="previous-work" className="pt-20 pb-16 md:pt-28 md:pb-20 bg-[#FDFBF6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900">
            Recent <em className="italic font-normal">work</em>
          </h2>
          <Link
            href="/projects"
            className="hidden md:inline-block mb-2 text-gray-900 font-medium underline underline-offset-[6px] decoration-gray-300 hover:decoration-gray-900 transition-colors duration-300"
          >
            See all projects
          </Link>
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
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center ${
                  !isImageLeft ? 'md:[direction:rtl]' : ''
                }`}>
                  {/* Image Side */}
                  <div className="md:col-span-7 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-200 md:[direction:ltr]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 58vw"
                      quality={80}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* Text Side */}
                  <div className="md:col-span-5 md:[direction:ltr] flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mb-2">
                      {project.location} &middot; {project.tags.join(', ')}
                    </p>

                    <h3 className="font-display text-3xl md:text-[2.5rem] font-medium leading-tight text-gray-900 mb-4">
                      {project.title}
                    </h3>

                    <p className="text-base text-gray-600 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <span className="self-start text-sm font-medium text-gray-900 underline underline-offset-[6px] decoration-gray-300 group-hover:decoration-gray-900 transition-colors duration-300">
                      View project
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* See All Projects (mobile) */}
        <div className="md:hidden mt-14">
          <Link
            href="/projects"
            className="flex items-center justify-center h-12 w-full rounded-sm border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            See all projects
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PreviousWorkShowcase;
