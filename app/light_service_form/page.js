'use client';

import StoryScrollForm from '@/components/consultation/StoryScrollForm';

export default function PrototypeFormsPage() {
  return (
    <main className="bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,169,40,0.06),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-orange-400 uppercase mb-4">
            Consultation Form Prototype
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 font-[family-name:var(--font-lora)]">
            Consultation Form Design
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Vertical story scroll — select your areas upfront, then scroll
            through each one with a full-bleed photo + configuration panel.
          </p>
        </div>
      </section>

      {/* Form C3: Vertical Story Scroll */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <StoryScrollForm />
        </div>
      </section>
    </main>
  );
}
