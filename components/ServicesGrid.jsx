'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const featuredServices = [
  {
    id: "residential-landscape",
    title: "Residential Landscape",
    description: "Transform your home's outdoor spaces with elegant illumination",
    image: "/servicesphotos/outside.jpg",
  },
  {
    id: "pathway-lighting",
    title: "Pathway Lighting",
    description: "Safe and beautiful walkway illumination",
    image: "/servicesphotos/pathwaylighting.png",
  },
  {
    id: "deck-patio",
    title: "Deck & Patio",
    description: "Perfect outdoor entertaining spaces",
    image: "/servicesphotos/deck&patio.jpg",
  },
];

const moreServices = [
  {
    id: "commercial-lighting",
    title: "Commercial Lighting",
    description: "Professional business illumination",
  },
  {
    id: "security-lighting",
    title: "Security Lighting",
    description: "Enhanced safety and protection",
  },
  {
    id: "architectural",
    title: "Architectural Lighting",
    description: "Highlight your building's features",
  },
  {
    id: "pool-water",
    title: "Pool & Water Features",
    description: "Stunning aquatic illumination",
  },
  {
    id: "holiday-lighting",
    title: "Holiday Lighting",
    description: "Seasonal decorative displays",
  },
];

function ServicesGrid() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const handleServiceClick = (serviceId) => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-amber-50/40 via-orange-50/20 to-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lume Outdoor Offers More for You
          </h2>
          <div className="w-24 h-1 bg-[#FFA928] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional lighting solutions for every outdoor space and need
          </p>
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
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-[#FFA928] font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Toggle */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 text-[#1D4B26] font-medium hover:text-[#FFA928] transition-colors duration-300"
          >
            {showMore ? 'Show Less' : 'See All Services'}
            {showMore ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* More Services - Compact List */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMore ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-w-3xl mx-auto divide-y divide-gray-100">
            {moreServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="group flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div>
                  <h4 className="font-semibold text-[#1D4B26] group-hover:text-[#FFA928] transition-colors duration-200">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {service.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FFA928] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); router.push('/consultation'); }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg font-medium"
          >
            Schedule Today
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
