import {
  Route,
  Waves,
  Building2,
  TreePine,
  LayoutGrid,
  Shield,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

/* ── Shared aluminum color lookup (for review cards / PDF summaries) ── */

export const aluminumColorLookup = {
  black: { id: 'black', name: 'Black', swatch: '#1a1a1a' },
  aluminum: { id: 'aluminum', name: 'Aluminum', swatch: '#c0c0c0' },
  sand: { id: 'sand', name: 'Textured Sand', swatch: '#c2b280' },
};

/* ── V2 aluminum colors (deck, wash, pool, security — all V2 integrated) ── */

export const v2AluminumColors = [
  { id: 'black', name: 'Black', photo: '/light_form/v2_lights/v2_lights_black_alaluminim.png' },
  { id: 'aluminum', name: 'Aluminum', photo: '/light_form/v2_lights/v2_lights_aluminum.png' },
];

/* ── Fixture types with per-fixture color options and pricing ── */

export const fixtureTypes = [
  {
    id: 'v1-dropin',
    name: 'V1 — Drop-In Fixture',
    shortName: 'V1 Drop-In',
    photo: '/light_form/v1_lights/v1_lights_scene_1.png',
    basePrice: 150,
    description:
      'Versatile fixture you can adjust after installation. Change the beam angle and reposition as your landscape grows.',
    benefits: ['Adjustable beam angle', 'Repositionable post-install', 'Versatile placement'],
    finishes: [
      {
        id: 'raw-brass',
        name: 'Raw Brass',
        price: 200,
        photo: '/light_form/v1_lights/v1_lights_brass.png',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'artisan-brass',
        name: 'Artisan Brass',
        price: 200,
        photo: '/light_form/v1_lights/v1_lights_artisanal_bronze.png',
        description: 'Hand-finished brass with a warm, polished sheen. Premium craftsmanship.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        price: 150,
        isBase: true,
        hasColorOptions: true,
        description:
          'Durable, lightweight aluminum available in multiple colors. Great value with solid performance.',
        colorOptions: [
          { id: 'black', name: 'Black', photo: '/light_form/v1_lights/v1_lights_black.png' },
          { id: 'aluminum', name: 'Aluminum', photo: '/light_form/v1_lights/v1_lights_aluminum.png' },
          { id: 'sand', name: 'Textured Sand', photo: '/light_form/v1_lights/v1_lights_textured_sand.png' },
        ],
      },
    ],
  },
  {
    id: 'v2-integrated',
    name: 'V2 — Integrated Fixture',
    shortName: 'V2 Integrated',
    photo: '/light_form/v2_lights/v2_lights_scene_1.png',
    basePrice: 170,
    description:
      'Fixed-mount fixture built directly into the landscape. Stronger construction with a clean, seamless look.',
    benefits: ['Structurally stronger', 'Seamless installation', 'Clean, minimal profile'],
    finishes: [
      {
        id: 'raw-brass',
        name: 'Raw Brass',
        price: 363,
        photo: '/light_form/v2_lights/v2_lights_brass.png',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        hasColorOptions: true,
        description:
          'Durable, lightweight aluminum. Great value with solid performance.',
        colorOptions: [
          { id: 'black', name: 'Black', price: 170, isBase: true, photo: '/light_form/v2_lights/v2_lights_black_alaluminim.png' },
          { id: 'aluminum', name: 'Stainless Aluminum', price: 290, photo: '/light_form/v2_lights/v2_lights_aluminum.png' },
        ],
      },
    ],
  },
];

/* ── Tree focus options ── */

export const treeFocusOptions = [
  {
    id: 'trunk',
    name: 'Trunk Focused',
    description:
      'Emphasizes the trunk and lower structure for a grounded, architectural look.',
  },
  {
    id: 'canopy',
    name: 'Canopy Focused',
    description:
      'Illuminates the upper canopy and branches, creating a dramatic overhead glow.',
  },
  {
    id: 'designers-choice',
    name: "Designer's Discretion",
    description:
      'Let our installers choose the best approach based on your specific trees and landscape.',
    recommended: true,
  },
];

/* ── Deck light sizes ── */

export const deckSizes = [
  { id: 'small', name: 'Small' },
  { id: 'large', name: 'Large' },
];

/* ── Educational tips ── */

export const materialTip = {
  title: 'Brass vs. Aluminum',
  content:
    "Brass is the gold standard for outdoor fixtures — it develops a natural protective patina and can last 20+ years with minimal maintenance. It's a premium investment that only gets better with age. Aluminum is budget-friendly, lightweight, and comes in multiple color options, but it's more susceptible to wear over time and may need replacement sooner.",
};

export const fixtureTip = {
  title: 'Drop-In vs. Integrated',
  content:
    "Drop-in (V1) fixtures sit in the ground and can be repositioned or swapped out after installation — great if your landscape is still evolving. Integrated (V2) fixtures are built directly into the hardscape for a cleaner, permanent look with stronger structural integrity.",
};

/* ── Lighting service areas ── */
/* configType: 'fixture'    = V1/V2 fixture → finish flow (uplighting, pathway)  */
/* configType: 'tree'       = focus question only (trunk/canopy/designer)         */
/* configType: 'deck'       = size + aluminum color (V2 integrated only)          */
/* configType: 'color-only' = just aluminum color picker                          */
/* configType: 'none'       = no config needed (just selecting it is enough)      */

export const lightingServices = [
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
    description: 'In-ground well lights to showcase your trees',
    Icon: TreePine,
    photo: '/servicesphotos/outside.jpg',
    configType: 'tree',
  },
  {
    id: 'pathway',
    name: 'Pathway Lighting',
    description: 'Safe and beautiful walkway illumination',
    Icon: Route,
    photo: '/projects/NEWTON3.jpeg',
    configType: 'fixture',
  },
  {
    id: 'deck',
    name: 'Deck & Patio',
    description: 'Perfect outdoor entertaining spaces',
    Icon: LayoutGrid,
    photo: '/light_form/v1_lights/v1_lights_scene_2.png',
    configType: 'deck',
  },
  {
    id: 'wash-area',
    name: 'Wash / Area Lighting',
    description: 'Broad, even illumination for open spaces',
    Icon: Lightbulb,
    photo: "/SamProject/Drake's Home-05 (2).jpg",
    configType: 'color-only',
  },
  {
    id: 'specialty',
    name: 'Specialty / Wall Lighting',
    description: 'Decorative wall lights and accent fixtures',
    Icon: Sparkles,
    photo: '/projects/BACKYARD_4.jpeg',
    configType: 'none',
  },
  {
    id: 'pool',
    name: 'Pool & Water Features',
    description: 'Stunning aquatic illumination',
    Icon: Waves,
    photo: '/servicesphotos/poolandspa.jpg',
    configType: 'color-only',
  },
  {
    id: 'security',
    name: 'Security Lighting',
    description: 'Enhanced safety and protection',
    Icon: Shield,
    photo: '/light_form/MS-Knuckle/MS-Knuckle_scene_1.png',
    configType: 'color-only',
  },
];
