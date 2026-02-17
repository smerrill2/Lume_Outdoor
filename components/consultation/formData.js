import {
  Route,
  Waves,
  Building2,
  TreePine,
  LayoutGrid,
  Shield,
  Sparkles,
} from 'lucide-react';

export const lightingServices = [
  {
    id: 'pathway',
    name: 'Pathway Lighting',
    description: 'Safe and beautiful walkway illumination',
    Icon: Route,
    photo: '/servicesphotos/pathwaylighting.png',
    subOptions: [
      { id: 'pathway-solar', name: 'Solar Powered', description: 'Eco-friendly, no wiring needed' },
      { id: 'pathway-wired', name: 'Hardwired', description: 'Consistent brightness, reliable' },
      { id: 'pathway-low-voltage', name: 'Low Voltage', description: 'Energy efficient, easy install' },
    ],
  },
  {
    id: 'pool',
    name: 'Pool & Water Features',
    description: 'Stunning aquatic illumination',
    Icon: Waves,
    photo: '/servicesphotos/poolandspa.jpg',
    subOptions: [
      { id: 'pool-underwater', name: 'Underwater Lighting', description: 'Illuminate from below the surface' },
      { id: 'pool-poolside', name: 'Poolside Ambiance', description: 'Warm surrounding glow' },
      { id: 'pool-fountain', name: 'Fountain & Water Feature', description: 'Dramatic water illumination' },
    ],
  },
  {
    id: 'uplighting',
    name: 'Uplighting',
    description: "Highlight your home's facade and features",
    Icon: Building2,
    photo: "/SamProject/Drake's Home-04 (1).jpg",
    subOptions: [
      { id: 'uplighting-facade', name: 'Facade Wash', description: 'Even wall illumination' },
      { id: 'uplighting-column', name: 'Column & Pillar', description: 'Vertical accent lighting' },
      { id: 'uplighting-accent', name: 'Accent Spotlights', description: 'Focused feature highlights' },
    ],
  },
  {
    id: 'tree',
    name: 'Tree Lighting',
    description: 'Dramatic canopy and trunk illumination',
    Icon: TreePine,
    photo: "/SamProject/Drake's Home-09 (1).jpg",
    subOptions: [
      { id: 'tree-canopy', name: 'Canopy Uplighting', description: 'Light filtering through leaves' },
      { id: 'tree-spotlight', name: 'Trunk Spotlights', description: 'Dramatic bark texturing' },
      { id: 'tree-downlight', name: 'Moonlight Downlighting', description: 'Soft overhead glow' },
    ],
  },
  {
    id: 'deck',
    name: 'Deck & Patio',
    description: 'Perfect outdoor entertaining spaces',
    Icon: LayoutGrid,
    photo: '/servicesphotos/deck&patio.jpg',
    subOptions: [
      { id: 'deck-rail', name: 'Rail Lighting', description: 'Illuminated railings and borders' },
      { id: 'deck-step', name: 'Step & Riser Lights', description: 'Safe stair navigation' },
      { id: 'deck-string', name: 'Overhead String Lights', description: 'Festive canopy ambiance' },
    ],
  },
  {
    id: 'security',
    name: 'Security Lighting',
    description: 'Enhanced safety and protection',
    Icon: Shield,
    photo: '/servicesphotos/securitylighting.png',
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
    subOptions: [
      { id: 'holiday-roofline', name: 'Roofline Display', description: 'Classic roofline outlines' },
      { id: 'holiday-tree-wrap', name: 'Tree Wraps', description: 'Trunk and branch wrapping' },
      { id: 'holiday-custom', name: 'Custom Display', description: 'Bespoke seasonal design' },
    ],
  },
];

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
