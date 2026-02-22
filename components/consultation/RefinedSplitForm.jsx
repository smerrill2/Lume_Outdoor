'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Check,
  Plus,
  ChevronRight,
  ChevronLeft,
  Send,
  Trash2,
  CircleDot,
  ArrowRight,
} from 'lucide-react';
import { lightingServices, materialTiers } from './formData';

const steps = [
  { id: 'select', label: 'Area' },
  { id: 'configure', label: 'Configure' },
  { id: 'areas', label: 'Summary' },
  { id: 'contact', label: 'Details' },
  { id: 'review', label: 'Review' },
];

export default function RefinedSplitForm() {
  const [activeStep, setActiveStep] = useState('select');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedSubOptions, setSelectedSubOptions] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum');
  const [savedAreas, setSavedAreas] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const activeService = lightingServices.find((s) => s.id === selectedServiceId);
  const activeMaterialData = materialTiers.find((m) => m.id === selectedMaterial);
  const configuredServiceIds = savedAreas.map((a) => a.serviceId);
  const remainingServices = lightingServices.filter(
    (s) => !configuredServiceIds.includes(s.id)
  );

  const stepIndex = steps.findIndex((s) => s.id === activeStep);

  const pickService = (id) => {
    setSelectedServiceId(id);
    setSelectedSubOptions([]);
    setSelectedMaterial('aluminum');
    setActiveStep('configure');
  };

  const toggleOption = (optionId) => {
    setSelectedSubOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const saveArea = () => {
    setSavedAreas((prev) => [
      ...prev,
      {
        serviceId: selectedServiceId,
        subOptions: [...selectedSubOptions],
        material: selectedMaterial,
      },
    ]);
    setSelectedServiceId(null);
    setSelectedSubOptions([]);
    setSelectedMaterial('aluminum');
    setActiveStep('areas');
  };

  const removeArea = (index) => {
    setSavedAreas((prev) => prev.filter((_, i) => i !== index));
  };

  const goBack = () => {
    if (activeStep === 'configure') setActiveStep('select');
    else if (activeStep === 'areas') {
      if (savedAreas.length === 0) setActiveStep('select');
    } else if (activeStep === 'contact') setActiveStep('areas');
    else if (activeStep === 'review') setActiveStep('contact');
  };

  return (
    <div className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Minimal step indicator */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i < stepIndex
                    ? 'bg-[#1D4B26] text-white'
                    : i === stepIndex
                      ? 'bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30'
                      : 'text-white/20'
                }`}
              >
                {i < stepIndex ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="w-4 text-center">{i + 1}</span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-4 h-px mx-0.5 ${
                    i < stepIndex ? 'bg-[#1D4B26]' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        {savedAreas.length > 0 && (
          <span className="text-xs text-white/30">
            {savedAreas.length} area{savedAreas.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* === SELECT === */}
      {activeStep === 'select' && (
        <div className="p-6 md:p-10">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
              {savedAreas.length > 0
                ? 'Add Another Area'
                : 'What would you like to illuminate?'}
            </h3>
            <p className="text-white/40 text-sm">
              {savedAreas.length > 0
                ? `${savedAreas.length} area${savedAreas.length !== 1 ? 's' : ''} configured. Pick another to add.`
                : 'Select a lighting area to begin your custom consultation.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {remainingServices.map((service) => {
              const IconComp = service.Icon;
              return (
                <button
                  key={service.id}
                  onClick={() => pickService(service.id)}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/40 transition-all duration-300"
                >
                  <Image
                    src={service.photo}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:bg-orange-500/20 transition-colors">
                      <IconComp className="w-4 h-4 text-white/70 group-hover:text-orange-300 transition-colors" />
                    </div>
                    <p className="font-semibold text-white text-sm leading-tight">
                      {service.name}
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Corner arrow */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              );
            })}
          </div>

          {savedAreas.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setActiveStep('areas')}
                className="text-sm text-white/30 hover:text-orange-400 transition-colors flex items-center gap-2"
              >
                Back to my areas
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* === CONFIGURE (Split: Photo Left / Options Right) === */}
      {activeStep === 'configure' && activeService && (
        <div className="flex flex-col lg:flex-row min-h-[560px]">
          {/* Photo side */}
          <div className="relative lg:w-[50%] aspect-[4/3] lg:aspect-auto">
            <Image
              src={activeService.photo}
              alt={activeService.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0f0f0f]" />

            {/* Service label on photo */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-8 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
                <activeService.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-lora)]">
                {activeService.name}
              </h3>
              <p className="text-sm text-white/50 mt-1 max-w-[240px]">
                {activeService.description}
              </p>
            </div>
          </div>

          {/* Options side */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {/* Sub-options */}
            <div className="mb-8">
              <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
                Select Options
              </h4>
              <div className="space-y-2">
                {(activeService.subOptions || []).map((option) => {
                  const isActive = selectedSubOptions.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? 'border-orange-500/40 bg-orange-500/10'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-white/20'
                        }`}
                      >
                        {isActive && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-white/70'}`}>
                          {option.name}
                        </p>
                        <p className="text-xs text-white/30">{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material */}
            <div className="mb-8">
              <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
                Fixture Material
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {materialTiers.map((material) => {
                  const isActive = selectedMaterial === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`relative text-center p-4 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? 'border-[#1D4B26] bg-[#1D4B26]/15 ring-1 ring-[#1D4B26]/30'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                          material.id === 'aluminum'
                            ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                            : material.id === 'brass'
                              ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                              : 'bg-gradient-to-br from-purple-400 to-purple-600'
                        }`}
                      >
                        {isActive && (
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-white text-xs">{material.name}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{material.tier}</p>
                      <p className={`text-xs font-bold mt-1.5 ${isActive ? 'text-orange-400' : 'text-white/40'}`}>
                        {material.upcharge === 0 ? 'Included' : `+$${material.upcharge.toFixed(2)}`}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Material description */}
              {activeMaterialData && (
                <div className="mt-3 bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <p className="text-[11px] text-white/40 mb-2">{activeMaterialData.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMaterialData.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-full border border-white/5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save */}
            <button
              onClick={saveArea}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Save This Area
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* === AREAS SUMMARY === */}
      {activeStep === 'areas' && (
        <div className="p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
            Your Lighting Areas
          </h3>
          <p className="text-white/40 text-sm mb-8">
            {savedAreas.length} area{savedAreas.length !== 1 ? 's' : ''} configured.
          </p>

          <div className="space-y-3 mb-8">
            {savedAreas.map((area, index) => {
              const service = lightingServices.find((s) => s.id === area.serviceId);
              const material = materialTiers.find((m) => m.id === area.material);
              if (!service) return null;
              const IconComp = service.Icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="56px" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-white/80" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{service.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {area.subOptions.length > 0
                        ? area.subOptions
                            .map((optId) => service.subOptions.find((o) => o.id === optId)?.name)
                            .filter(Boolean)
                            .join(', ')
                        : 'No specific options'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <CircleDot
                        className={`w-3 h-3 ${
                          material?.id === 'aluminum'
                            ? 'text-gray-400'
                            : material?.id === 'brass'
                              ? 'text-amber-500'
                              : 'text-purple-400'
                        }`}
                      />
                      <span className="text-xs text-white/40">
                        {material?.name}
                        {material?.upcharge > 0 && (
                          <span className="text-orange-400 ml-1">+${material.upcharge.toFixed(2)}/light</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeArea(index)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {remainingServices.length > 0 && (
              <button
                onClick={() => setActiveStep('select')}
                className="flex-1 flex items-center justify-center gap-2 border border-dashed border-white/15 hover:border-orange-500/40 text-white/30 hover:text-orange-400 py-3.5 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Another Area
              </button>
            )}
            <button
              onClick={() => setActiveStep('contact')}
              disabled={savedAreas.length === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-white/5 disabled:text-white/20 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* === CONTACT === */}
      {activeStep === 'contact' && (
        <div className="p-6 md:p-10">
          <div className="max-w-lg mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
              Your Details
            </h3>
            <p className="text-white/40 text-sm mb-8">
              We&apos;ll send you a consultation summary and schedule your free visit.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Smith', required: true },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                    {field.label} {field.required && '*'}
                  </label>
                  <input
                    type={field.type}
                    value={contactInfo[field.key]}
                    onChange={(e) => setContactInfo({ ...contactInfo, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="john@email.com"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="(316) 555-0100"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  placeholder="123 Main St, Wichita, KS"
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                  Notes
                </label>
                <textarea
                  value={contactInfo.notes}
                  onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                  rows={3}
                  placeholder="Tell us about your property or timeline..."
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === REVIEW === */}
      {activeStep === 'review' && (
        <div className="p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
              Review Your Consultation
            </h3>
            <p className="text-white/40 text-sm mb-8">Confirm everything looks good.</p>

            <div className="mb-6">
              <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">
                Lighting Areas ({savedAreas.length})
              </h4>
              <div className="space-y-2">
                {savedAreas.map((area, index) => {
                  const service = lightingServices.find((s) => s.id === area.serviceId);
                  const material = materialTiers.find((m) => m.id === area.material);
                  if (!service) return null;
                  return (
                    <div key={index} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{service.name}</p>
                        {area.subOptions.length > 0 && (
                          <p className="text-xs text-white/40 mt-0.5">
                            {area.subOptions
                              .map((optId) => service.subOptions.find((o) => o.id === optId)?.name)
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-white font-medium">{material?.name}</p>
                        {material?.upcharge > 0 && (
                          <p className="text-xs text-orange-400">+${material.upcharge.toFixed(2)}/light</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-8">
              <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">
                Contact
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <span className="text-white/30">Name</span>
                <span className="text-white">{contactInfo.name}</span>
                <span className="text-white/30">Email</span>
                <span className="text-white">{contactInfo.email}</span>
                <span className="text-white/30">Phone</span>
                <span className="text-white">{contactInfo.phone}</span>
                {contactInfo.address && (
                  <>
                    <span className="text-white/30">Address</span>
                    <span className="text-white">{contactInfo.address}</span>
                  </>
                )}
              </div>
            </div>

            <button className="w-full bg-[#1D4B26] hover:bg-[#163d1e] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg">
              <Send className="w-5 h-5" />
              Submit Consultation Request
            </button>
            <p className="text-xs text-white/20 text-center mt-3">
              You&apos;ll receive a PDF summary via email.
            </p>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="border-t border-white/5 bg-white/[0.02] px-6 py-4 flex items-center justify-between">
        <button
          onClick={goBack}
          className={`flex items-center gap-2 text-sm font-medium text-white/30 hover:text-white transition-colors ${
            activeStep === 'select' && savedAreas.length === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {activeStep === 'contact' && (
          <button
            onClick={() => setActiveStep('review')}
            disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-white/5 disabled:text-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Review
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {activeStep !== 'contact' && activeStep !== 'review' && activeStep !== 'areas' && activeStep !== 'configure' && (
          <div className="w-20" />
        )}
      </div>
    </div>
  );
}
