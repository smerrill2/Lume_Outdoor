import Image from 'next/image';
import Link from 'next/link';
import ServicesGrid from '@/components/ServicesGrid';
import PreviousWorkShowcase from '@/components/PreviousWorkShowcase';
import ServiceProcess from '@/components/ServiceProcess';
import HomeDeferredSections from '@/components/HomeDeferredSections';

const heroBackground = '/projects/hero/lakefront-modern-hero.webp';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[calc(90vh+200px)] -mt-[200px] pt-[200px] flex items-end overflow-hidden bg-neutral-950">
        {/* Background Image: top band on mobile (copy sits below it on black), full-bleed on desktop */}
        <div className="absolute inset-x-0 top-0 h-[calc(52svh+200px)] md:h-auto md:inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Modern Wichita home with architectural uplighting and tree lighting at dusk"
            fill
            priority
            fetchPriority="high"
            quality={84}
            sizes="100vw"
            className="object-cover object-[52%_center] md:object-[center_85%] md:scale-[1.2] md:origin-bottom"
          />
          {/* Mobile: fade the photo into the black behind the copy */}
          <div aria-hidden="true" className="md:hidden absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-neutral-950" />
        </div>

        {/* Legibility scrim: darkens behind the header and softly toward the bottom-left where the copy sits */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_22%)] md:bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0)_70%),linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_25%)]"
        />

        {/* Bottom fade into the Services section background */}
        <div aria-hidden="true" className="hidden md:block absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-b from-transparent to-neutral-950" />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pt-[calc(40svh)] md:pt-0 pb-12 md:pb-14 text-white">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] mb-5 md:mb-6" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>
              Your home,
              <br />
              <em className="italic font-normal">after dark.</em>
            </h1>

            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-md mb-8">
              Custom outdoor lighting for Wichita homes, designed and installed in days, backed by a 20-year fixture warranty.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href="/consultation"
                className="self-start sm:self-auto inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/projects"
                className="self-start sm:self-auto text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors duration-300"
              >
                See our work
              </Link>
            </div>

            {/* Proof row: rating + press */}
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/65">
              <span>Rated 5.0 by Wichita homeowners</span>
              <span aria-hidden="true" className="hidden sm:block h-4 w-px bg-white/25" />
              <a
                href="https://www.realproducersmagazine.com/home/wichita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                As featured in
                <Image
                  src="/logos/real_producers.png"
                  alt="Real Producers - Wichita"
                  width={120}
                  height={40}
                  className="object-contain brightness-0 invert opacity-75"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <PreviousWorkShowcase />
      <ServiceProcess />
      <HomeDeferredSections />
    </div>
  );
}
