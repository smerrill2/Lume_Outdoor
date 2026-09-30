'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { serviceData as allServiceData } from '@/lib/content';

function ServicePage({ slug }) {
  const service = allServiceData[slug];
  const router = useRouter();

  const goToConsultation = () => {
    const source = service.attributionContent || `service_page_${slug}`;
    if (typeof window.gtag_report_lead_start === 'function') window.gtag_report_lead_start(source);
    if (typeof window.fbq === 'function') window.fbq('track', 'Schedule');
    const query = service.attributionContent
      ? `?service=repair-maintenance&utm_content=${encodeURIComponent(service.attributionContent)}`
      : '';
    router.push(`/consultation${query}`);
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Service not found</h1>
      </div>
    );
  }

  const ctaLabel = service.ctaLabel || 'Schedule a Consultation';
  const primaryButtonClassName =
    'inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300';

  return (
    <div className="min-h-screen bg-[#FDFBF6]">
      {/* Hero */}
      <section className="relative h-[72svh] min-h-[480px] md:h-[78vh] flex items-end overflow-hidden bg-neutral-950">
        <Image
          src={service.heroImage}
          alt={service.title}
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
          <Link href="/services" className="inline-block text-sm text-white/70 hover:text-white transition-colors duration-300 mb-4">
            Services
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] max-w-3xl mb-4 md:mb-5">
            {service.title}
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mb-8">
            {service.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <button type="button" onClick={goToConsultation} className={`self-start sm:self-auto ${primaryButtonClassName}`}>
              {ctaLabel}
            </button>
            <Link
              href="/projects"
              className="self-start sm:self-auto text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors duration-300"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Overview + Benefits */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
            <p className="md:col-span-3 text-sm text-gray-500 pt-2">Overview</p>
            <p className="md:col-span-9 font-display text-2xl md:text-4xl leading-snug text-gray-900">
              {service.description}
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <h2 className="md:col-span-3 text-sm text-gray-500 pt-2 font-body font-normal">The benefits</h2>
            <ul className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 border-t border-gray-300">
              {service.benefits.map((benefit, benefitIndex) => (
                <li key={benefit} className="flex gap-5 py-5 border-b border-gray-300">
                  <span className="text-sm text-gray-400 tabular-nums pt-0.5">
                    {String(benefitIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base md:text-lg text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {service.galleryImages?.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {service.galleryImages.map((image, imageIndex) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200">
                <Image
                  src={image.src}
                  alt={image.alt || `${service.title} example ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
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
            {service.process.map((step, stepIndex) => (
              <li key={step} className="flex items-baseline gap-6 md:gap-10 py-5 md:py-6 border-b border-white/15">
                <span className="font-display text-2xl md:text-3xl text-orange-300 tabular-nums w-10 flex-shrink-0">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-xl text-white/90">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs?.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
            <h2 className="md:col-span-4 font-display text-4xl md:text-5xl font-medium leading-[1.05] text-gray-900">
              What to expect from a service visit
            </h2>
            <div className="md:col-span-8 border-t border-gray-300">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="py-6 md:py-7 border-b border-gray-300">
                  <h3 className="font-body text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-neutral-950 text-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] mb-5">
            {service.ctaTitle || (
              <>
                Let&rsquo;s light <em className="italic font-normal">your</em> home.
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-white/75 mb-10">
            {service.ctaBody || 'Every project starts with a free on-site consultation and a custom lighting design.'}
          </p>
          <button type="button" onClick={goToConsultation} className={primaryButtonClassName}>
            {ctaLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
