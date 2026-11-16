'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { projectDetails, serviceData, testimonials } from '@/lib/content';
import {
  buildServiceAreaFaqs,
  getServiceAreaTown,
  serviceAreaServiceSlugs,
} from '@/lib/serviceAreas';

const primaryButtonClassName =
  'inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300';

function ServiceAreaPage({ townSlug }) {
  const town = getServiceAreaTown(townSlug);
  const router = useRouter();

  if (!town) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Service area not found</h1>
      </div>
    );
  }

  const goToConsultation = () => {
    const attributionSource = `service_area_${town.slug}`;
    if (typeof window.gtag_report_lead_start === 'function') window.gtag_report_lead_start(attributionSource);
    if (typeof window.fbq === 'function') window.fbq('track', 'Schedule');
    router.push('/consultation');
  };

  const featuredProjects = town.featuredProjectSlugs
    .map((projectSlug) => ({ projectSlug, project: projectDetails[projectSlug] }))
    .filter(({ project }) => Boolean(project?.coverImage || project?.galleryImages?.[0]?.src));
  const townTestimonial = testimonials.find((testimonial) => testimonial.name === town.testimonialName);
  const nearbyTowns = town.nearbyTownSlugs.map(getServiceAreaTown).filter(Boolean);
  const townFaqs = buildServiceAreaFaqs(town);
  const isHomeBase = town.slug === 'wichita';

  return (
    <div className="min-h-screen bg-[#FDFBF6]">
      {/* Hero */}
      <section className="relative h-[72svh] min-h-[480px] md:h-[78vh] flex items-end overflow-hidden bg-neutral-950">
        <Image
          src={town.heroImage}
          alt={`Landscape lighting by Lume Outdoor in ${town.heroImageLocation}`}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_35%,rgba(0,0,0,0.8)_100%)]"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 text-white">
          <Link href="/service-areas" className="inline-block text-sm text-white/70 hover:text-white transition-colors duration-300 mb-4">
            Service areas
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] max-w-3xl mb-4 md:mb-5">
            Landscape lighting in <em className="italic font-normal">{town.name}</em>, KS
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mb-8">
            Custom outdoor lighting design, installation and repair for {town.name} homes.{' '}
            {isHomeBase ? 'Designed and installed by a local Wichita team.' : `${town.distanceSummary}.`}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <button type="button" onClick={goToConsultation} className={`self-start sm:self-auto ${primaryButtonClassName}`}>
              Schedule a Free Consultation
            </button>
            <a
              href="tel:+13166551270"
              className="self-start sm:self-auto text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors duration-300"
            >
              Call (316) 655-1270
            </a>
          </div>
          {town.heroImageLocation !== `${town.name}, KS` && !town.heroImageLocation.endsWith(town.name) && (
            <p className="mt-8 text-xs text-white/50">Pictured: a Lume project in {town.heroImageLocation}.</p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
            <p className="md:col-span-3 text-sm text-gray-500 pt-2">
              {town.name}, {town.county}
            </p>
            <div className="md:col-span-9">
              <p className="font-display text-2xl md:text-4xl leading-snug text-gray-900 mb-8">{town.intro}</p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">{town.localDetail}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <h2 className="md:col-span-3 text-sm text-gray-500 pt-2 font-body font-normal">
              What we install in {town.name}
            </h2>
            <ul className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 border-t border-gray-300">
              {serviceAreaServiceSlugs.map((serviceSlug) => {
                const service = serviceData[serviceSlug];
                if (!service) return null;
                return (
                  <li key={serviceSlug} className="border-b border-gray-300">
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="group flex items-baseline justify-between gap-5 py-5 text-base md:text-lg text-gray-800 hover:text-orange-600 transition-colors duration-300"
                    >
                      <span>{service.title}</span>
                      <span aria-hidden="true" className="text-gray-400 group-hover:text-orange-600 transition-colors duration-300">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Recent work */}
      {featuredProjects.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] text-gray-900">
                Recent <em className="italic font-normal">work</em>
              </h2>
              <Link
                href="/projects"
                className="text-gray-900 font-medium underline underline-offset-[6px] decoration-gray-400 hover:decoration-gray-900 transition-colors duration-300"
              >
                See all projects
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map(({ projectSlug, project }) => (
                <Link key={projectSlug} href={`/projects/${projectSlug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200 mb-4">
                    <Image
                      src={project.coverImage || project.galleryImages?.[0]?.src}
                      alt={`${project.title}, ${project.location}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="font-body text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {townTestimonial && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <blockquote className="border-l-2 border-orange-500 pl-6 md:pl-10">
              <p className="font-display text-2xl md:text-3xl leading-snug text-gray-900 mb-6">
                &ldquo;{townTestimonial.text}&rdquo;
              </p>
              <footer className="text-sm text-gray-600">
                {townTestimonial.name}, {townTestimonial.location}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="bg-neutral-950 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
          <h2 className="md:col-span-4 font-display text-4xl md:text-6xl font-medium leading-[1.05]">
            How it <em className="italic font-normal">works</em>
          </h2>
          <ol className="md:col-span-8 border-t border-white/15">
            {serviceData['residential-landscape'].process.map((processStep, processStepIndex) => (
              <li key={processStep} className="flex items-baseline gap-6 md:gap-10 py-5 md:py-6 border-b border-white/15">
                <span className="font-display text-2xl md:text-3xl text-orange-300 tabular-nums w-10 flex-shrink-0">
                  {String(processStepIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-xl text-white/90">{processStep}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
          <h2 className="md:col-span-4 font-display text-4xl md:text-5xl font-medium leading-[1.05] text-gray-900">
            Outdoor lighting in {town.name}: common questions
          </h2>
          <div className="md:col-span-8 border-t border-gray-300">
            {townFaqs.map((faq) => (
              <div key={faq.question} className="py-6 md:py-7 border-b border-gray-300">
                <h3 className="font-body text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby towns */}
      {nearbyTowns.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-6 md:gap-12">
            <h2 className="md:col-span-3 text-sm text-gray-500 pt-2 font-body font-normal">Nearby towns we serve</h2>
            <ul className="md:col-span-9 flex flex-wrap gap-x-8 gap-y-3 text-base md:text-lg">
              {nearbyTowns.map((nearbyTown) => (
                <li key={nearbyTown.slug}>
                  <Link
                    href={`/service-areas/${nearbyTown.slug}`}
                    className="text-gray-900 underline underline-offset-[6px] decoration-gray-400 hover:decoration-gray-900 transition-colors duration-300"
                  >
                    {nearbyTown.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-gray-500 underline underline-offset-[6px] decoration-gray-300 hover:text-gray-900 hover:decoration-gray-900 transition-colors duration-300"
                >
                  All service areas
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-neutral-950 text-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] mb-5">
            Let&rsquo;s light your <em className="italic font-normal">{town.name}</em> home.
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10">
            Every project starts with a free on-site consultation and a custom lighting design.
          </p>
          <button type="button" onClick={goToConsultation} className={primaryButtonClassName}>
            Schedule a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

export default ServiceAreaPage;
