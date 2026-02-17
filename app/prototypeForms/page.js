'use client';

import AppleCheckoutForm from '@/components/consultation/AppleCheckoutForm';
import ConfiguratorForm from '@/components/consultation/ConfiguratorForm';
import EditorialScrollForm from '@/components/consultation/EditorialScrollForm';

export default function PrototypeFormsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 bg-[#1D4B26] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,169,40,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-orange-400 uppercase mb-4">
            Prototype Preview
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 font-[family-name:var(--font-lora)]">
            Consultation Form Designs
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Three different approaches for the Lume Outdoor customer
            consultation experience. Each form is fully interactive — click
            through to see how it feels.
          </p>
        </div>
      </section>

      {/* Form A: Apple Checkout */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                A
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Classic Checkout
                </h2>
                <p className="text-gray-500 text-sm">
                  Apple-style multi-step wizard with progress bar. One step at a
                  time, clean and focused.
                </p>
              </div>
            </div>
          </div>
          <AppleCheckoutForm />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-gray-200" />
      </div>

      {/* Form B: Configurator */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                B
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Live Configurator
                </h2>
                <p className="text-gray-500 text-sm">
                  Tesla-style split panel with persistent summary. Build your
                  selection with real-time updates.
                </p>
              </div>
            </div>
          </div>
          <ConfiguratorForm />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-gray-200" />
      </div>

      {/* Form C: Editorial Scroll */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                C
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Photo-Centric Builder
                </h2>
                <p className="text-gray-500 text-sm">
                  Photo on the left, options on the right. Configure one area at a
                  time, then loop back to add more. Premium dark theme.
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
