// Town-by-town service area content for the /service-areas pages.
// Everything here should stay true to the ground: real distances, real projects,
// real testimonials. When Lume finishes a job in a town, add its project slug to
// that town's `featuredProjectSlugs` so the page shows local work first.

const WICHITA_PROJECT_SLUGS = [
  'the-coves-model-home',
  'crestview-masonry',
  'reeds-cove-project',
];

export const serviceAreaTowns = [
  {
    slug: 'wichita',
    name: 'Wichita',
    county: 'Sedgwick County',
    heroImage: '/projects/crestview_project/showcase_photo-hero.webp',
    heroImageLocation: 'Crestview, Wichita',
    distanceSummary: 'Home base',
    intro:
      'Lume Outdoor is based in Wichita, and most of the homes we light are here. We have designed and installed systems in The Coves, Crestview, Auburn Hills, Reeds Cove, Oak Creek and along City View Street, from single front-yard uplighting jobs to full front-and-back systems with pool and deck lighting.',
    localDetail:
      'Because we are local, the consultation, the install and any service visit afterward are a short drive for us rather than a special trip.',
    featuredProjectSlugs: ['crestview-masonry', 'the-coves-model-home', 'reeds-cove-project', 'auburn-hills-backyard', 'oak-creek-project', 'suburban-estate'],
    testimonialName: 'Samantha L.',
    nearbyTownSlugs: ['andover', 'maize', 'derby', 'bel-aire'],
  },
  {
    slug: 'andover',
    name: 'Andover',
    county: 'Butler County',
    heroImage: '/projects/reeds_cove_project/IMG_5410.jpeg',
    heroImageLocation: 'Reeds Cove, Wichita',
    distanceSummary: 'About 13 miles east of downtown Wichita',
    intro:
      'Andover sits on the east edge of the Wichita metro, straight out Kellogg on US-54. We light homes across town, including neighborhoods like Terradyne and Crescent Lakes.',
    localDetail:
      'One Andover homeowner called us about a backyard that had been on the list for years. We lit the patio and garden, and the family now spends its evenings out there. A front elevation can be designed in the same visit.',
    featuredProjectSlugs: WICHITA_PROJECT_SLUGS,
    testimonialName: 'Mike Thompson',
    nearbyTownSlugs: ['wichita', 'augusta', 'el-dorado', 'bel-aire'],
  },
  {
    slug: 'derby',
    name: 'Derby',
    county: 'Sedgwick County',
    heroImage: '/projects/oak_creek_project/IMG_3956.jpeg',
    heroImageLocation: 'Oak Creek, Wichita',
    distanceSummary: 'About 11 miles south of downtown Wichita',
    intro:
      'Derby is the largest suburb in the Wichita area, a short run down K-15 from the city. We design and install landscape lighting throughout Derby, from established streets with mature trees to newer homes around The Oaks.',
    localDetail:
      'If your Derby home has mature trees or a brick front, both light beautifully: uplights at the trunk, a soft wash on the masonry, and path lights to tie the walk to the door.',
    featuredProjectSlugs: ['oak-creek-project', 'crestview-masonry', 'reeds-cove-project'],
    nearbyTownSlugs: ['wichita', 'haysville', 'andover'],
  },
  {
    slug: 'maize',
    name: 'Maize',
    county: 'Sedgwick County',
    heroImage: '/projects/coves_project/coves-front-elevation.webp',
    heroImageLocation: 'The Coves, West Wichita',
    distanceSummary: 'About 12 miles northwest of downtown Wichita',
    intro:
      'Maize is one of the fastest-growing towns in the metro, and much of what is going up there is new. A new build is the easiest time to add lighting, before the landscaping fills in and while there is nothing mature to work around. Our Coves model home project in west Wichita was exactly that kind of job.',
    localDetail:
      'New construction usually means young trees and clean architecture, so the design leans on the house itself: stone, gables, columns and entries, with fixtures placed so the system can grow as the yard does.',
    featuredProjectSlugs: WICHITA_PROJECT_SLUGS,
    nearbyTownSlugs: ['wichita', 'goddard', 'valley-center', 'park-city'],
  },
  {
    slug: 'goddard',
    name: 'Goddard',
    county: 'Sedgwick County',
    heroImage: '/projects/coves_project/coves-street-view.webp',
    heroImageLocation: 'The Coves, West Wichita',
    distanceSummary: 'About 14 miles west of downtown Wichita',
    intro:
      'Goddard is west of Wichita on US-54, a few miles beyond west-side neighborhoods like The Coves, where we lit a new model home. We bring the same process out to Goddard: a walk of the property, a custom design, and a clean install.',
    localDetail:
      'On an open lot, a well-lit front elevation carries a long way from the street. A handful of well-aimed fixtures often does more than a yard full of path lights.',
    featuredProjectSlugs: WICHITA_PROJECT_SLUGS,
    nearbyTownSlugs: ['wichita', 'maize', 'haysville'],
  },
  {
    slug: 'bel-aire',
    name: 'Bel Aire',
    county: 'Sedgwick County',
    heroImage: '/projects/backyard_project/BACKYARD_1-home.webp',
    heroImageLocation: 'Auburn Hills, Wichita',
    distanceSummary: 'About 8 miles northeast of downtown Wichita',
    intro:
      'Bel Aire borders northeast Wichita, so for us it is practically a local call. We design and install landscape, architectural and backyard lighting for Bel Aire homes, and we service existing systems that have dimmed, failed or been outgrown by the landscaping.',
    localDetail:
      'The two can be combined: a new front-yard design plus repairs to an older system out back, planned together.',
    featuredProjectSlugs: ['auburn-hills-backyard', 'crestview-masonry', 'reeds-cove-project'],
    nearbyTownSlugs: ['wichita', 'park-city', 'andover', 'valley-center'],
  },
  {
    slug: 'park-city',
    name: 'Park City',
    county: 'Sedgwick County',
    heroImage: '/projects/SamProject/drakes-home-04.jpg',
    heroImageLocation: 'City View Street, Wichita',
    distanceSummary: 'About 8 miles north of downtown Wichita',
    intro:
      'Park City is just north of Wichita along I-135, a quick trip for our crew. We light front elevations, walkways, patios and trees for Park City homeowners, and every project starts with a free on-site consultation.',
    localDetail:
      'Safety is a common reason people call us: dark front walks, steps and side yards. Low, warm path and step lighting fixes that without making the house look like a parking lot.',
    featuredProjectSlugs: ['suburban-estate', 'auburn-hills-backyard', 'crestview-masonry'],
    nearbyTownSlugs: ['wichita', 'valley-center', 'bel-aire', 'newton'],
  },
  {
    slug: 'haysville',
    name: 'Haysville',
    county: 'Sedgwick County',
    heroImage: '/projects/oak_creek_project/IMG_3965.jpeg',
    heroImageLocation: 'Oak Creek, Wichita',
    distanceSummary: 'About 9 miles south of downtown Wichita',
    intro:
      'Haysville is directly south of Wichita, and we cover it the same way we cover the city: free consultation, custom design, professional install. We work on homes of every size, from a few uplights on a front yard to full-property systems.',
    localDetail:
      'A front-yard system is a common place to start. Our designs are modular, so the backyard, patio or trees can be added later without redoing what is already in the ground.',
    featuredProjectSlugs: ['oak-creek-project', 'suburban-estate', 'auburn-hills-backyard'],
    nearbyTownSlugs: ['wichita', 'derby', 'goddard'],
  },
  {
    slug: 'valley-center',
    name: 'Valley Center',
    county: 'Sedgwick County',
    heroImage: '/projects/newton_project/NEWTON1-home.webp',
    heroImageLocation: 'Newton, KS',
    distanceSummary: 'About 11 miles north of downtown Wichita',
    intro:
      'Valley Center is north of Wichita, between the city and Newton. We design and install low-voltage LED lighting for Valley Center homes and keep older systems running with repair and maintenance visits.',
    localDetail:
      'We have already lit a home farther up the road in Newton, so the drive north is one we know.',
    featuredProjectSlugs: ['newton-ranch-style', 'crestview-masonry', 'auburn-hills-backyard'],
    nearbyTownSlugs: ['park-city', 'newton', 'maize', 'wichita'],
  },
  {
    slug: 'newton',
    name: 'Newton',
    county: 'Harvey County',
    heroImage: '/projects/newton_project/NEWTON1-home.webp',
    heroImageLocation: 'Newton, KS',
    distanceSummary: 'About 26 miles north of downtown Wichita',
    intro:
      'Newton is a straight shot north on I-135, and we have already done work here. Our Newton ranch-style project used architectural lighting to pick out the lines of a classic ranch home and make the outdoor spaces usable after dark.',
    localDetail:
      'Ranch homes are long and low, which makes them easy to light badly. The trick is even, warm light along the front with a few accents, rather than a row of bright spots.',
    featuredProjectSlugs: ['newton-ranch-style', 'crestview-masonry', 'the-coves-model-home'],
    nearbyTownSlugs: ['valley-center', 'park-city', 'hutchinson', 'wichita'],
  },
  {
    slug: 'augusta',
    name: 'Augusta',
    county: 'Butler County',
    heroImage: '/projects/crestview_project/project_photo_2-home.webp',
    heroImageLocation: 'Crestview, Wichita',
    distanceSummary: 'About 19 miles east of downtown Wichita',
    intro:
      'Augusta is east of Wichita on US-54, a few minutes past Andover. We take on landscape and architectural lighting projects in Augusta and handle them the same way as any job in town, starting with a free walk of your property.',
    localDetail:
      'Older homes with brick, stone and big trees are some of our favorite projects. Masonry takes warm light especially well, as our Crestview project in Wichita shows.',
    featuredProjectSlugs: ['crestview-masonry', 'oak-creek-project', 'reeds-cove-project'],
    nearbyTownSlugs: ['andover', 'el-dorado', 'wichita'],
  },
  {
    slug: 'el-dorado',
    name: 'El Dorado',
    county: 'Butler County',
    heroImage: '/projects/coves_project/coves-tree-framed.webp',
    heroImageLocation: 'The Coves, West Wichita',
    distanceSummary: 'About 30 miles east of downtown Wichita',
    intro:
      'El Dorado is the Butler County seat and the eastern edge of our service area, about half an hour from Wichita. We design and install full lighting systems for El Dorado homes, including properties out toward El Dorado Lake.',
    localDetail:
      'The process is the same as in town: we walk the property with you, design the system around your home, and install it ourselves.',
    featuredProjectSlugs: WICHITA_PROJECT_SLUGS,
    nearbyTownSlugs: ['augusta', 'andover', 'wichita'],
  },
  {
    slug: 'hutchinson',
    name: 'Hutchinson',
    county: 'Reno County',
    heroImage: '/projects/coves_project/coves-stone-wall-wash.webp',
    heroImageLocation: 'The Coves, West Wichita',
    distanceSummary: 'About 50 miles northwest of downtown Wichita',
    intro:
      'Hutchinson is the farthest town we travel to, about an hour northwest of Wichita on K-96. We take on landscape and architectural lighting projects in Hutchinson for homeowners who want a designed system rather than a kit from the hardware store.',
    localDetail:
      'Because of the drive, it helps to send photos of the house and yard when you request a consultation, so we arrive with a head start on the design.',
    featuredProjectSlugs: WICHITA_PROJECT_SLUGS,
    nearbyTownSlugs: ['newton', 'maize', 'wichita'],
  },
];

