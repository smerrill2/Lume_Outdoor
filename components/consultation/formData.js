import {
  Route,
  Waves,
  Building2,
  TreePine,
  LayoutGrid,
  Shield,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

/* ── Shared fixture & finish data ── */

export const aluminumColors = [
  { id: 'black', name: 'Black', swatch: '#1a1a1a' },
  { id: 'white', name: 'White', swatch: '#f0f0f0' },
  { id: 'sand', name: 'Sand', swatch: '#c2b280' },
];

export const fixtureTypes = [
  {
    id: 'v1-dropin',
    name: 'V1 — Drop-In Fixture',
    shortName: 'V1 Drop-In',
    photo: '/dropin_light.png',
    description:
      'Versatile fixture you can adjust after installation. Change the beam angle and reposition as your landscape grows.',
    benefits: ['Adjustable beam angle', 'Repositionable post-install', 'Versatile placement'],
    finishes: [
      {
        id: 'raw-brass',
        name: 'Raw Brass',
        priceTier: '$$$',
        swatch: '#4A3728',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'artisan-brass',
        name: 'Artisan Brass',
        priceTier: '$$',
        swatch: '#8B6914',
        description: 'Hand-finished brass with a warm, polished sheen. Premium craftsmanship.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        priceTier: '$',
        swatch: null,
        hasColorOptions: true,
        description:
          'Durable, lightweight aluminum available in 3 colors. Great value with solid performance.',
      },
    ],
  },
  {
    id: 'v2-integrated',
    name: 'V2 — Integrated Fixture',
    shortName: 'V2 Integrated',
    photo: '/integrated_light.png',
    description:
      'Fixed-mount fixture built directly into the landscape. Stronger construction with a clean, seamless look.',
    benefits: ['Structurally stronger', 'Seamless installation', 'Clean, minimal profile'],
    finishes: [
      {
        id: 'raw-brass',
        name: 'Raw Brass',
        priceTier: '$$',
        swatch: '#4A3728',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        priceTier: '$',
        swatch: null,
        hasColorOptions: true,
        description:
          'Durable, lightweight aluminum available in 3 colors. Great value with solid performance.',
      },
    ],
  },
];

/* ── Tree lighting styles ── */

export const treeLightingStyles = [
  {
    id: 'dramatic',
    name: 'Dramatic',
    description:
      'Bold, high-contrast lighting for striking visual impact. Best for statement trees and focal points.',
    recommended: true,
  },
  {
    id: 'soft',
    name: 'Soft',
    description:
      'Gentle, ambient glow that blends naturally with the landscape. Creates a warm, inviting atmosphere.',
  },
];

/* ── Lighting service areas ── */
/* configType: 'fixture' = V1/V2 fixture → finish flow */
/* configType: 'tree'    = dramatic vs soft style */
/* configType: 'generic' = legacy sub-options + material picker */

export const lightingServices = [
  /* ── Primary areas ── */
  {
    id: 'uplighting',
    name: 'House Uplighting',
    description: "Highlight your home's facade and architectural features",
    Icon: Building2,
    photo: "/SamProject/Drake's Home-04 (1).jpg",
    configType: 'fixture',
  },
  {
    id: 'tree',
    name: 'Tree Uplighting',
    description: 'In-ground dramatic or soft tree illumination',
    Icon: TreePine,
    photo: "/SamProject/Drake's Home-09 (1).jpg",
    configType: 'tree',
  },
  {
    id: 'pathway',
    name: 'Pathway Lighting',
    description: 'Safe and beautiful walkway illumination',
    Icon: Route,
    photo: '/servicesphotos/pathwaylighting.png',
    configType: 'fixture',
  },
  {
    id: 'deck',
    name: 'Deck & Patio',
    description: 'Perfect outdoor entertaining spaces',
    Icon: LayoutGrid,
    photo: '/servicesphotos/deck&patio.jpg',
    configType: 'fixture',
  },
  {
    id: 'wash-area',
    name: 'Wash / Area Lighting',
    description: 'Broad, even illumination for open spaces',
    Icon: Lightbulb,
    photo: "/SamProject/Drake's Home-04 (1).jpg",
    configType: 'fixture',
  },
  /* ── Secondary areas ── */
  {
    id: 'pool',
    name: 'Pool & Water Features',
    description: 'Stunning aquatic illumination',
    Icon: Waves,
    photo: '/servicesphotos/poolandspa.jpg',
    configType: 'generic',
    subOptions: [
      { id: 'pool-underwater', name: 'Underwater Lighting', description: 'Illuminate from below the surface' },
      { id: 'pool-poolside', name: 'Poolside Ambiance', description: 'Warm surrounding glow' },
      { id: 'pool-fountain', name: 'Fountain & Water Feature', description: 'Dramatic water illumination' },
    ],
  },
  {
    id: 'security',
    name: 'Security Lighting',
    description: 'Enhanced safety and protection',
    Icon: Shield,
    photo: '/servicesphotos/securitylighting.png',
    configType: 'generic',
    subOptions: [
      { id: 'security-motion', name: 'Motion-Activated', description: 'Triggers on movement detection' },
      { id: 'security-flood', name: 'Floodlights', description: 'Broad area coverage' },
      { id: 'security-perimeter', name: 'Perimeter Lighting', description: 'Property boundary illumination' },
    ],
  },
  {
    id: 'holiday',
    name: 'Holiday Lighting',
    description: 'Seasonal decorative displays',
    Icon: Sparkles,
    photo: '/servicesphotos/holiday.png',
    configType: 'generic',
    subOptions: [
      { id: 'holiday-roofline', name: 'Roofline Display', description: 'Classic roofline outlines' },
      { id: 'holiday-tree-wrap', name: 'Tree Wraps', description: 'Trunk and branch wrapping' },
      { id: 'holiday-custom', name: 'Custom Display', description: 'Bespoke seasonal design' },
    ],
  },
];

/* ── Legacy material tiers (used by generic configType services) ── */

export const materialTiers = [
  {
    id: 'aluminum',
    name: 'Aluminum',
    tier: 'Standard',
    upcharge: 0,
    description: 'Durable, lightweight fixtures with a clean modern finish. Great value with solid performance.',
    features: ['Corrosion resistant', 'Lightweight design', 'Modern matte finish'],
  },
  {
    id: 'brass',
    name: 'Brass',
    tier: 'Premium',
    upcharge: 6.99,
    description: 'Classic brass fixtures that develop a beautiful patina over time. Timeless elegance for your property.',
    features: ['Natural patina aging', 'Superior durability', 'Timeless aesthetic'],
  },
  {
    id: 'metallic-alloy',
    name: 'Metallic Alloy',
    tier: 'Elite',
    upcharge: 18.0,
    description: 'Top-of-the-line composite alloy fixtures. Maximum durability with a premium aesthetic.',
    features: ['Maximum longevity', 'Premium brushed finish', 'Lifetime warranty'],
  },
];
