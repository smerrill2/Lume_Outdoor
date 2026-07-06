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
  { id: 'black', name: 'Black', photo: '/light_form/v2_lights/v2_lights_black_alaluminim.png', upcharge: 0 },
  { id: 'aluminum', name: 'Aluminum', photo: '/light_form/v2_lights/v2_lights_aluminum.png', upcharge: 120 },
];

/* ── Fixture types with per-fixture color options and pricing ── */

export const fixtureTypes = [
  {
    id: 'v1-dropin',
    name: 'V1 — Drop-In Fixture',
    shortName: 'V1 Drop-In',
    basePrice: 150,
    photo: '/light_form/v1_lights/v1_lights_scene_1.png',
    description:
      'Versatile fixture you can adjust after installation. Change the beam angle and reposition as your landscape grows.',
    benefits: ['Adjustable beam angle', 'Repositionable post-install', 'Versatile placement'],
    finishes: [
      {
        id: 'raw-brass',
        name: 'Raw Brass',
        upcharge: 50,
        photo: '/light_form/v1_lights/v1_lights_brass.png',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'artisan-brass',
        name: 'Artisan Brass',
        upcharge: 50,
        photo: '/light_form/v1_lights/v1_lights_artisanal_bronze.png',
        description: 'Hand-finished brass with a warm, polished sheen. Premium craftsmanship.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        upcharge: 0,
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
    basePrice: 170,
    photo: '/light_form/v2_lights/v2_lights_scene_1.png',
    description:
      'Fixed-mount fixture built directly into the landscape. Stronger construction with a clean, seamless look.',
    benefits: ['Structurally stronger', 'Seamless installation', 'Clean, minimal profile'],
    finishes: [
      {
        id: 'solid-brass',
        name: 'Solid Brass',
        upcharge: 190,
        photo: '/light_form/v2_lights/v2_lights_brass.png',
        description:
          'Solid brass that develops a rich natural patina over time. One-of-a-kind character.',
      },
      {
        id: 'aluminum',
        name: 'Aluminum',
        upcharge: 0,
        hasColorOptions: true,
        description:
          'Durable, lightweight aluminum. Great value with solid performance.',
        colorOptions: [
          { id: 'black', name: 'Black', upcharge: 0, isBase: true, photo: '/light_form/v2_lights/v2_lights_black_alaluminim.png' },
          { id: 'aluminum', name: 'Stainless Aluminum', upcharge: 120, photo: '/light_form/v2_lights/v2_lights_aluminum.png' },
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

/* ── Lighting service areas ── */
/* configType: 'fixture'    = Drop-in uplight fixture → finish flow              */
/* configType: 'tree'       = focus question only (trunk/canopy/designer)         */
/* configType: 'deck'       = size + aluminum color (V2 integrated only)          */
/* configType: 'color-only' = just aluminum color picker                          */
/* configType: 'none'       = no config needed (just selecting it is enough)      */

/* ── Wall Washer fixture options (Mini + Large) ── */
export const wallWasherFixtures = [
  {
    id: 'ww-mini',
    name: 'Wall Washer Mini',
    basePrice: 85,
    photo: '/light_form/wallwasher_mini/ww_mini_black.png',
    whiteBg: true,
    description: 'Compact wall wash light for accent and ambient lighting.',
    finishes: {
      brass: [
        { id: 'solid-brass', name: 'Solid Brass', upcharge: 24, photo: '/light_form/wallwasher_mini/ww_mini_brass.png', whiteBg: true },
      ],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/wallwasher_mini/ww_mini_black.png', whiteBg: true },
        { id: 'arch-bronze', name: 'Architectural Bronze', upcharge: 0, photo: '/light_form/wallwasher_mini/ww_mini_aluminum_bronze.png', whiteBg: true },
        { id: 'stainless', name: 'Stainless Aluminum', upcharge: 12, photo: '/light_form/wallwasher_mini/ww_mini_stainless_aluminum.png', whiteBg: true },
      ],
    },
  },
  {
    id: 'ww-large',
    name: 'Wall Washer Large',
    basePrice: 182,
    photo: '/light_form/wallwasher/wallwasher_black.png',
    whiteBg: true,
    description: 'Full-size wall wash light for broader coverage.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/wallwasher/wallwasher_black.png', whiteBg: true },
      ],
    },
  },
];

/* ── Deck Light fixture options (Mini + Large) ── */
export const deckLightFixtures = [
  {
    id: 'dl-mini',
    name: 'Deck Light Mini',
    basePrice: 61,
    photo: '/light_form/decklight_mini/decklight_mini_black.jpg',
    whiteBg: true,
    description: 'Compact deck light for railings, steps, and tight spaces.',
    finishes: {
      brass: [
        { id: 'solid-brass', name: 'Solid Brass', upcharge: 24, photo: '/light_form/decklight_mini/decklight_mini_brass.jpg', whiteBg: true },
      ],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/decklight_mini/decklight_mini_black.jpg', whiteBg: true },
        { id: 'arch-bronze', name: 'Architectural Bronze', upcharge: 0, photo: '/light_form/decklight_mini/decklight_mini_architectural_bronze.jpg', whiteBg: true },
        { id: 'stainless', name: 'Stainless Aluminum', upcharge: 12, photo: '/light_form/decklight_mini/decklight_mini_stainless_aluminum.jpg', whiteBg: true },
      ],
    },
  },
  {
    id: 'dl-large',
    name: 'Deck Light Large',
    basePrice: 85,
    photo: '/light_form/decklight/decklight_black.jpg',
    whiteBg: true,
    description: 'Full-size deck light for broader illumination.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'arch-bronze', name: 'Architectural Bronze', upcharge: 0, photo: '/light_form/decklight/decklight_stainless_bronze.jpg', whiteBg: true },
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/decklight/decklight_black.jpg', whiteBg: true },
      ],
    },
  },
];

