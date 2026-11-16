import React from 'react';
import Link from 'next/link';
import { serviceAreaTowns } from '@/lib/serviceAreas';

const SITE_ORIGIN = 'https://www.lumeoutdoor.com';

export const metadata = {
  title: 'Service Areas - Landscape Lighting Around Wichita, KS | Lume Outdoor',
  description:
    'Lume Outdoor designs, installs and repairs landscape lighting in Wichita, Andover, Derby, Maize, Goddard, Newton, El Dorado, Augusta, Hutchinson and nearby Kansas towns.',
  alternates: {
    canonical: `${SITE_ORIGIN}/service-areas`,
  },
  openGraph: {
    title: 'Service Areas - Landscape Lighting Around Wichita, KS | Lume Outdoor',
    description:
      'Landscape lighting design, installation and repair across the Wichita metro and surrounding Kansas towns.',
    url: `${SITE_ORIGIN}/service-areas`,
  },
};

export default function ServiceAreasIndexPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF6]">
      <section className="bg-neutral-950 text-white pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.02] max-w-3xl mb-5">
            Where we <em className="italic font-normal">work</em>
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
            Lume Outdoor is based in Wichita and lights homes across the metro and the towns around it. Pick your town
            to see how we work there.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-gray-300">
            {serviceAreaTowns.map((town) => (
              <li key={town.slug} className="border-b border-gray-300">
                <Link href={`/service-areas/${town.slug}`} className="group block py-6">
                  <span className="block font-display text-3xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {town.name}
                  </span>
                  <span className="block text-sm text-gray-500 mt-1">
                    {town.county} &middot; {town.distanceSummary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-gray-600">
            Don&rsquo;t see your town?{' '}
            <Link
              href="/consultation"
              className="text-gray-900 underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900 transition-colors duration-300"
            >
              Ask us anyway
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
