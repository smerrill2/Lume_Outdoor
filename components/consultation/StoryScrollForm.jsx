'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Check,
  Plus,
  Send,
  Loader2,
  CheckCircle,
  Info,
} from 'lucide-react';
import {
  lightingServices,
  fixtureTypes,
  aluminumColorLookup,
  v2AluminumColors,
  treeFocusOptions,
  deckSizes,
  materialTip,
  pathwayFixtures,
  wallWasherFixtures,
  deckLightFixtures,
} from './formData';
import { getLeadAttribution } from '@/lib/leadAttribution';

const UPLIGHTING_FIXTURE_ID = 'v1-dropin';

/* ── Helper: initial config state per service type ── */
function initialConfigForService(service) {
  switch (service.configType) {
    case 'fixture':
      return { fixtureType: UPLIGHTING_FIXTURE_ID, finish: null, aluminumColor: null };
    case 'pathway':
    case 'specialty':
    case 'deck-fixture':
      return { fixtureType: null, finish: null };
    case 'tree':
      return { focus: null };
    case 'none':
      return {};
    case 'color-only':
    default:
      return { aluminumColor: null };
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfigError, setShowConfigError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState(null);

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

  /* ── Config handlers ── */
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

  const setTreeFocus = (serviceId, focusId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], focus: focusId },
    }));
  };

  const setDeckSize = (serviceId, sizeId) => {
    setServiceConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], size: sizeId },
    }));
  };

  const scrollToSection = (ref) => {
    if (!ref.current) return;
    const targetY = ref.current.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1100;
    let startTime = null;
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ── Check if a service's config is fully complete ── */
  const isServiceConfigComplete = (service, config) => {
    if (!config) return false;
    switch (service.configType) {
      case 'fixture': {
        if (!config.fixtureType || !config.finish) return false;
        if (config.finish === 'aluminum' && !config.aluminumColor) return false;
        return true;
      }
      case 'pathway':
        return !!config.finish;
      case 'specialty':
      case 'deck-fixture':
        return !!config.fixtureType && !!config.finish;
      case 'tree':
        return !!config.focus;
      case 'color-only':
        return !!config.aluminumColor;
      case 'none':
      default:
        return true;
    }
  };

  const selectedServicesList = lightingServices.filter((s) => selectedServices.has(s.id));

  /* ── Build a display summary string for a service's config ── */
  const buildServiceSummary = (service, config) => {
    if (!config) return 'No configuration selected';

    if (service.configType === 'fixture') {
      const fixture = fixtureTypes.find((f) => f.id === config.fixtureType);
      const finish = fixture?.finishes.find((f) => f.id === config.finish);
      const aluColor = aluminumColorLookup[config.aluminumColor];
      let summary = '';
      if (fixture) summary += fixture.shortName;
      if (finish) {
        summary += ` · ${finish.name}`;
        if (finish.upcharge > 0) summary += ` (+$${finish.upcharge})`;
      }
      if (aluColor) summary += ` — ${aluColor.name}`;
      return summary || 'No configuration selected';
    }

    if (service.configType === 'tree') {
      const focus = treeFocusOptions.find((f) => f.id === config.focus);
      return focus ? focus.name : 'No focus selected';
    }

    if (service.configType === 'deck') {
      const size = deckSizes.find((s) => s.id === config.size);
      const color = aluminumColorLookup[config.aluminumColor];
      let parts = ['V2 Integrated'];
      if (size) parts.push(size.name);
      if (color) parts.push(color.name);
      return parts.join(' · ');
    }

    if (service.configType === 'pathway') {
      const fixture = pathwayFixtures.find((f) => f.id === config.fixtureType);
      if (!fixture || !config.finish) return 'No finish selected';
      const finishId = config.finish.replace(`${config.fixtureType}-`, '');
      const allFinishes = [...fixture.finishes.brass, ...fixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return finish ? `${fixture.name} · ${finish.name}` : 'No finish selected';
    }

    if (service.configType === 'specialty' || service.configType === 'deck-fixture') {
      const fixtureList = service.configType === 'deck-fixture' ? deckLightFixtures : wallWasherFixtures;
      const fixture = fixtureList.find((f) => f.id === config.fixtureType);
      if (!fixture || !config.finish) return 'No finish selected';
      const finishId = config.finish.replace(`${config.fixtureType}-`, '');
      const allFinishes = [...fixture.finishes.brass, ...fixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return finish ? `${fixture.name} · ${finish.name}` : 'No finish selected';
    }

    if (service.configType === 'none') {
      return 'Selected';
    }

    // color-only
    const color = aluminumColorLookup[config.aluminumColor];
    return color ? `Aluminum — ${color.name}` : 'No color selected';
  };

  /* ── Submit consultation request ── */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const services = selectedServicesList.map((service) => ({
      name: service.name,
      configSummary: buildServiceSummary(service, serviceConfigs[service.id]),
      rawConfig: serviceConfigs[service.id],
      configType: service.configType,
    }));

    try {
      const transactionId =
        typeof crypto?.randomUUID === 'function'
          ? crypto.randomUUID()
          : `lead-${Date.now()}`;
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactInfo,
          services,
          attribution: getLeadAttribution(),
          transactionId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation.');
      }

      setSubmitStatus('success');
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion({
          email: contactInfo.email,
          phone: contactInfo.phone,
          transactionId: data.transactionId || transactionId,
          formName: 'lighting_configurator',
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======================================================================== */
  /*  SHARED UI HELPERS                                                       */
  /* ======================================================================== */

  /* ── Educational info tip ── */
  const InfoTip = ({ title, content, neutral = false }) => (
    <div className={`flex gap-3 p-4 rounded-xl mb-6 ${neutral ? 'bg-white/[0.03] border border-white/10' : 'bg-orange-500/[0.04] border border-orange-500/10'}`}>
      <Info className={`w-4 h-4 shrink-0 mt-0.5 ${neutral ? 'text-white/30' : 'text-orange-400/60'}`} />
      <div>
        <p className={`text-[11px] font-semibold mb-1 ${neutral ? 'text-white/50' : 'text-orange-400/60'}`}>{title}</p>
        <p className="text-[11px] text-white/40 leading-relaxed">{content}</p>
      </div>
    </div>
  );

  /* ── Aluminum color picker (shared by deck + color-only) ── */
  const renderAluminumPicker = (serviceId, config) => {
    return (
      <div>
        <p className="text-[11px] text-white/25 mb-4">Brass fixtures are not available for this application — aluminum only.</p>
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">
          Choose Your Color
        </h4>
        <div className="flex flex-wrap gap-3">
          {v2AluminumColors.map((color) => {
            const isActive = config.aluminumColor === color.id;
            const hasSelection = !!config.aluminumColor;
            return (
              <button
                key={color.id}
                onClick={() => setAluminumColor(serviceId, color.id)}
                className={`flex flex-col items-center gap-2 group transition-opacity duration-200 ${hasSelection && !isActive ? 'opacity-40' : ''}`}
              >
                <div
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105'
                      : 'border-white/10 hover:border-white/25 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/40'
                  }`}
                >
                  <Image src={color.photo} alt={color.name} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" sizes="80px" />
                  {isActive && <div className="absolute inset-0 bg-orange-500/10" />}
                </div>
                <p className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {color.name}
                </p>
                {color.upcharge != null && <p className="text-[10px] text-white/40">{color.upcharge > 0 ? `+$${color.upcharge}` : '+$0'}</p>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* ── House uplighting uses the drop-in fixture only ── */
  const renderUplightingFixtureSummary = () => {
    const fixture = fixtureTypes.find((f) => f.id === UPLIGHTING_FIXTURE_ID);
    if (!fixture) return null;

    return (
      <div className="mb-6">
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
          Fixture
        </h4>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-orange-500/30 bg-orange-500/[0.06]">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image src={fixture.photo} alt={fixture.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-white">{fixture.name}</p>
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-[11px] text-white/40 mt-1 leading-relaxed">{fixture.description}</p>
          </div>
        </div>
      </div>
    );
  };

  /* ── Finish selector with brass/aluminum swatches (shared by fixture + tree) ── */
  const renderFinishSelector = (service, config) => {
    const selectedFixture = config.fixtureType
      ? fixtureTypes.find((f) => f.id === config.fixtureType)
      : null;

    if (!selectedFixture) return null;

    const brassFinishes = selectedFixture.finishes.filter((f) => !f.hasColorOptions);
    const hasAluminum = selectedFixture.finishes.some((f) => f.hasColorOptions);

    const renderSwatchRow = (options) => {
      const hasSelection = !!config.finish;
      return (
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={option.onClick}
            className={`flex flex-col items-center gap-2 group transition-opacity duration-200 ${hasSelection && !option.isActive ? 'opacity-40' : ''}`}
          >
            <div
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                option.isActive
                  ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105'
                  : 'border-white/10 hover:border-white/25 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/40'
              }`}
            >
              {option.photo ? (
                <Image
                  src={option.photo}
                  alt={option.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-white/[0.03]" />
              )}
              {option.isActive && (
                <div className="absolute inset-0 bg-orange-500/10" />
              )}
            </div>
            <div className="text-center">
              <p className={`text-xs font-medium ${option.isActive ? 'text-white' : 'text-white/60'}`}>
                {option.name}
              </p>
              {option.priceLabel && (
                <p className="text-[10px] mt-0.5 text-white/40">
                  {option.priceLabel}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    );
    };

    const brassOptions = brassFinishes.map((f) => {
      return {
        key: f.id,
        photo: f.photo,
        name: f.name,
        isActive: config.finish === f.id,
        priceLabel: f.upcharge > 0 ? `+$${f.upcharge}` : '+$0',
        isBase: !!f.isBase,
        onClick: () => {
          setFinish(service.id, f.id);
          setAluminumColor(service.id, null);
        },
      };
    });

    const aluminumFinish = selectedFixture.finishes.find((f) => f.hasColorOptions);
    const aluminumOptions = hasAluminum && aluminumFinish?.colorOptions
      ? aluminumFinish.colorOptions.map((c) => {
          const colorUpcharge = c.upcharge ?? aluminumFinish.upcharge ?? 0;
          return {
            key: `aluminum-${c.id}`,
            photo: c.photo,
            name: c.name,
            isActive: config.finish === 'aluminum' && config.aluminumColor === c.id,
            priceLabel: colorUpcharge > 0 ? `+$${colorUpcharge}` : '+$0',
            isBase: !!(c.isBase || aluminumFinish.isBase),
            onClick: () => {
              setFinish(service.id, 'aluminum');
              setAluminumColor(service.id, c.id);
            },
          };
        })
      : [];

    const minBrassUpcharge = brassFinishes.length
      ? Math.min(...brassFinishes.map((f) => f.upcharge).filter((u) => u != null))
      : null;

    return (
      <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-5">
        {/* Aluminum tier — shown first as base */}
        {aluminumOptions.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">Aluminum</h4>
                <p className="text-[11px] text-white/30 mt-0.5">Budget-friendly, lightweight, multiple colors.</p>
              </div>
              <span className="text-[10px] text-white/40 whitespace-nowrap ml-3 mt-0.5">Base</span>
            </div>
            {renderSwatchRow(aluminumOptions)}
          </div>
        )}

        {/* Brass tier — upgrade */}
        {brassOptions.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">Brass</h4>
                <p className="text-[11px] text-white/30 mt-0.5">Develops a patina over time. Lasts decades with no upkeep.</p>
              </div>
              {minBrassUpcharge > 0 && (
                <span className="text-[10px] text-orange-400/60 whitespace-nowrap ml-3 mt-0.5">+${minBrassUpcharge} upgrade</span>
              )}
            </div>
            {renderSwatchRow(brassOptions)}
          </div>
        )}
      </div>
    );
  };

  /* ======================================================================== */
  /*  CONFIG PANEL RENDERERS                                                  */
  /* ======================================================================== */

  /* ── Fixture config (house uplighting) ── */
  const renderFixtureConfig = (service, config) => (
    <>
      {renderUplightingFixtureSummary()}
      {renderFinishSelector(service, config)}
    </>
  );

  /* ── Tree config (focus question only — uses in-ground well lights) ── */
  const renderTreeConfig = (service, config) => (
    <>
      <div className="mb-6">
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">Fixture</h4>
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white">
            <Image src="/light_form/well_light/well_light.webp" alt="In-ground well light" fill className="object-cover" sizes="80px" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">In-Ground Well Light</p>
            <p className="text-[11px] text-white/30 mt-0.5">Fixed fixture, installed flush with the ground.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-4">
          Lighting Focus
        </h4>
        <div className="space-y-3">
          {treeFocusOptions.map((option) => {
            const isActive = config.focus === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setTreeFocus(service.id, option.id)}
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
                        {option.name}
                      </p>
                      {option.recommended && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 mt-1">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );


  /* ── Color-only config (wash, pool, security) ── */
  const renderColorOnlyConfig = (service, config) => renderAluminumPicker(service.id, config);

  /* ── None config ── */
  const renderNoneConfig = (service) => (
    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-sm font-medium text-white/70">{service.name} added</p>
      </div>
      {service.configNote && (
        <p className="text-[12px] text-white/35 leading-relaxed">{service.configNote}</p>
      )}
    </div>
  );

  /* ── Size-picker config (wall washers, deck lights) ── */
  const renderSizePickerConfig = (service, config, fixtureList) => {
    const selectedFixture = fixtureList.find((f) => f.id === config.fixtureType);

    const isDeckFixture = service.configType === 'deck-fixture';
    const renderSwatchRow = (finishes) => {
      const hasSelection = !!config.finish;
      return (
      <div className="flex flex-wrap gap-3">
        {finishes.map((finish) => {
          const isActive = config.finish === `${config.fixtureType}-${finish.id}`;
          return (
            <button
              key={finish.id}
              onClick={() => setServiceConfigs((prev) => ({
                ...prev,
                [service.id]: { ...prev[service.id], finish: `${config.fixtureType}-${finish.id}` },
              }))}
              className={`flex flex-col items-center gap-2 group transition-opacity duration-200 ${hasSelection && !isActive ? 'opacity-40' : ''}`}
            >
              <div className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${isActive ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105' : 'border-white/10 hover:border-white/25'} ${finish.whiteBg ? 'bg-white' : ''}`}>
                <Image src={finish.photo} alt={finish.name} fill className={`object-contain ${isDeckFixture ? 'scale-[1.6] -translate-y-[15%]' : ''}`} sizes="80px" />
                {isActive && <div className="absolute inset-0 bg-orange-500/10" />}
              </div>
              <p className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>{finish.name}</p>
              {finish.upcharge != null && <p className="text-[10px] text-white/40">{finish.upcharge > 0 ? `+$${finish.upcharge}` : '+$0'}</p>}
            </button>
          );
        })}
      </div>
    );
    };

    return (
      <div className="space-y-5">
        {/* Fixture type selector */}
        <div>
          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-3">Choose Your Fixture</h4>
          <div className="grid grid-cols-2 gap-3">
            {fixtureList.map((fixture) => {
              const isActive = config.fixtureType === fixture.id;
              const isDimmed = config.fixtureType && !isActive;
              return (
                <button
                  key={fixture.id}
                  onClick={() => setServiceConfigs((prev) => ({
                    ...prev,
                    [service.id]: { fixtureType: isActive ? null : fixture.id, finish: null },
                  }))}
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                    isActive ? 'border-orange-500/50 ring-1 ring-orange-500/20' : isDimmed ? 'border-white/5 opacity-40' : 'border-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'
                  }`}
                >
                  <div className={`relative w-full aspect-[4/3] ${fixture.whiteBg ? 'bg-white' : ''}`}>
                    <Image src={fixture.photo} alt={fixture.name} fill className={`transition-transform duration-500 ease-out ${fixture.whiteBg ? 'object-contain p-4' : 'object-cover'} ${isDeckFixture ? 'scale-[1.6] -translate-y-[15%]' : 'group-hover:scale-110'}`} sizes="50%" />
                    <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' : 'bg-gradient-to-t from-black/90 via-black/40 to-black/10'}`} />
                    {isActive && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-semibold text-white text-sm">{fixture.name}</p>
                      <p className="text-[11px] text-white/50 mt-0.5">{fixture.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Finish selector — shown after fixture is picked */}
        {selectedFixture && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Aluminum first as base */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">Aluminum</h4>
                  <p className="text-[11px] text-white/30 mt-0.5">Budget-friendly, lightweight, multiple colors.</p>
                </div>
                <span className="text-[10px] text-white/40 whitespace-nowrap ml-3 mt-0.5">Base</span>
              </div>
              {renderSwatchRow(selectedFixture.finishes.aluminum)}
            </div>
            {/* Brass as upgrade */}
            {selectedFixture.finishes.brass.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">Brass</h4>
                    <p className="text-[11px] text-white/30 mt-0.5">Develops a patina over time. Lasts decades with no upkeep.</p>
                  </div>
                  <span className="text-[10px] text-orange-400/60 whitespace-nowrap ml-3 mt-0.5">+${Math.min(...selectedFixture.finishes.brass.map((f) => f.upcharge).filter((u) => u != null))} upgrade</span>
                </div>
                {renderSwatchRow(selectedFixture.finishes.brass)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  /* ======================================================================== */
  /*  REVIEW CARD                                                              */
  /* ======================================================================== */

  /* ── Resolve the selected finish photo + label for any service ── */
  const getSelectedFinishInfo = (service, config) => {
    if (!config) return null;
    switch (service.configType) {
      case 'fixture': {
        const fixture = fixtureTypes.find((f) => f.id === config.fixtureType);
        if (!fixture) return null;
        if (config.finish === 'aluminum' && config.aluminumColor) {
          const aluFinish = fixture.finishes.find((f) => f.hasColorOptions);
          const color = aluFinish?.colorOptions.find((c) => c.id === config.aluminumColor);
          return color ? { photo: color.photo, label: `${fixture.shortName} · ${color.name}`, upcharge: color.upcharge } : null;
        }
        const finish = fixture.finishes.find((f) => f.id === config.finish);
        return finish ? { photo: finish.photo, label: `${fixture.shortName} · ${finish.name}`, upcharge: finish.upcharge } : null;
      }
      case 'pathway': {
        const pathFixture = pathwayFixtures.find((f) => f.id === config.fixtureType);
        if (!pathFixture || !config.finish) return null;
        const pathFinishId = config.finish.replace(`${config.fixtureType}-`, '');
        const allPathFinishes = [...pathFixture.finishes.brass, ...pathFixture.finishes.aluminum];
        const pathFinish = allPathFinishes.find((f) => f.id === pathFinishId);
        return pathFinish ? { photo: pathFinish.photo, label: `${pathFixture.name} · ${pathFinish.name}`, upcharge: pathFinish.upcharge, whiteBg: pathFinish.whiteBg } : null;
      }
      case 'specialty':
      case 'deck-fixture': {
        const fixtureList = service.configType === 'deck-fixture' ? deckLightFixtures : wallWasherFixtures;
        const fixture = fixtureList.find((f) => f.id === config.fixtureType);
        if (!fixture || !config.finish) return null;
        const finishId = config.finish.replace(`${config.fixtureType}-`, '');
        const allFinishes = [...fixture.finishes.brass, ...fixture.finishes.aluminum];
        const finish = allFinishes.find((f) => f.id === finishId);
        return finish ? { photo: finish.photo, label: `${fixture.name} · ${finish.name}`, upcharge: finish.upcharge, whiteBg: finish.whiteBg } : null;
      }
      case 'tree': {
        const focus = treeFocusOptions.find((f) => f.id === config.focus);
        return { photo: '/light_form/well_light/well_light.webp', label: focus?.name || 'Well Light', whiteBg: true };
      }
      case 'deck':
      case 'color-only': {
        const color = v2AluminumColors.find((c) => c.id === config.aluminumColor);
        return color ? { photo: color.photo, label: color.name, upcharge: color.upcharge } : null;
      }
      case 'none':
      default:
        return null;
    }
  };

  /* ── Unified review card ── */
  const renderReviewCard = (service, config) => {
    const finishInfo = getSelectedFinishInfo(service, config);
    return (
      <div key={service.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image src={service.photo} alt={service.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{service.name}</p>
          {finishInfo && <p className="text-xs text-white/40 mt-0.5">{finishInfo.label}</p>}
          {finishInfo?.upcharge > 0 && <p className="text-[10px] text-white/30 mt-0.5">+${finishInfo.upcharge}/fixture</p>}
          {!finishInfo && service.configNote && <p className="text-xs text-white/30 mt-0.5 line-clamp-1">{service.configNote}</p>}
          {!finishInfo && !service.configNote && <p className="text-xs text-white/40 mt-0.5">Selected</p>}
        </div>
        {finishInfo && (
          <div className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 ${finishInfo.whiteBg ? 'bg-white' : ''}`}>
            <Image src={finishInfo.photo} alt={finishInfo.label} fill className="object-contain" sizes="48px" />
          </div>
        )}
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
        {/* Cover image */}
        <div className="absolute inset-0">
          <Image src="/light_form/form-cover.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
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
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 border border-white/[0.14] ${
                    isSelected
                      ? 'ring-2 ring-orange-500 scale-[1.02] border-transparent'
                      : 'hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'
                  }`}
                >
                  <Image
                    src={service.photo}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
                    <p className="font-semibold text-white text-xs leading-tight">{service.name}</p>
                    <p className="text-[10px] text-white/40 mt-0.5 leading-tight line-clamp-2">{service.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

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
                  {/* Photo half — fixed height + self-start so it never resizes when the config panel grows/shrinks on selection */}
                  <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:h-[600px] lg:self-start lg:sticky lg:top-8">
                    <Image
                      src={service.photo}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0a]" />
                    {/* Top fade so the photo blends into the dark section above instead of a hard seam */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a] to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 lg:p-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
                      <div className="inline-flex flex-col bg-black/50 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-2">
                          Area {serviceIndex + 1} of {selectedServicesList.length}
                        </span>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/80 flex items-center justify-center shrink-0">
                            <IconComp className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-lora)]">
                            {service.name}
                          </h3>
                        </div>
                        <p className="text-sm text-white/50 max-w-xs">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Config half */}
                  <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                    {service.configType === 'fixture' && renderFixtureConfig(service, config)}
                    {service.configType === 'pathway' && renderSizePickerConfig(service, config, pathwayFixtures)}
                    {service.configType === 'specialty' && renderSizePickerConfig(service, config, wallWasherFixtures)}
                    {service.configType === 'tree' && renderTreeConfig(service, config)}
                    {service.configType === 'deck-fixture' && renderSizePickerConfig(service, config, deckLightFixtures)}
                    {service.configType === 'color-only' && renderColorOnlyConfig(service, config)}
                    {service.configType === 'none' && renderNoneConfig(service)}
                  </div>
                </div>

                {serviceIndex < selectedServicesList.length - 1 && (
                  <div className="mx-6 lg:mx-10 border-t border-white/5" />
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* ============ SECTION 3: CONTACT ============ */}
      {selectedServicesList.length > 0 && (
        <section ref={contactSectionRef} className="relative">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,169,40,0.05),transparent_70%)]" />
          <div className="relative z-10 max-w-lg mx-auto px-6 py-16">
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
              <div className="mt-8">
                {showConfigError && (
                  <p className="text-xs text-red-400 text-center mb-3 animate-in fade-in duration-150">
                    One or more lighting areas still need a selection.
                  </p>
                )}
                <button
                  onClick={() => {
                    const allComplete = selectedServicesList.every(
                      (s) => isServiceConfigComplete(s, serviceConfigs[s.id])
                    );
                    if (!allComplete) {
                      setShowConfigError(true);
                      setTimeout(() => setShowConfigError(false), 2500);
                      return;
                    }
                    setIsSubmitVisible(true);
                    setTimeout(() => scrollToSection(reviewSectionRef), 100);
                  }}
                  className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 transition-colors text-white font-semibold text-sm py-4 rounded-xl"
                >
                  Review &amp; Submit
                </button>
              </div>
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
                  return renderReviewCard(service, config);
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

            {submitStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-lg font-bold text-white mb-1">
                  Consultation Submitted!
                </p>
                <p className="text-sm text-white/50">
                  Check your email for a PDF summary of your selections.
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#1D4B26] hover:bg-[#163d1e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#1D4B26]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Consultation Request
                    </>
                  )}
                </button>
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-400 text-center mt-3">
                    {submitError || 'Something went wrong. Please try again.'}
                  </p>
                )}
              </>
            )}
            <p className="text-xs text-white/20 text-center mt-4">
              You&apos;ll receive a PDF summary of your selections via email.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