/* ── Pathway fixture options (pick style → pick finish) ── */
export const pathwayFixtures = [
  {
    id: 'p14',
    name: 'P14 Path Light',
    basePrice: 218,
    photo: '/light_form/p14/P14-Path-Light-in-Black.png',
    whiteBg: true,
    description: 'Classic mushroom-style path light.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/p14/P14-Path-Light-in-Black.png', whiteBg: true },
        { id: 'matte-black', name: 'Matte Black', upcharge: 0, photo: '/light_form/p14/P14-Black.png', whiteBg: true },
      ],
    },
  },
  {
    id: 'p11',
    name: 'P11 Path Light',
    basePrice: 218,
    photo: '/light_form/p11/P11_black.png',
    whiteBg: true,
    description: 'Modern angular path light.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/p11/P11_black.png', whiteBg: true },
        { id: 'arch-bronze', name: 'Architectural Bronze', upcharge: 0, photo: '/light_form/p11/P11-Architectural-Bronze.png', whiteBg: true },
        { id: 'stainless', name: 'Stainless Aluminum', upcharge: 0, photo: '/light_form/p11/P11-Stainless-Aluminum.png', whiteBg: true },
      ],
    },
  },
  {
    id: 'p4',
    name: 'P4 Path Light',
    basePrice: 218,
    photo: '/light_form/p4/p4_stainless_aluminum.png',
    whiteBg: true,
    description: 'Sleek minimal path light.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'stainless', name: 'Stainless Aluminum', upcharge: 0, photo: '/light_form/p4/p4_stainless_aluminum.png', whiteBg: true },
      ],
    },
  },
  {
    id: 'tropical-leaf',
    name: 'Tropical Leaf',
    basePrice: 218,
    photo: '/light_form/tropical_leaf/tropical_leaf_black.png',
    whiteBg: true,
    description: 'Nature-inspired leaf design path light.',
    finishes: {
      brass: [],
      aluminum: [
        { id: 'black', name: 'Black', upcharge: 0, photo: '/light_form/tropical_leaf/tropical_leaf_black.png', whiteBg: true },
        { id: 'arch-bronze', name: 'Architectural Bronze', upcharge: 0, photo: '/light_form/tropical_leaf/tropical_leaf_archetectural_bronze.png', whiteBg: true },
        { id: 'silver', name: 'Silver', upcharge: 0, photo: '/light_form/tropical_leaf/tropical_leaf_silver.png', whiteBg: true },
        { id: 'stainless', name: 'Stainless Steel', upcharge: 0, photo: '/light_form/tropical_leaf/tropical_leaf_stainless_steel.png', whiteBg: true },
      ],
    },
  },
  {
    id: 'tiki-light',
    name: '7" Tiki Light',
    basePrice: 218,
    photo: '/light_form/pathlights/7in_tiki_light.png',
    whiteBg: true,
    description: 'Traditional tiki-style brass path light.',
    finishes: {
      brass: [
        { id: 'brass', name: 'Brass', upcharge: 0, photo: '/light_form/pathlights/7in_tiki_light.png', whiteBg: true },
      ],
      aluminum: [],
    },
  },
  {
    id: 'brass-villa',
    name: 'Brass Villa',
    basePrice: 218,
    photo: '/light_form/pathlights/Brass_villa.png',
    whiteBg: true,
    description: 'Elegant villa-style brass path light.',
    finishes: {
      brass: [
        { id: 'brass', name: 'Brass', upcharge: 0, photo: '/light_form/pathlights/Brass_villa.png', whiteBg: true },
      ],
      aluminum: [],
    },
  },
  {
    id: 'brass-mushroom',
    name: 'Brass Mushroom',
    basePrice: 218,
    photo: '/light_form/pathlights/mushroom_brass.png',
    whiteBg: true,
    description: 'Classic mushroom-style brass path light.',
    finishes: {
      brass: [
        { id: 'brass', name: 'Brass', upcharge: 0, photo: '/light_form/pathlights/mushroom_brass.png', whiteBg: true },
      ],
      aluminum: [],
    },
  },
];

