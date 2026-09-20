import React from 'react';
import ServicePage from '@/components/ServicePage';
import { serviceData } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.seoTitle || `${service.title} - Professional Installation`,
    description: service.seoDescription || service.description,
    alternates: {
      canonical: `https://lumeoutdoor.com/services/${slug}`,
    },
    openGraph: {
      title: service.seoTitle || `${service.title} - Professional Installation | Lume Outdoor`,
      description: service.seoDescription || service.description,
      url: `https://lumeoutdoor.com/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription || service.description,
    url: `https://lumeoutdoor.com/services/${slug}`,
    areaServed: {
      '@type': 'City',
      name: 'Wichita',
      containedInPlace: {
        '@type': 'State',
        name: 'Kansas',
      },
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Lume Outdoor',
      url: 'https://lumeoutdoor.com',
      telephone: '+1-316-655-1270',
    },
  };
  const faqSchema = service.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      )}
      <ServicePage slug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({
    slug: slug,
  }));
}
