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
} from 'lucide-react';
import { lightingServices, materialTiers } from './formData';

const phases = [
  { id: 'select', label: 'Choose Area' },
  { id: 'configure', label: 'Configure' },
  { id: 'areas', label: 'Your Areas' },
  { id: 'contact', label: 'Details' },
  { id: 'review', label: 'Review' },
];

export default function EditorialScrollForm() {
  const [phase, setPhase] = useState('select');
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [currentSubOptions, setCurrentSubOptions] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState('aluminum');
  const [configuredAreas, setConfiguredAreas] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const currentService = lightingServices.find(
    (s) => s.id === currentServiceId
  );
  const currentMaterialData = materialTiers.find(
    (m) => m.id === currentMaterial
  );

  const alreadyConfiguredIds = configuredAreas.map((a) => a.serviceId);
  const availableServices = lightingServices.filter(
    (s) => !alreadyConfiguredIds.includes(s.id)
  );

  const selectService = (serviceId) => {
    setCurrentServiceId(serviceId);
    setCurrentSubOptions([]);
    setCurrentMaterial('aluminum');
    setPhase('configure');
  };

  const toggleSubOption = (optionId) => {
    setCurrentSubOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const saveCurrentArea = () => {
    setConfiguredAreas((prev) => [
      ...prev,
      {
        serviceId: currentServiceId,
        subOptions: [...currentSubOptions],
        material: currentMaterial,
      },
    ]);
    setCurrentServiceId(null);
    setCurrentSubOptions([]);
    setCurrentMaterial('aluminum');
    setPhase('areas');
  };

  const removeArea = (index) => {
    setConfiguredAreas((prev) => prev.filter((_, i) => i !== index));
  };

  const getPhaseIndex = () => {
    return phases.findIndex((p) => p.id === phase);
  };

  const goBack = () => {
    if (phase === 'configure') setPhase('select');
    else if (phase === 'areas') {
      if (configuredAreas.length === 0) setPhase('select');
      else setPhase('areas');
    } else if (phase === 'contact') setPhase('areas');
    else if (phase === 'review') setPhase('contact');
  };

  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
      {/* Progress Bar */}
      <div className="bg-gray-900/80 border-b border-gray-800/50 px-6 py-4">
        <div className="flex items-center justify-center gap-1 max-w-md mx-auto">
          {phases.map((step, index) => {
            const currentIndex = getPhaseIndex();
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <div key={step.id} className="flex items-center gap-1 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isComplete
                        ? 'bg-[#1D4B26]'
                        : isCurrent
                          ? 'bg-orange-500 ring-4 ring-orange-500/20'
                          : 'bg-gray-700'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1.5 font-medium transition-colors ${
                      isCurrent
                        ? 'text-orange-400'
                        : isComplete
                          ? 'text-gray-500'
                          : 'text-gray-700'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={`h-px flex-1 -mt-3 ${isComplete ? 'bg-[#1D4B26]' : 'bg-gray-800'}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* === PHASE: SELECT SERVICE === */}
      {phase === 'select' && (
        <div className="p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
            {configuredAreas.length > 0
              ? 'Add Another Area'
              : 'What area would you like to light?'}
          </h3>
          <p className="text-gray-500 mb-8">
            {configuredAreas.length > 0
              ? `You have ${configuredAreas.length} area${configuredAreas.length !== 1 ? 's' : ''} configured. Select another to add.`
              : 'Choose a lighting category to get started with your consultation.'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableServices.map((service) => {
              const IconComponent = service.Icon;
              return (
                <button
                  key={service.id}
                  onClick={() => selectService(service.id)}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/5"
                >
                  <Image
                    src={service.photo}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-semibold text-white text-sm leading-tight">
                      {service.name}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {service.description}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* If they already have areas, let them skip adding more */}
          {configuredAreas.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPhase('areas')}
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2"
              >
                Skip — go back to my areas
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* === PHASE: CONFIGURE SERVICE (Photo Left / Options Right) === */}
      {phase === 'configure' && currentService && (
        <div className="flex flex-col lg:flex-row min-h-[560px]">
          {/* LEFT: Service Photo */}
          <div className="relative lg:w-[45%] aspect-[4/3] lg:aspect-auto">
            <Image
              src={currentService.photo}
              alt={currentService.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-gray-950" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 lg:right-auto lg:max-w-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center mb-3">
                <currentService.Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-lora)]">
                {currentService.name}
              </h3>
              <p className="text-sm text-white/50 mt-1">
                {currentService.description}
              </p>
            </div>
          </div>

          {/* RIGHT: Options & Material */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {/* Sub-options */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                What type of {currentService.name.toLowerCase()}?
              </h4>
              <div className="space-y-2.5">
                {currentService.subOptions.map((option) => {
                  const isSelected = currentSubOptions.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleSubOption(option.id)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-orange-500/40 bg-orange-500/10'
                          : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-600'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}
                        >
                          {option.name}
                        </p>
                        <p className="text-xs text-gray-600">{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Selection */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Fixture Material
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {materialTiers.map((material) => {
                  const isSelected = currentMaterial === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setCurrentMaterial(material.id)}
                      className={`relative text-center p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-orange-500/40 bg-orange-500/10 ring-1 ring-orange-500/20'
                          : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                      }`}
                    >
                      {/* Material dot indicator */}
                      <div
                        className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
                          material.id === 'aluminum'
                            ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                            : material.id === 'brass'
                              ? 'bg-gradient-to-br from-amber-500 to-amber-700'
                              : 'bg-gradient-to-br from-purple-400 to-purple-600'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </div>
                      <p className="font-semibold text-white text-sm">
                        {material.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {material.tier}
                      </p>
                      <p
                        className={`text-sm font-bold mt-2 ${isSelected ? 'text-orange-400' : 'text-gray-400'}`}
                      >
                        {material.upcharge === 0
                          ? 'Included'
                          : `+$${material.upcharge.toFixed(2)}`}
                      </p>
                      <p className="text-[10px] text-gray-600">per light</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material features */}
            {currentMaterialData && (
              <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-800/50">
                <p className="text-xs text-gray-500 mb-2">
                  {currentMaterialData.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentMaterialData.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] bg-gray-800/50 text-gray-400 px-2 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Save button */}
            <button
              onClick={saveCurrentArea}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Save This Area
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* === PHASE: YOUR AREAS (Summary + Add More) === */}
      {phase === 'areas' && (
        <div className="p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
            Your Lighting Areas
          </h3>
          <p className="text-gray-500 mb-8">
            {configuredAreas.length} area
            {configuredAreas.length !== 1 ? 's' : ''} configured. Add more or
            continue to enter your details.
          </p>

          <div className="space-y-3 mb-8">
            {configuredAreas.map((area, index) => {
              const service = lightingServices.find(
                (s) => s.id === area.serviceId
              );
              const material = materialTiers.find(
                (m) => m.id === area.material
              );
              if (!service) return null;
              const IconComponent = service.Icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-900/50 border border-gray-800/50 rounded-xl p-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={service.photo}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {area.subOptions.length > 0
                        ? area.subOptions
                            .map((optId) => {
                              const opt = service.subOptions.find(
                                (o) => o.id === optId
                              );
                              return opt?.name;
                            })
                            .filter(Boolean)
                            .join(', ')
                        : 'No specific options selected'}
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
                      <span className="text-xs text-gray-500">
                        {material?.name}
                        {material?.upcharge > 0 && (
                          <span className="text-orange-400 ml-1">
                            +${material.upcharge.toFixed(2)}/light
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {availableServices.length > 0 && (
              <button
                onClick={() => setPhase('select')}
                className="flex-1 flex items-center justify-center gap-2 border border-dashed border-gray-700 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 py-3.5 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Another Area
              </button>
            )}
            <button
              onClick={() => setPhase('contact')}
              disabled={configuredAreas.length === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* === PHASE: CONTACT INFO === */}
      {phase === 'contact' && (
        <div className="p-6 md:p-10">
          <div className="max-w-lg mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
              Your Details
            </h3>
            <p className="text-gray-500 mb-8">
              We&apos;ll send you a consultation summary and follow up to
              schedule your free visit.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, name: e.target.value })
                  }
                  placeholder="John Smith"
                  className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    placeholder="john@email.com"
                    className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    placeholder="(316) 555-0100"
                    className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                  placeholder="123 Main St, Wichita, KS"
                  className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={contactInfo.notes}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Tell us about your property, timeline, or specific requests..."
                  className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === PHASE: REVIEW === */}
      {phase === 'review' && (
        <div className="p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-lora)]">
              Review Your Consultation
            </h3>
            <p className="text-gray-500 mb-8">
              Confirm everything looks good before submitting.
            </p>

            {/* Areas summary */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Lighting Areas ({configuredAreas.length})
              </h4>
              <div className="space-y-3">
                {configuredAreas.map((area, index) => {
                  const service = lightingServices.find(
                    (s) => s.id === area.serviceId
                  );
                  const material = materialTiers.find(
                    (m) => m.id === area.material
                  );
                  if (!service) return null;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-900/50 border border-gray-800/50 rounded-xl p-4"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={service.photo}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">
                          {service.name}
                        </p>
                        {area.subOptions.length > 0 && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {area.subOptions
                              .map((optId) => {
                                const opt = service.subOptions.find(
                                  (o) => o.id === optId
                                );
                                return opt?.name;
                              })
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-white font-medium">
                          {material?.name}
                        </p>
                        {material?.upcharge > 0 && (
                          <p className="text-xs text-orange-400">
                            +${material.upcharge.toFixed(2)}/light
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact summary */}
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5 mb-8">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Contact Information
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <span className="text-gray-600">Name</span>
                <span className="text-white">{contactInfo.name}</span>
                <span className="text-gray-600">Email</span>
                <span className="text-white">{contactInfo.email}</span>
                <span className="text-gray-600">Phone</span>
                <span className="text-white">{contactInfo.phone}</span>
                {contactInfo.address && (
                  <>
                    <span className="text-gray-600">Address</span>
                    <span className="text-white">{contactInfo.address}</span>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <button className="w-full bg-[#1D4B26] hover:bg-[#163d1e] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg">
              <Send className="w-5 h-5" />
              Submit Consultation Request
            </button>
            <p className="text-xs text-gray-600 text-center mt-3">
              You&apos;ll receive a PDF summary of your selections via email.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="border-t border-gray-800/50 bg-gray-900/50 px-6 py-4 flex items-center justify-between">
        <button
          onClick={goBack}
          className={`flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors ${
            phase === 'select' && configuredAreas.length === 0
              ? 'invisible'
              : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3">
          {configuredAreas.length > 0 && (
            <span className="text-xs text-gray-600">
              {configuredAreas.length} area
              {configuredAreas.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {phase === 'contact' && (
          <button
            onClick={() => setPhase('review')}
            disabled={
              !contactInfo.name || !contactInfo.email || !contactInfo.phone
            }
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Review
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'contact' && phase !== 'review' && phase !== 'areas' && phase !== 'configure' && (
          <div className="w-20" />
        )}
      </div>
    </div>
  );
}