export const lightingServices = [
  {
    id: 'uplighting',
    name: 'Above-Ground Uplights',
    description: 'Visible fixtures for homes, trees, columns, and landscape features',
    Icon: Building2,
    photo: "/projects/SamProject/drakes-home-04.jpg",
    configType: 'fixture',
  },
  {
    id: 'tree',
    name: 'Tree Well Lights',
    description: 'In-ground fixtures for tree, canopy, or trunk lighting',
    Icon: TreePine,
    photo: '/servicesphotos/tree_lighting.jpeg',
    basePrice: 117,
    configType: 'tree',
  },
  {
    id: 'pathway',
    name: 'Pathway Lighting',
    description: 'Safe and beautiful walkway illumination',
    Icon: Route,
    photo: '/projects/newton_project/NEWTON3.jpeg',
    configType: 'pathway',
  },
  {
    id: 'deck',
    name: 'Deck & Patio',
    description: 'Perfect outdoor entertaining spaces',
    Icon: LayoutGrid,
    photo: '/servicesphotos/deck_lighting.jpeg',
    configType: 'deck-fixture',
  },
  {
    id: 'wash-area',
    name: 'Wash / Area Lighting',
    description: 'Broad, even illumination for open spaces',
    Icon: Lightbulb,
    photo: "/projects/SamProject/drakes-home-05.jpg",
    configType: 'specialty',
  },
  {
    id: 'rock-wall',
    name: 'Rock Wall Lighting',
    description: 'Accent lighting designed for stone and rock surfaces',
    Icon: Sparkles,
    photo: '/servicesphotos/rockwall.jpeg',
    configType: 'none',
    configNote: "Rock wall lighting is tailored to your specific wall. We'll reach out with more details once you've submitted.",
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
    configType: 'none',
    configNote: "Security lighting is a specific plan tailored to your house. We'll reach out with more information once you've submitted.",
  },
];
