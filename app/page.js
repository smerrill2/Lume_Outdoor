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
      <section className="relative h-[calc(72vh+200px)] md:h-[calc(90vh+200px)] -mt-[200px] pt-[200px] flex items-center justify-center overflow-hidden">
        {/* Background Image with optimization */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Professional outdoor lighting installation"
            fill
            priority
            fetchPriority="high"
            quality={76}
            sizes="100vw"
            className="scale-x-[-1] object-cover object-[center_45%] md:scale-x-100 md:object-[center_30%]"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Text content */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}>
              Illuminate Your Outdoor Dreams
            </h1>

            <p className="text-lg md:text-xl font-light mb-8 text-gray-200 max-w-3xl mx-auto tracking-wide" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)' }}>
              Professional landscape lighting designed to elevate your home after dark.
            </p>
            
            <Button
              asChild
              size="lg"
              className="text-white px-8 py-4 text-lg font-light rounded-lg transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: '#C96A1B' }}
            >
              <Link href="/consultation">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
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
