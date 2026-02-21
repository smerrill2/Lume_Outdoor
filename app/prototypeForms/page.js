'use client';

import RefinedSplitForm from '@/components/consultation/RefinedSplitForm';
import ImmersiveForm from '@/components/consultation/ImmersiveForm';
import StoryScrollForm from '@/components/consultation/StoryScrollForm';
import EditorialScrollForm from '@/components/consultation/EditorialScrollForm';

export default function PrototypeFormsPage() {
  return (
    <main className="bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,169,40,0.06),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-orange-400 uppercase mb-4">
            Round 2 — Photo-Centric Refinements
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 font-[family-name:var(--font-lora)]">
            Consultation Form Designs
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Three new renditions of the photo-centric builder approach.
            Each one is fully interactive — click through to compare how they feel.
          </p>
        </div>
      </section>

      {/* Form C1: Refined Split Panel */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 font-bold text-sm ring-1 ring-orange-500/30">
                C1
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Refined Split Panel
                </h2>
                <p className="text-white/40 text-sm">
                  Same photo-left / options-right layout, but with a dark theme,
                  tighter spacing, and polished step indicator. Clean and focused.
                </p>
              </div>
            </div>
          </div>
          <RefinedSplitForm />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-white/5" />
      </div>

      {/* Form C2: Full-Bleed Immersive */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 font-bold text-sm ring-1 ring-orange-500/30">
                C2
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Full-Bleed Immersive
                </h2>
                <p className="text-white/40 text-sm">
                  The photo takes over the entire background. Options float on
                  top in a glassmorphic card. Background changes on hover during
                  selection. Cinematic, lets the imagery sell.
                </p>
              </div>
            </div>
          </div>
          <ImmersiveForm />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-white/5" />
      </div>

      {/* Form C3: Vertical Story Scroll */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 font-bold text-sm ring-1 ring-orange-500/30">
                C3
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Vertical Story Scroll
                </h2>
                <p className="text-white/40 text-sm">
                  Magazine-style — select all your areas upfront, then scroll
                  through each one with a full-bleed photo + configuration panel.
                  No wizard buttons, just scroll. Each area gets its own
                  cinematic section.
                </p>
              </div>
            </div>
          </div>
          <StoryScrollForm />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-white/5" />
      </div>

      {/* Original Form C (for reference) */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/40 font-bold text-sm">
                OG
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white/50">
                  Original Photo-Centric Builder
                </h2>
                <p className="text-white/25 text-sm">
                  The original Form C for reference. Light theme version.
                </p>
              </div>
            </div>
          </div>
          <EditorialScrollForm />
        </div>
      </section>
    </main>
  );
}
