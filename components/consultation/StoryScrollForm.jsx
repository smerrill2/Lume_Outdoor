'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Check,
  Plus,
  ChevronDown,
  Send,
  ArrowDown,
} from 'lucide-react';
import {
  lightingServices,
  materialTiers,
  fixtureTypes,
  aluminumColors,
  treeLightingStyles,
} from './formData';

/* ── Helper: initial config state per service type ── */
function initialConfigForService(service) {
  switch (service.configType) {
    case 'fixture':
      return { fixtureType: null, finish: null, aluminumColor: null };
    case 'tree':
      return { style: null };
    case 'generic':
    default:
      return { subOptions: [], material: 'aluminum' };
  }
}

export default function StoryScrollForm() {
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [serviceConfigs, setServiceConfigs] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const configSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const reviewSectionRef = useRef(null);

  /* ── Service toggle ── */
  const toggleService = (serviceId) => {
    const service = lightingServices.find((s) => s.id === serviceId);
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
        setServiceConfigs((configs) => {
          const updated = { ...configs };
          delete updated[serviceId];
          return updated;
        });
      } else {
        next.add(serviceId);
        setServiceConfigs((configs) => ({
          ...configs,
          [serviceId]: initialConfigForService(service),
        }));
      }
      return next;
    });
  };

  /* ── Generic config handlers ── */
  const toggleSubOption = (serviceId, optionId) => {
    setServiceConfigs((prev) => {
      const config = prev[serviceId] || { subOptions: [], material: 'aluminum' };
      const hasOption = config.subOptions.includes(optionId);
      return {
        ...prev,
        [serviceId]: {
          ...config,
          subOptions: hasOption
            ? config.subOptions.filter((id) => id !== optionId)
            : [...config.subOptions, optionId],
        },
      };
    });
  };

  const setMaterial = (serviceId, materialId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], material: materialId },
    }));
  };

  /* ── Fixture config handlers (used by all fixture-type services) ── */
  const setFixtureType = (serviceId, fixtureId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { fixtureType: fixtureId, finish: null, aluminumColor: null },
    }));
  };

  const setFinish = (serviceId, finishId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        finish: finishId,
        aluminumColor: finishId === 'aluminum' ? prev[serviceId]?.aluminumColor : null,
      },
    }));
  };

  const setAluminumColor = (serviceId, colorId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], aluminumColor: colorId },
    }));
  };

  /* ── Tree config handler ── */
  const setTreeStyle = (serviceId, styleId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], style: styleId },
    }));
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedServicesList = lightingServices.filter((s) => selectedServices.has(s.id));

  /* ======================================================================== */
  /*  CONFIG PANEL RENDERERS                                                  */
  /* ======================================================================== */

  /* ── Fixture-type config panel (uplighting, pathway, deck, wash/area) ── */
  const renderFixtureConfig = (service, config) => {
    const hasSelected = !!config.fixtureType;
    const selectedFixture = hasSelected
      ? fixtureTypes.find((f) => f.id === config.fixtureType)
      : null;

    return (
      <>
        {/* Step 1: Fixture Type — photo cards */}
        <div className="mb-8">
          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
            {hasSelected ? 'Your Fixture' : 'Choose Your Fixture'}
          </h4>

          <div className={`grid gap-3 transition-all duration-500 ${
            hasSelected ? 'grid-cols-1' : 'grid-cols-2'
          }`}>
            {fixtureTypes.map((fixture) => {
              const isActive = config.fixtureType === fixture.id;
              const isHidden = hasSelected && !isActive;

              if (isHidden) return null;

              return (
                <button
                  key={fixture.id}
                  onClick={() =>
                    hasSelected && isActive
                      ? setFixtureType(service.id, null)
                      : setFixtureType(service.id, fixture.id)
                  }
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-orange-500/50 ring-1 ring-orange-500/20'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  {/* Fixture photo */}
                  <div className={`relative w-full transition-all duration-300 ${
                    hasSelected ? 'aspect-[16/9]' : 'aspect-square'
                  }`}>
                    <Image
                      src={fixture.photo}
                      alt={fixture.name}
                      fill
                      className="object-cover"
                      sizes={hasSelected ? '100%' : '50%'}
                    />
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                        : 'bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/70'
                    }`} />

                    {/* Check badge */}
                    {isActive && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Name + description overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-semibold text-white text-sm">{fixture.name}</p>
                      <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2">
                        {fixture.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tap to change hint */}
          {hasSelected && (
            <button
              onClick={() => setFixtureType(service.id, null)}
              className="mt-2 text-[10px] text-white/20 hover:text-white/40 transition-colors"
            >
              Tap to change fixture
            </button>
          )}
        </div>

        {/* Step 2: Finish Selection (appears after fixture chosen) */}
        {selectedFixture && (
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
              Select Finish
            </h4>
            <div className={`grid gap-2 ${
              selectedFixture.finishes.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
            }`}>
              {selectedFixture.finishes.map((finish) => {
                const isActive = config.finish === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => setFinish(service.id, finish.id)}
                    className={`text-center p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'border-orange-500/40 bg-orange-500/10 ring-1 ring-orange-500/20'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {finish.swatch ? (
                        <div
                          className="w-8 h-8 rounded-full border border-white/10"
                          style={{ backgroundColor: finish.swatch }}
                        />
                      ) : (
                        <div className="flex -space-x-1">
                          {aluminumColors.map((color) => (
                            <div
                              key={color.id}
                              className="w-6 h-6 rounded-full border-2 border-[#0a0a0a]"
                              style={{ backgroundColor: color.swatch }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white font-medium">{finish.name}</p>
                    <p
                      className={`text-[11px] mt-0.5 font-mono tracking-wider ${
                        isActive ? 'text-orange-400' : 'text-white/30'
                      }`}
                    >
                      {finish.priceTier}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Finish description */}
            {config.finish &&
              (() => {
                const finishData = selectedFixture.finishes.find((f) => f.id === config.finish);
                return finishData ? (
                  <div className="mt-3 bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <p className="text-[11px] text-white/35">{finishData.description}</p>
                  </div>
                ) : null;
              })()}
          </div>
        )}

        {/* Step 3: Aluminum Color picker */}
        {config.finish === 'aluminum' && (
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
              Aluminum Color
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {aluminumColors.map((color) => {
                const isActive = config.aluminumColor === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setAluminumColor(service.id, color.id)}
                    className={`text-center p-3 rounded-xl border transition-all ${
                      isActive
                        ? 'border-orange-500/40 bg-orange-500/10 ring-1 ring-orange-500/20'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-1.5 border-2 ${
                        isActive ? 'border-orange-500' : 'border-white/10'
                      }`}
                      style={{ backgroundColor: color.swatch }}
                    />
                    <p className="text-xs text-white font-medium">{color.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Brass vs Aluminum comparison */}
        {selectedFixture && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] mb-2">
              Brass vs Aluminum
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-orange-400/70 font-medium mb-1">Brass</p>
                <ul className="text-[10px] text-white/30 space-y-0.5">
                  <li>Natural patina over time</li>
                  <li>Superior longevity</li>
                  <li>Premium look &amp; feel</li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] text-white/50 font-medium mb-1">Aluminum</p>
                <ul className="text-[10px] text-white/30 space-y-0.5">
                  <li>3 color options</li>
                  <li>Lightweight &amp; durable</li>
                  <li>Best value</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  /* ── Tree-type config panel ── */
  const renderTreeConfig = (service, config) => (
    <div className="mb-8">
      <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
        Lighting Style
      </h4>
      <div className="space-y-3">
        {treeLightingStyles.map((style) => {
          const isActive = config.style === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setTreeStyle(service.id, style.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all ${
                isActive
                  ? 'border-orange-500/40 bg-orange-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? 'border-orange-500 bg-orange-500' : 'border-white/20'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {style.name}
                    </p>
                    {style.recommended && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/30 mt-1">{style.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Generic config panel (pool, security, holiday) ── */
  const renderGenericConfig = (service, config) => (
    <>
      <div className="mb-8">
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
          What type?
        </h4>
        <div className="space-y-2">
          {service.subOptions?.map((option) => {
            const isActive = config.subOptions?.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleSubOption(service.id, option.id)}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'border-orange-500/40 bg-orange-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? 'border-orange-500 bg-orange-500' : 'border-white/20'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {option.name}
                  </p>
                  <p className="text-xs text-white/25">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
          Fixture Material
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {materialTiers.map((material) => {
            const isActive = config.material === material.id;
            return (
              <button
                key={material.id}
                onClick={() => setMaterial(service.id, material.id)}
                className={`text-center p-3 rounded-xl border transition-all ${
                  isActive
                    ? 'border-[#1D4B26] bg-[#1D4B26]/15 ring-1 ring-[#1D4B26]/30'
                    : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                    material.id === 'aluminum'
                      ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                      : material.id === 'brass'
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                        : 'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white drop-shadow" />}
                </div>
                <p className="text-xs text-white font-medium">{material.name}</p>
                <p className={`text-[10px] mt-0.5 ${isActive ? 'text-orange-400' : 'text-white/30'}`}>
                  {material.upcharge === 0 ? 'Included' : `+$${material.upcharge.toFixed(2)}`}
                </p>
              </button>
            );
          })}
        </div>

        {(() => {
          const materialData = materialTiers.find((m) => m.id === config.material);
          return materialData ? (
            <div className="mt-3 bg-white/[0.03] rounded-lg p-3 border border-white/5">
              <p className="text-[11px] text-white/35">{materialData.description}</p>
            </div>
          ) : null;
        })()}
      </div>
    </>
  );

  /* ======================================================================== */
  /*  REVIEW CARD RENDERERS                                                   */
  /* ======================================================================== */

  const renderFixtureReviewCard = (service, config) => {
    const fixture = fixtureTypes.find((f) => f.id === config.fixtureType);
    const finish = fixture?.finishes.find((f) => f.id === config.finish);
    const aluColor = config.aluminumColor
      ? aluminumColors.find((c) => c.id === config.aluminumColor)
      : null;

    return (
      <div key={service.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{service.name}</p>
          {fixture && (
            <p className="text-xs text-white/40 mt-0.5">
              {fixture.shortName}
              {finish ? ` · ${finish.name}` : ''}
              {aluColor ? ` (${aluColor.name})` : ''}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          {finish && (
            <>
              <p className="text-sm text-white font-medium">{finish.name}</p>
              <p className="text-xs text-orange-400 font-mono">{finish.priceTier}</p>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTreeReviewCard = (service, config) => {
    const style = treeLightingStyles.find((s) => s.id === config.style);
    return (
      <div key={service.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{service.name}</p>
          {style && <p className="text-xs text-white/40 mt-0.5">{style.name} style</p>}
        </div>
      </div>
    );
  };

  const renderGenericReviewCard = (service, config) => {
    const material = materialTiers.find((m) => m.id === config.material);
    return (
      <div key={service.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{service.name}</p>
          {config.subOptions?.length > 0 && (
            <p className="text-xs text-white/40 mt-0.5">
              {config.subOptions
                .map((optId) => service.subOptions?.find((o) => o.id === optId)?.name)
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
  };

  /* ======================================================================== */
  /*  RENDER                                                                  */
  /* ======================================================================== */

  return (
    <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* ============ SECTION 1: HERO AREA SELECTION ============ */}
      <section className="relative min-h-[600px] flex flex-col">
        {/* Background collage */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            {lightingServices.slice(0, 3).map((service) => (
              <div key={service.id} className="relative">
                <Image src={service.photo} alt="" fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-4">
            Step 1
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-3 font-[family-name:var(--font-lora)] max-w-2xl">
            Select Your Lighting Areas
          </h2>
          <p className="text-white/40 text-center text-sm mb-10 max-w-md">
            Choose all the areas you&apos;d like to illuminate. You&apos;ll configure each one in the next section.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-3xl">
            {lightingServices.map((service) => {
              const IconComp = service.Icon;
              const isSelected = selectedServices.has(service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-orange-500 scale-[1.02]'
                      : 'ring-1 ring-white/10 hover:ring-white/25'
                  }`}
                >
                  <Image
                    src={service.photo}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-t from-orange-900/80 via-black/30 to-black/20'
                        : 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
                    }`}
                  />

                  <div
                    className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-orange-500 scale-100'
                        : 'bg-white/10 backdrop-blur-sm scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-white/70" />
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1.5">
                      <IconComp className="w-3.5 h-3.5 text-white/80" />
                    </div>
                    <p className="font-semibold text-white text-xs leading-tight">{service.name}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{service.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedServices.size > 0 && (
            <button
              onClick={() => scrollToSection(configSectionRef)}
              className="mt-10 flex flex-col items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors animate-bounce"
            >
              <span className="text-xs font-medium">
                Configure {selectedServices.size} area{selectedServices.size !== 1 ? 's' : ''}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* ============ SECTION 2: CONFIGURE EACH AREA ============ */}
      {selectedServicesList.length > 0 && (
        <section ref={configSectionRef}>
          {selectedServicesList.map((service, serviceIndex) => {
            const config = serviceConfigs[service.id] || initialConfigForService(service);
            const IconComp = service.Icon;

            return (
              <div key={service.id} className="relative">
                <div className="relative min-h-[500px] flex flex-col lg:flex-row">
                  {/* Photo half */}
                  <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
                    <Image
                      src={service.photo}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0a]" />

                    <div className="absolute bottom-0 left-0 p-6 lg:p-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
                      <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-2">
                        Area {serviceIndex + 1} of {selectedServicesList.length}
                      </span>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/80 flex items-center justify-center">
                          <IconComp className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-lora)]">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-sm text-white/40 max-w-xs">{service.description}</p>
                    </div>
                  </div>

                  {/* Config half */}
                  <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                    {service.configType === 'fixture' && renderFixtureConfig(service, config)}
                    {service.configType === 'tree' && renderTreeConfig(service, config)}
                    {service.configType === 'generic' && renderGenericConfig(service, config)}
                  </div>
                </div>

                {serviceIndex < selectedServicesList.length - 1 && (
                  <div className="mx-6 lg:mx-10 border-t border-white/5" />
                )}
              </div>
            );
          })}

          <div className="flex justify-center py-8">
            <button
              onClick={() => scrollToSection(contactSectionRef)}
              className="flex flex-col items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span className="text-xs font-medium">Continue to your details</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>
      )}

      {/* ============ SECTION 3: CONTACT ============ */}
      {selectedServicesList.length > 0 && (
        <section ref={contactSectionRef} className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d1a0f] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-lg mx-auto px-6 py-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-4">
              Step 3
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-[family-name:var(--font-lora)]">
              Your Details
            </h2>
            <p className="text-white/40 text-sm mb-8">
              We&apos;ll send you a consultation summary and schedule your free property visit.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  placeholder="Tell us about your property, timeline, or requests..."
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {contactInfo.name && contactInfo.email && contactInfo.phone && (
              <button
                onClick={() => {
                  setIsSubmitVisible(true);
                  setTimeout(() => scrollToSection(reviewSectionRef), 100);
                }}
                className="mt-8 w-full flex items-center justify-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
              >
                <span>Review &amp; Submit</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* ============ SECTION 4: REVIEW & SUBMIT ============ */}
      {isSubmitVisible && (
        <section ref={reviewSectionRef} className="relative">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-4">
              Final Review
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-[family-name:var(--font-lora)]">
              Your Consultation Summary
            </h2>

            <div className="mb-8">
              <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
                Lighting Areas ({selectedServicesList.length})
              </h4>
              <div className="space-y-3">
                {selectedServicesList.map((service) => {
                  const config = serviceConfigs[service.id] || {};
                  if (service.configType === 'fixture') return renderFixtureReviewCard(service, config);
                  if (service.configType === 'tree') return renderTreeReviewCard(service, config);
                  return renderGenericReviewCard(service, config);
                })}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-10">
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

            <button className="w-full bg-[#1D4B26] hover:bg-[#163d1e] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#1D4B26]/20">
              <Send className="w-5 h-5" />
              Submit Consultation Request
            </button>
            <p className="text-xs text-white/20 text-center mt-4">
              You&apos;ll receive a PDF summary of your selections via email.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
