'use client';

import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { lightingServices, materialTiers } from './formData';

const steps = [
  { label: 'Services', description: 'Choose your lighting' },
  { label: 'Options', description: 'Customize selections' },
  { label: 'Materials', description: 'Pick your fixtures' },
  { label: 'Details', description: 'Your information' },
  { label: 'Review', description: 'Confirm & submit' },
];

export default function AppleCheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
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

  const canProceed = () => {
    if (currentStep === 0) return selectedServices.length > 0;
    if (currentStep === 1) return true;
    if (currentStep === 2) return selectedMaterial !== null;
    if (currentStep === 3)
      return contactInfo.name && contactInfo.email && contactInfo.phone;
    return true;
  };

  const totalSubOptionsSelected = Object.values(selectedSubOptions).flat().length;
  const activeMaterial = materialTiers.find((m) => m.id === selectedMaterial);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Progress Bar */}
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <button
                onClick={() => index < currentStep && setCurrentStep(index)}
                className="flex items-center gap-2 group"
                disabled={index > currentStep}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index < currentStep
                      ? 'bg-[#1D4B26] text-white'
                      : index === currentStep
                        ? 'bg-orange-500 text-white ring-4 ring-orange-100'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p
                    className={`text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {step.label}
                  </p>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 lg:w-16 h-px mx-2 ${index < currentStep ? 'bg-[#1D4B26]' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 md:p-10 min-h-[480px]">
        {/* Step 1: Select Services */}
        {currentStep === 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What lighting are you interested in?
            </h3>
            <p className="text-gray-500 mb-8">
              Select all the services you&apos;d like included in your consultation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lightingServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const IconComponent = service.Icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#1D4B26] bg-[#1D4B26]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#1D4B26] rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <IconComponent
                      className={`w-8 h-8 mb-3 ${isSelected ? 'text-[#1D4B26]' : 'text-gray-400'}`}
                    />
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Sub-Options */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Customize your selections
            </h3>
            <p className="text-gray-500 mb-8">
              Choose specific options for each service. These help us prepare
              your consultation.
            </p>
            <div className="space-y-8">
              {lightingServices
                .filter((s) => selectedServices.includes(s.id))
                .map((service) => {
                  const IconComponent = service.Icon;
                  return (
                    <div key={service.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className="w-5 h-5 text-[#1D4B26]" />
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {service.name}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {service.subOptions.map((option) => {
                          const isSelected = (
                            selectedSubOptions[service.id] || []
                          ).includes(option.id);
                          return (
                            <button
                              key={option.id}
                              onClick={() =>
                                toggleSubOption(service.id, option.id)
                              }
                              className={`text-left p-4 rounded-lg border transition-all ${
                                isSelected
                                  ? 'border-orange-400 bg-orange-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-900 text-sm">
                                  {option.name}
                                </p>
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'border-orange-500 bg-orange-500'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {option.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Step 3: Materials */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Choose your fixture material
            </h3>
            <p className="text-gray-500 mb-8">
              Select the material tier for your lighting fixtures. Pricing shown
              is per light.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {materialTiers.map((material) => {
                const isSelected = selectedMaterial === material.id;
                return (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`relative text-left p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#1D4B26] bg-[#1D4B26]/5 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-[#1D4B26] rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <span
                      className={`inline-block text-xs font-bold tracking-wider uppercase px-2 py-1 rounded mb-3 ${
                        material.id === 'aluminum'
                          ? 'bg-gray-100 text-gray-600'
                          : material.id === 'brass'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {material.tier}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {material.name}
                    </h4>
                    <p className="text-lg font-semibold text-orange-600 mb-3">
                      {material.upcharge === 0
                        ? 'Included'
                        : `+$${material.upcharge.toFixed(2)} / light`}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {material.description}
                    </p>
                    <ul className="space-y-2">
                      {material.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-3.5 h-3.5 text-[#1D4B26]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Contact Info */}
        {currentStep === 3 && (
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your information
            </h3>
            <p className="text-gray-500 mb-8">
              We&apos;ll send your consultation summary and follow up to schedule
              your free visit.
            </p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4B26] focus:ring-2 focus:ring-[#1D4B26]/20 outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4B26] focus:ring-2 focus:ring-[#1D4B26]/20 outline-none transition-all"
                    placeholder="john@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4B26] focus:ring-2 focus:ring-[#1D4B26]/20 outline-none transition-all"
                    placeholder="(316) 555-0100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Property Address
                </label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4B26] focus:ring-2 focus:ring-[#1D4B26]/20 outline-none transition-all"
                  placeholder="123 Main St, Wichita, KS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  value={contactInfo.notes}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4B26] focus:ring-2 focus:ring-[#1D4B26]/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your property, timeline, or any specific requests..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Review your consultation request
            </h3>
            <p className="text-gray-500 mb-8">
              Confirm everything looks good before submitting.
            </p>
            <div className="space-y-6">
              {/* Services */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Selected Services
                </h4>
                <div className="space-y-2">
                  {lightingServices
                    .filter((s) => selectedServices.includes(s.id))
                    .map((service) => (
                      <div key={service.id} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#1D4B26] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {service.name}
                          </p>
                          {(selectedSubOptions[service.id] || []).length > 0 && (
                            <p className="text-xs text-gray-500">
                              {(selectedSubOptions[service.id] || [])
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
                      </div>
                    ))}
                </div>
              </div>

              {/* Material */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Fixture Material
                </h4>
                <p className="text-sm text-gray-700">
                  {activeMaterial?.name} ({activeMaterial?.tier})
                  {activeMaterial?.upcharge > 0 && (
                    <span className="text-orange-600 font-medium">
                      {' '}
                      &mdash; +${activeMaterial.upcharge.toFixed(2)} per light
                    </span>
                  )}
                </p>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-500">Name</p>
                  <p className="text-gray-900">{contactInfo.name}</p>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-900">{contactInfo.email}</p>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-900">{contactInfo.phone}</p>
                  {contactInfo.address && (
                    <>
                      <p className="text-gray-500">Address</p>
                      <p className="text-gray-900">{contactInfo.address}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 md:px-10 py-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          className={`flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-sm text-gray-400">
          {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
          {totalSubOptionsSelected > 0 && ` \u00B7 ${totalSubOptionsSelected} option${totalSubOptionsSelected !== 1 ? 's' : ''}`}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-[#1D4B26] hover:bg-[#163d1e] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
            <Send className="w-4 h-4" />
            Submit Request
          </button>
        )}
      </div>
    </div>
  );
}
