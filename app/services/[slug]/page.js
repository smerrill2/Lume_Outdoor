import React from 'react';
import ServicePage from '@/components/ServicePage';
import { serviceData } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const service = serviceData[params.slug];
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} - Professional Installation`,
    description: service.description,
    openGraph: {
      title: `${service.title} - Professional Installation | Lume Outdoor`,
      description: service.description,
    },
  };
}

export default function ServiceDetailPage({ params }) {
  const service = serviceData[params.slug];
  
  if (!service) {
    notFound();
  }
  
  return <ServicePage slug={params.slug} />;
}

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({
    slug: slug,
  }));
}