import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const featuredServices = [
  {
    id: "residential-landscape",
    title: "Residential Landscape",
    description: "Uplighting, bed lighting, and accents designed around your home.",
    image: "/servicesphotos/residential-landscape-card.webp",
  },
  {
    id: "pathway-lighting",
    title: "Pathway Lighting",
    description: "Warm, low-glare light that guides every step to the door.",
    image: "/projects/newton_project/NEWTON3-card.webp",
  },
  {
    id: "tree-lighting",
    title: "Tree Lighting",
    description: "Uplighting that turns mature trees into the centerpiece.",
    image: "/servicesphotos/tree_lighting-card.webp",
  },
];

function ServicesGrid() {
  return (
    <section id="services" className="py-20 md:py-28 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-white">
            Our services
          </h2>
          <Link
            href="/services"
            className="hidden md:inline-block mb-2 text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors duration-300"
          >
            See all services
          </Link>
        </div>

        {/* Featured Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-14">
          {featuredServices.map((service, serviceIndex) => (
            <Link key={service.id} href={`/services/${service.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-800">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-5 md:mt-6">
                <p className="text-sm text-white/40 mb-2 tabular-nums">
                  {String(serviceIndex + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-3xl font-medium leading-tight text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-white/65 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-sm font-medium text-white underline underline-offset-[6px] decoration-white/30 group-hover:decoration-white transition-colors duration-300">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Services (mobile) */}
        <div className="md:hidden mt-14">
          <Link
            href="/services"
            className="flex items-center justify-center h-12 w-full rounded-sm border border-white/40 text-white font-medium hover:bg-white hover:text-neutral-950 transition-colors duration-300"
          >
            See all services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
