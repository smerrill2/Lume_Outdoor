import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/content';

export const metadata = {
  title: 'Our Projects - Lume Outdoor',
  description: 'Explore our portfolio of outdoor lighting projects and see how we transform properties with custom lighting solutions.',
};

const blurPlaceholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

export default function ProjectsPage() {
  const headerProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <div className="min-h-screen bg-[#FDFBF6]">
      {/* Header: full-bleed photo of the featured project */}
      <section className="relative h-[62svh] min-h-[440px] md:h-[70vh] flex items-end overflow-hidden bg-neutral-950">
        <Image
          src={headerProject.image}
          alt={headerProject.title}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_35%,rgba(0,0,0,0.75)_100%)]"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 text-white">
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] mb-4">
            Selected <em className="italic font-normal">work</em>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
            Homes across Wichita, Newton, and the surrounding area, each lit with a design built for the architecture and the landscape.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-20">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={78}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
              </div>

              <div className="mt-5 md:mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  {project.location} &middot; {project.tags.join(', ')}
                </p>
                <h2 className="font-display text-3xl md:text-[2.1rem] font-medium leading-tight text-gray-900 mb-3">
                  {project.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-2 max-w-xl mb-4">
                  {project.description}
                </p>
                <span className="text-sm font-medium text-gray-900 underline underline-offset-[6px] decoration-gray-300 group-hover:decoration-gray-900 transition-colors duration-300">
                  View project
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 text-white py-20 md:py-28">
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
    </div>
  );
}
