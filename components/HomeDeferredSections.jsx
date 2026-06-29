'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <SectionPlaceholder variant="dark" height="min-h-[420px]" />,
});
const ServiceAreaMap = dynamic(() => import('@/components/ServiceAreaMap'), {
  loading: () => <SectionPlaceholder variant="dark" height="min-h-[620px]" />,
});
const ContactFormWithJobber = dynamic(() => import('@/components/ContactFormWithJobber'), {
  loading: () => <SectionPlaceholder variant="light" height="min-h-[620px]" />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <SectionPlaceholder variant="light" height="min-h-[520px]" />,
});

function SectionPlaceholder({ variant, height }) {
  const isDark = variant === 'dark';

  return (
    <section className={`${height} ${isDark ? 'bg-neutral-900' : 'bg-amber-50/40'} px-4 py-24`}>
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className={`mx-auto mb-14 h-8 w-56 rounded ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className={`h-64 rounded-xl ${isDark ? 'bg-white/[0.04]' : 'bg-white/70'}`} />
      </div>
    </section>
  );
}

export default function HomeDeferredSections() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <>
          <Testimonials />
          <ServiceAreaMap />
          <ContactFormWithJobber />
          <FAQ />
        </>
      ) : (
        <>
          <SectionPlaceholder variant="dark" height="min-h-[420px]" />
          <SectionPlaceholder variant="dark" height="min-h-[620px]" />
          <SectionPlaceholder variant="light" height="min-h-[620px]" />
          <SectionPlaceholder variant="light" height="min-h-[520px]" />
        </>
      )}
    </div>
  );
}
