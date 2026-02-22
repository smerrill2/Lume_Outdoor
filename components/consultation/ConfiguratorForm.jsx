'use client';

import { useState } from 'react';
import { Check, Plus, Minus, Send, ChevronRight, User, Mail, Phone, MapPin } from 'lucide-react';
import { lightingServices, materialTiers } from './formData';

const categories = [
  { id: 'services', label: 'Lighting Services' },
  { id: 'materials', label: 'Fixture Material' },
  { id: 'contact', label: 'Your Info' },
];

export default function ConfiguratorForm() {
  const [activeCategory, setActiveCategory] = useState('services');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum');
  const [expandedService, setExpandedService] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const toggleService = (serviceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        setExpandedService(null);
        const newSub = { ...selectedSubOptions };
        delete newSub[serviceId];
        setSelectedSubOptions(newSub);
        return prev.filter((id) => id !== serviceId);
      }
      setExpandedService(serviceId);
      return [...prev, serviceId];
    });
  };

  const toggleSubOption = (serviceId, optionId) => {
    setSelectedSubOptions((prev) => {
      const current = prev[serviceId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [serviceId]: updated };
    });
  };

  const activeMaterial = materialTiers.find((m) => m.id === selectedMaterial);
  const totalSubOptions = Object.values(selectedSubOptions).flat().length;

  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      {/* Top bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Lume Outdoor &mdash; Lighting Configurator
        </p>
        <div className="w-16" />
      </div>

      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Sidebar: Categories */}
        <div className="lg:w-56 bg-gray-900/50 border-b lg:border-b-0 lg:border-r border-gray-800 p-4 lg:p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Configure
          </p>
          <nav className="flex lg:flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Options */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {activeCategory === 'services' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Select Your Lighting Services
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Click a service to add it, then expand to pick specific options.
              </p>
              <div className="space-y-3">
                {lightingServices.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  const isExpanded = expandedService === service.id;
                  const IconComponent = service.Icon;
                  return (
                    <div key={service.id}>
                      <button
                        onClick={() => {
                          if (isSelected) {
                            if (isExpanded) setExpandedService(null);
                            else setExpandedService(service.id);
                          } else {
                            toggleService(service.id);
                          }
                        }}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-[#1D4B26] bg-[#1D4B26]/10'
                            : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#1D4B26] text-white'
                              : 'bg-gray-800 text-gray-500'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {service.description}
                          </p>
                        </div>
                        {isSelected ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {(selectedSubOptions[service.id] || []).length} options
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleService(service.id);
                              }}
                              className="w-7 h-7 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center">
                            <Plus className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>

                      {/* Expanded sub-options */}
                      {isSelected && isExpanded && (
                        <div className="mt-2 ml-14 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {(service.subOptions || []).map((option) => {
                            const isOptSelected = (
                              selectedSubOptions[service.id] || []
                            ).includes(option.id);
                            return (
                              <button
                                key={option.id}
                                onClick={() =>
                                  toggleSubOption(service.id, option.id)
                                }
                                className={`text-left p-3 rounded-lg border text-sm transition-all ${
                                  isOptSelected
                                    ? 'border-orange-500/40 bg-orange-500/10 text-orange-300'
                                    : 'border-gray-800 text-gray-400 hover:border-gray-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    {option.name}
                                  </span>
                                  {isOptSelected && (
                                    <Check className="w-3.5 h-3.5 text-orange-400" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  {option.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeCategory === 'materials' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Fixture Material
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Choose the material tier for your lighting fixtures.
              </p>
              <div className="space-y-4">
                {materialTiers.map((material) => {
                  const isSelected = selectedMaterial === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-orange-500/40 bg-orange-500/5 ring-1 ring-orange-500/20'
                          : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-white text-lg">
                              {material.name}
                            </h4>
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                material.id === 'aluminum'
                                  ? 'bg-gray-800 text-gray-400'
                                  : material.id === 'brass'
                                    ? 'bg-amber-900/30 text-amber-400'
                                    : 'bg-purple-900/30 text-purple-400'
                              }`}
                            >
                              {material.tier}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            {material.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {material.features.map((f) => (
                              <span
                                key={f}
                                className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-6">
                          <p className="text-lg font-bold text-orange-400">
                            {material.upcharge === 0
                              ? 'Base'
                              : `+$${material.upcharge.toFixed(2)}`}
                          </p>
                          <p className="text-xs text-gray-600">per light</p>
                          {isSelected && (
                            <div className="mt-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center ml-auto">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeCategory === 'contact' && (
            <div className="max-w-lg">
              <h3 className="text-xl font-bold text-white mb-1">
                Your Information
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                So we can send you your consultation summary.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, address: e.target.value })
                    }
                    placeholder="Property Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Summary */}
        <div className="lg:w-72 bg-gray-900/80 border-t lg:border-t-0 lg:border-l border-gray-800 p-5 lg:p-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Your Selection
          </h4>

          {selectedServices.length === 0 ? (
            <p className="text-sm text-gray-600 italic">
              No services selected yet. Start by choosing your lighting.
            </p>
          ) : (
            <div className="space-y-3 mb-6">
              {lightingServices
                .filter((s) => selectedServices.includes(s.id))
                .map((service) => {
                  const subOpts = selectedSubOptions[service.id] || [];
                  return (
                    <div
                      key={service.id}
                      className="bg-gray-800/50 rounded-lg p-3"
                    >
                      <p className="font-medium text-white text-sm">
                        {service.name}
                      </p>
                      {subOpts.length > 0 && (
                        <div className="mt-1.5 space-y-1">
                          {subOpts.map((optId) => {
                            const opt = service.subOptions.find(
                              (o) => o.id === optId
                            );
                            return (
                              <p
                                key={optId}
                                className="text-xs text-gray-500 flex items-center gap-1.5"
                              >
                                <ChevronRight className="w-3 h-3 text-orange-500" />
                                {opt?.name}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          {/* Material Selection */}
          <div className="border-t border-gray-800 pt-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Material</span>
              <span className="text-white font-medium">
                {activeMaterial?.name}
              </span>
            </div>
            {activeMaterial?.upcharge > 0 && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Upcharge</span>
                <span className="text-orange-400 font-medium">
                  +${activeMaterial.upcharge.toFixed(2)}/light
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="border-t border-gray-800 pt-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Services</span>
              <span className="text-white">{selectedServices.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Options</span>
              <span className="text-white">{totalSubOptions}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={
              selectedServices.length === 0 ||
              !contactInfo.name ||
              !contactInfo.email
            }
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Request
          </button>
          <p className="text-xs text-gray-600 text-center mt-2">
            Free consultation &bull; No obligation
          </p>
        </div>
      </div>
    </div>
  );
}
