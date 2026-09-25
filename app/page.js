import Image from 'next/image';
import Link from 'next/link';
import ServicesGrid from '@/components/ServicesGrid';
import PreviousWorkShowcase from '@/components/PreviousWorkShowcase';
import ServiceProcess from '@/components/ServiceProcess';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HomeDeferredSections from '@/components/HomeDeferredSections';

const heroBackground = '/projects/crestview_project/showcase_photo-hero.webp';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[calc(86svh+200px)] md:h-[calc(90vh+200px)] -mt-[200px] pt-[200px] flex items-end md:items-center justify-center overflow-hidden">
        {/* Background Image with optimization */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Professional outdoor lighting installation"
            fill
            priority
            fetchPriority="high"
            quality={84}
            sizes="100vw"
            className="scale-x-[-1] object-cover object-[center_45%] md:scale-x-100 md:object-[center_30%]"
          />
        </div>

        {/* Legibility scrim: darkens behind the header and the bottom-anchored copy on mobile */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.6)_82%,rgba(0,0,0,0.8)_100%)] md:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.45)_100%)]"
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-6 pb-14 md:pb-0 max-w-4xl mx-auto">
          {/* Text content */}
          <div className="relative z-10">
            <h1 className="text-[2.6rem] md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.08] md:leading-tight tracking-tight md:tracking-normal text-balance" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}>
              Illuminate Your Outdoor Dreams
            </h1>

            <p className="text-base md:text-xl font-light mb-8 text-gray-200 max-w-[20rem] md:max-w-3xl mx-auto tracking-wide text-balance" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)' }}>
              Professional landscape lighting designed to elevate your home after dark.
            </p>
            
            <Button
              asChild
              size="lg"
              className="btn-glass h-14 px-8 text-lg"
            >
              <Link href="/consultation">
                Schedule a Consultation
                <ArrowRight className="btn-arrow w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* #1 Professional Banner */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-neutral-900 py-2 text-white/60 overflow-hidden border-b border-white/5">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
          <span className="text-xs md:text-sm font-light tracking-[0.25em] mx-10">
            #1 LIGHTING PROFESSIONAL IN WICHITA
          </span>
        </div>
      </div>

      {/* As Featured In */}
      <div className="py-10 md:py-14 bg-amber-50/40">
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-[11px] md:text-xs font-light tracking-[0.3em] text-gray-400 uppercase">As Featured In</span>
          <a
            href="https://www.realproducersmagazine.com/home/wichita"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/logos/real_producers.png"
              alt="Real Producers - Wichita"
              width={180}
              height={60}
              className="object-contain"
            />
          </a>
        </div>
      </div>

      <ServicesGrid />
      <PreviousWorkShowcase />
      <ServiceProcess />
      <HomeDeferredSections />
    </div>
  );
}
