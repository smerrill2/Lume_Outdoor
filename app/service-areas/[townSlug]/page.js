import React from 'react';
import { notFound } from 'next/navigation';
import ServiceAreaPage from '@/components/ServiceAreaPage';
import { buildServiceAreaFaqs, getServiceAreaTown, serviceAreaTowns } from '@/lib/serviceAreas';

const SITE_ORIGIN = 'https://www.lumeoutdoor.com';

export async function generateMetadata({ params }) {
  const { townSlug } = await params;
  const town = getServiceAreaTown(townSlug);

  if (!town) {
    return {
      title: 'Service Area Not Found',
    };
  }

  const pageTitle = `Landscape Lighting in ${town.name}, KS | Lume Outdoor`;
  const pageDescription = `Outdoor and landscape lighting design, installation and repair in ${town.name}, Kansas. Free on-site consultation from Lume Outdoor, based in Wichita. Call (316) 655-1270.`;
  const pageUrl = `${SITE_ORIGIN}/service-areas/${town.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [{ url: town.heroImage }],
    },
  };
}

export default async function ServiceAreaTownPage({ params }) {
  const { townSlug } = await params;
  const town = getServiceAreaTown(townSlug);

  if (!town) {
    notFound();
  }

  const pageUrl = `${SITE_ORIGIN}/service-areas/${town.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Landscape lighting in ${town.name}, KS`,
    serviceType: 'Landscape lighting design, installation and repair',
    description: town.intro,
    url: pageUrl,
    areaServed: {
      '@type': 'City',
      name: town.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Kansas',
      },
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Lume Outdoor',
      url: SITE_ORIGIN,
      telephone: '+1-316-655-1270',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'Service areas', item: `${SITE_ORIGIN}/service-areas` },
      { '@type': 'ListItem', position: 3, name: town.name, item: pageUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: buildServiceAreaFaqs(town).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {[serviceSchema, breadcrumbSchema, faqSchema].map((structuredData) => (
        <script
          key={structuredData['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      ))}
      <ServiceAreaPage townSlug={town.slug} />
    </>
  );
}

export async function generateStaticParams() {
  return serviceAreaTowns.map((town) => ({
    townSlug: town.slug,
  }));
}
