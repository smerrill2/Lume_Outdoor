'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const featuredServices = [
  {
    id: "residential-landscape",
    title: "Residential Landscape",
    description: "Elegant illumination for every corner of your property",
    image: "/servicesphotos/outside.jpg",
  },
  {
    id: "pathway-lighting",
    title: "Pathway Lighting",
    description: "Safe and stunning walkway lighting",
    image: "/projects/newton_project/NEWTON3.jpeg",
  },
  {
    id: "tree-lighting",
    title: "Tree Lighting",
    description: "Dramatic uplighting for any landscape",
    image: "/servicesphotos/tree_lighting.jpeg",
  },
];

function ServicesGrid() {
  const router = useRouter();
  const handleServiceClick = (serviceId) => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { content_name: serviceId });
    }
    router.push(`/services/${serviceId}`);
  };

  return (
    <section id="services" className="py-24 md:py-28 px-4 bg-neutral-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Our Services
          </h2>
        </div>

        {/* Featured Services - 3 Big Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="group relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] md:aspect-[4/5]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-light text-white tracking-tight mb-1.5">
                  {service.title}
                </h3>
                <p className="text-white/50 text-xs font-light mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-white/80 font-semibold text-xs tracking-wide group-hover:text-white transition-colors duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Services Link */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/40 font-light hover:text-white transition-colors duration-300"
          >
            See All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>


      </div>
    </section>
  );
}

export default ServicesGrid;