export function getServiceAreaTown(townSlug) {
  return serviceAreaTowns.find((town) => town.slug === townSlug);
}

// The services each town page links to, in the order homeowners ask about them.
export const serviceAreaServiceSlugs = [
  'residential-landscape',
  'architectural',
  'tree-lighting',
  'pathway-lighting',
  'deck-patio',
  'pool-water',
  'security-lighting',
  'landscape-lighting-repair',
];

// Answers reuse the same facts as the homepage FAQ so the two never disagree.
export function buildServiceAreaFaqs(town) {
  return [
    {
      question: `Do you install landscape lighting in ${town.name}?`,
      answer:
        town.slug === 'wichita'
          ? 'Yes. Lume Outdoor is based in Wichita and most of our projects are here. We design, install and service low-voltage LED landscape lighting across the city.'
          : `Yes. ${town.name} is part of our regular service area. We are based in Wichita and design, install and service low-voltage LED landscape lighting for ${town.name} homes.`,
    },
    {
      question: `How do I get a quote for outdoor lighting in ${town.name}?`,
      answer:
        'Book a free consultation. We walk your property, talk through what you want to see at night, and follow up with a custom design and quote. There is no pressure to buy.',
    },
    {
      question: 'How long does installation take?',
      answer:
        'Most residential jobs are completed in 1–2 days, depending on size and complexity. We give you a clear timeline before we begin.',
    },
    {
      question: 'Is the lighting covered by a warranty?',
      answer:
        "Yes. Fixtures and transformers include a 20-year product warranty. System controls carry their applicable manufacturer's warranty. Labor and installation are not covered.",
    },
    {
      question: `Can you repair an existing lighting system in ${town.name}?`,
      answer:
        'Yes. We inspect and repair most professionally installed low-voltage outdoor lighting systems, even when Lume was not the original installer. That covers lights that are out, dim or flickering, plus wiring, transformers, timers and controls.',
    },
  ];
}
