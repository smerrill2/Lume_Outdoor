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
  X,
} from 'lucide-react';
import { lightingServices, materialTiers } from './formData';

const phases = ['select', 'configure', 'areas', 'contact', 'review'];

export default function ImmersiveForm() {
  const [phase, setPhase] = useState('select');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
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
  const configuredIds = savedAreas.map((a) => a.serviceId);
  const remainingServices = lightingServices.filter((s) => !configuredIds.includes(s.id));

  // Determine background image
  const backgroundService = phase === 'configure' && activeService
    ? activeService
    : phase === 'select' && hoveredServiceId
      ? lightingServices.find((s) => s.id === hoveredServiceId)
      : null;

  const backgroundPhoto = backgroundService?.photo || lightingServices[0]?.photo;

  const pickService = (id) => {
    setSelectedServiceId(id);
    setSelectedSubOptions([]);
    setSelectedMaterial('aluminum');
    setPhase('configure');
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
    setPhase('areas');
  };

  const removeArea = (index) => {
    setSavedAreas((prev) => prev.filter((_, i) => i !== index));
  };

  const goBack = () => {
    if (phase === 'configure') setPhase('select');
    else if (phase === 'areas' && savedAreas.length === 0) setPhase('select');
    else if (phase === 'contact') setPhase('areas');
    else if (phase === 'review') setPhase('contact');
  };

  const phaseIndex = phases.indexOf(phase);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl min-h-[650px] bg-white">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundPhoto}
          alt=""
          fill
          className="object-cover transition-opacity duration-700"
          sizes="100vw"
          priority
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/60" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-[650px]">
        {/* Top bar: progress dots + area count */}
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {phases.map((p, i) => (
              <div
                key={p}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i < phaseIndex
                    ? 'bg-[#1D4B26] w-6'
                    : i === phaseIndex
                      ? 'bg-orange-500 w-6'
                      : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
          {savedAreas.length > 0 && (
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200">
              <span className="text-xs font-medium text-gray-600">
                {savedAreas.length} area{savedAreas.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center px-6 py-4">
          {/* === SELECT === */}
          {phase === 'select' && (
            <div className="w-full max-w-3xl">
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-lora)]">
                  {savedAreas.length > 0
                    ? 'Add Another Area'
                    : 'What would you like to illuminate?'}
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Hover to preview. Click to configure.
                </p>
              </div>

              {/* Horizontal scrollable cards */}
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {remainingServices.map((service) => {
                  const IconComp = service.Icon;
                  const isHovered = hoveredServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => pickService(service.id)}
                      onMouseEnter={() => setHoveredServiceId(service.id)}
                      onMouseLeave={() => setHoveredServiceId(null)}
                      className={`group relative flex-shrink-0 w-40 aspect-[2/3] rounded-xl overflow-hidden snap-start transition-all duration-500 shadow-lg ${
                        isHovered
                          ? 'ring-2 ring-orange-500 scale-105 shadow-xl shadow-orange-500/20'
                          : 'ring-1 ring-black/10'
                      }`}
                    >
                      <Image
                        src={service.photo}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1.5">
                          <IconComp className="w-3.5 h-3.5 text-white" />
                        </div>
                        <p className="font-semibold text-white text-xs leading-tight">
                          {service.name}
                        </p>
                      </div>
                      {/* Hover shine */}
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300" />
                    </button>
                  );
                })}
              </div>

              {savedAreas.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setPhase('areas')}
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2"
                  >
                    View my areas
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === CONFIGURE (Floating card over background) === */}
          {phase === 'configure' && activeService && (
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-2xl">
                {/* Service header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <activeService.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-lora)]">
                      {activeService.name}
                    </h3>
                    <p className="text-xs text-gray-400">{activeService.description}</p>
                  </div>
                </div>

                {/* Sub-options */}
                <div className="mb-6">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Options
                  </h4>
                  <div className="space-y-2">
                    {(activeService.subOptions || []).map((option) => {
                      const isActive = selectedSubOptions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleOption(option.id)}
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isActive
                              ? 'border-orange-300 bg-orange-50'
                              : 'border-gray-100 hover:border-gray-200 bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isActive ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                            }`}
                          >
                            {isActive && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                              {option.name}
                            </p>
                            <p className="text-[11px] text-gray-400">{option.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-6">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Material
                  </h4>
                  <div className="flex gap-2">
                    {materialTiers.map((material) => {
                      const isActive = selectedMaterial === material.id;
                      return (
                        <button
                          key={material.id}
                          onClick={() => setSelectedMaterial(material.id)}
                          className={`flex-1 text-center p-3 rounded-lg border transition-all ${
                            isActive
                              ? 'border-[#1D4B26] bg-[#1D4B26]/5 ring-1 ring-[#1D4B26]/20'
                              : 'border-gray-100 hover:border-gray-200 bg-white'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full mx-auto mb-1.5 ${
                              material.id === 'aluminum'
                                ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                                : material.id === 'brass'
                                  ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                                  : 'bg-gradient-to-br from-purple-400 to-purple-600'
                            }`}
                          />
                          <p className="text-xs text-gray-900 font-medium">{material.name}</p>
                          <p className={`text-[10px] mt-0.5 ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
                            {material.upcharge === 0 ? 'Included' : `+$${material.upcharge.toFixed(2)}`}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Save */}
                <button
                  onClick={saveArea}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Save Area
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* === AREAS === */}
          {phase === 'areas' && (
            <div className="w-full max-w-lg">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 font-[family-name:var(--font-lora)]">
                  Your Areas
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {savedAreas.length} area{savedAreas.length !== 1 ? 's' : ''} configured.
                </p>

                <div className="space-y-2 mb-6">
                  {savedAreas.map((area, index) => {
                    const service = lightingServices.find((s) => s.id === area.serviceId);
                    const material = materialTiers.find((m) => m.id === area.material);
                    if (!service) return null;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                          <p className="text-[11px] text-gray-400">
                            {material?.name}
                            {material?.upcharge > 0 && (
                              <span className="text-orange-600 ml-1">+${material.upcharge.toFixed(2)}</span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => removeArea(index)}
                          className="w-7 h-7 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  {remainingServices.length > 0 && (
                    <button
                      onClick={() => setPhase('select')}
                      className="flex-1 flex items-center justify-center gap-2 border border-dashed border-gray-300 text-gray-400 hover:text-orange-500 hover:border-orange-300 py-3 rounded-xl transition-all text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add More
                    </button>
                  )}
                  <button
                    onClick={() => setPhase('contact')}
                    disabled={savedAreas.length === 0}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === CONTACT === */}
          {phase === 'contact' && (
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 font-[family-name:var(--font-lora)]">
                  Your Details
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  We&apos;ll follow up with a consultation summary.
                </p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="Email *"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="Phone *"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="Property Address"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                  />
                  <textarea
                    value={contactInfo.notes}
                    onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                    rows={3}
                    placeholder="Additional notes..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* === REVIEW === */}
          {phase === 'review' && (
            <div className="w-full max-w-lg">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 font-[family-name:var(--font-lora)]">
                  Review
                </h3>
                <p className="text-gray-500 text-sm mb-6">Confirm and submit.</p>

                <div className="mb-4">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                    Areas ({savedAreas.length})
                  </h4>
                  <div className="space-y-2">
                    {savedAreas.map((area, index) => {
                      const service = lightingServices.find((s) => s.id === area.serviceId);
                      const material = materialTiers.find((m) => m.id === area.material);
                      if (!service) return null;
                      return (
                        <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                              <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="40px" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900 font-medium">{service.name}</p>
                              {area.subOptions.length > 0 && (
                                <p className="text-[11px] text-gray-400">
                                  {area.subOptions
                                    .map((optId) => service.subOptions.find((o) => o.id === optId)?.name)
                                    .filter(Boolean)
                                    .join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{material?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                    <span className="text-gray-400">Name</span>
                    <span className="text-gray-900">{contactInfo.name}</span>
                    <span className="text-gray-400">Email</span>
                    <span className="text-gray-900">{contactInfo.email}</span>
                    <span className="text-gray-400">Phone</span>
                    <span className="text-gray-900">{contactInfo.phone}</span>
                  </div>
                </div>

                <button className="w-full bg-[#1D4B26] hover:bg-[#163d1e] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={goBack}
            className={`flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors ${
              phase === 'select' && savedAreas.length === 0 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {phase === 'contact' && (
            <button
              onClick={() => setPhase('review')}
              disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Review
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
