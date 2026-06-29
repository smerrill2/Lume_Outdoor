// Centralized content management for Lume Outdoor website
// This file contains all static content that can be easily updated

// Projects data for PreviousWorkShowcase component
export const projects = [
  {
    id: 'crestview-masonry',
    title: 'Crestview Masonry Estate',
    location: 'Crestview, Wichita',
    description: 'Architectural uplighting designed to celebrate stunning brick arches and masonry details, with path lighting for safety and a full maintenance refresh on existing tree wells.',
    image: '/projects/crestview_project/project_photo_2-home.webp',
    tags: ['Residential', 'Masonry', 'Maintenance'],
    featured: true
  },
  {
    id: 'newton-ranch-style',
    title: 'Newton Ranch Style Home',
    location: 'Newton, KS',
    description: 'Classic ranch home enhanced with modern lighting that highlights architectural lines and creates inviting outdoor spaces for the whole family.',
    image: '/projects/newton_project/NEWTON1-home.webp',
    tags: ['Residential', 'Ranch Home', 'Architectural']
  },
  {
    id: 'auburn-hills-backyard',
    title: 'Auburn Hills Backyard Lighting',
    location: 'Auburn Hills, Wichita',
    description: 'Stunning backyard transformation with strategic backdoor lighting for security and ambiance, perfect for evening entertaining and safe navigation.',
    image: '/projects/backyard_project/BACKYARD_1-home.webp',
    tags: ['Residential', 'Backyard', 'Security Lighting']
  },
  {
    id: 'wichita-brick-facade',
    title: 'Wichita Brick Facade Lighting',
    location: 'Wichita, KS',
    description: 'Warm architectural uplighting designed to bring depth, texture, and curb appeal to a classic brick home after dusk.',
    image: '/projects/new_project/IMG_3955.webp',
    tags: ['Residential', 'Brick Home', 'Architectural']
  },
  {
    id: 'oak-creek-project',
    title: 'Oak Creek Front Yard Lighting',
    location: 'Wichita, KS',
    description: 'A warm front-yard transformation using architectural uplighting, tree well lights, and landscape accents to create a brighter, more welcoming home exterior.',
    image: '/projects/oak_creek_project/IMG_3956.jpeg',
    tags: ['Residential', 'Front Yard', 'Tree Lighting']
  },
  {
    id: 'reeds-cove-project',
    title: 'Reeds Cove Outdoor Lighting',
    location: 'Wichita, KS',
    description: 'A full front and backyard lighting system with integrated uplights, poolside path lighting, landscape washes, and deck step lighting.',
    image: '/projects/reeds_cove_project/IMG_5410.jpeg',
    tags: ['Residential', 'Backyard', 'Pool Lighting']
  },
  {
    id: 'suburban-estate',
    title: 'Suburban Estate',
    location: 'City View Street, Wichita',
    description: 'Transformed a 2016 brick home from pitch-black to picture-perfect with strategic uplighting, path illumination, and architectural accents.',
    image: "/projects/SamProject/drakes-home-04.jpg",
    tags: ['Residential', 'Brick Home', 'Path Lighting'],
    showOnHomePage: false
  }
];

// Project details for ProjectDetailPage component
export const projectDetails = {
  'crestview-masonry': {
    title: 'Crestview Masonry Estate',
    location: 'Crestview, Wichita',
    date: 'Completed: 2025',
    coverImage: '/projects/crestview_project/showcase_photo.jpeg',
    clientGoals: [
      'Highlight the home\'s distinctive brick arches and masonry details',
      'Add path lighting for safety and ambiance through the landscape beds',
      'Refresh and maintain existing in-ground tree well lights',
      'Showcase the property\'s character without overpowering it'
    ],
    overview: "This Crestview estate is defined by its exceptional masonry — from sweeping brick arches at the entrance to detailed brickwork throughout the facade. The homeowners wanted lighting that would do justice to the craftsmanship, while also addressing practical safety needs and bringing an aging tree lighting system back to life.",
    challenge: "The home's intricate masonry demanded precision. Lighting brick arches requires careful angle work to reveal texture and depth without flattening the detail. The existing in-ground tree well lights also needed attention — the bulbs had degraded and the output no longer matched the rest of the property.",
    approach: "We used our V2 uplights to graze the brick arches and masonry sections, positioning each fixture to catch the texture and shadow lines that make this home unique. P14 path lights were placed through the landscape beds for safe navigation while adding warm ambiance that highlights the plantings. For the mature trees, we swapped the existing well light bulbs to restore consistent, warm output across the property.",
    process: [
      {
        title: 'Masonry Uplighting',
        description: "V2 uplights were positioned to graze the brick arches and masonry sections, casting warm light across the textured surfaces to reveal the craftsmanship and create dramatic shadow lines."
      },
      {
        title: 'Path & Bed Lighting',
        description: "P14 path lights were placed throughout the landscape beds, providing safe walkway illumination while showcasing the surrounding bushes, flowers, and seasonal plantings."
      },
      {
        title: 'System Maintenance',
        description: "The existing in-ground tree well lights received a full bulb swap to restore consistent warm output. We service and maintain previously installed systems — keeping your investment performing at its best."
      }
    ],
    results: "The brick arches now glow with warmth at dusk, revealing every detail of the masonry that makes this home one-of-a-kind. The path lights guide visitors safely through the landscaped beds, and the refreshed tree wells tie the whole scene together. A complete transformation built on precision, care, and respect for what was already there.",
    testimonial: {
      quote: "They didn't just install lights — they brought out details in our home we'd stopped noticing. The arches look incredible at night, and knowing they can maintain everything going forward gives us real peace of mind.",
      author: "Crestview Homeowners",
      role: "Homeowners"
    },
    galleryImages: [
      { src: '/projects/crestview_project/showcase_photo.jpeg', alt: 'Brick arch entrance with warm uplighting', category: 'after' },
      { src: '/projects/crestview_project/project_photo_1.jpeg', alt: 'Side facade with masonry uplighting and path lights', category: 'detail' },
      { src: '/projects/crestview_project/project_photo_2.jpeg', alt: 'Full property view with brick pathway', category: 'after' },
      { src: '/projects/crestview_project/project_photo_3.jpeg', alt: 'P14 path light detail in landscape bed', category: 'detail' },
      { src: '/projects/crestview_project/project_photo_4.jpeg', alt: 'Evening view along the brick walkway', category: 'after' }
    ]
  },
  'newton-ranch-style': {
    title: 'Newton Ranch Style Home',
    location: 'Newton, KS',
    date: 'Completed: 2024',
    coverImage: '/projects/newton_project/NEWTON1.jpeg',
    clientGoals: [
      'Enhance the classic ranch home architecture',
      'Create welcoming front entrance lighting',
      'Highlight landscaping and mature trees',
      'Improve safety for evening activities'
    ],
    overview: "This beautiful ranch-style home in Newton showcases classic Kansas architecture with clean horizontal lines and an inviting front yard. The homeowners wanted to enhance their home's natural charm while adding practical lighting for their active family.",
    challenge: "The challenge was illuminating the sprawling ranch layout while maintaining the home's understated elegance. The low-profile architecture required careful fixture placement to avoid overwhelming the design.",
    approach: "We developed a lighting plan that celebrated the ranch home's horizontal lines with strategic uplighting on key architectural features, complemented by pathway lighting and landscape accents that frame the property beautifully.",
    process: [
      {
        title: 'Architectural Emphasis',
        description: "Carefully positioned fixtures highlight the ranch home's horizontal rooflines and architectural details, creating depth and dimension that enhances the classic design."
      },
      {
        title: 'Landscape Integration',
        description: "Subtle uplighting on mature trees and shrubs creates a layered lighting effect that draws the eye across the property and frames the home perfectly."
      },
      {
        title: 'Welcoming Entry',
        description: "The front entrance received focused attention with warm lighting that creates an inviting atmosphere for family and guests while ensuring safe navigation."
      }
    ],
    results: "The transformation brings out the best of this ranch home's character. The low, horizontal architecture is beautifully emphasized, while the landscaping creates depth and visual interest. The family now enjoys their outdoor spaces well into the evening.",
    testimonial: {
      quote: "Our ranch home has never looked better! The lighting brings out details we didn't even notice before. It's both beautiful and practical for our family.",
      author: "Newton Homeowners",
      role: "Homeowners"
    },
    galleryImages: [
      { src: '/projects/newton_project/NEWTON1.jpeg', alt: 'Newton ranch home front view with architectural lighting', category: 'after' },
      { src: '/projects/newton_project/NEWTON2.jpeg', alt: 'Ranch home detail with landscape lighting', category: 'detail' },
      { src: '/projects/newton_project/NEWTON3.jpeg', alt: 'Front entrance with welcoming pathway lights', category: 'after' },
      { src: '/projects/newton_project/NEWTON4.jpeg', alt: 'Side view showing architectural emphasis', category: 'detail' },
      { src: '/projects/newton_project/NEWTON5.jpeg', alt: 'Evening view of illuminated landscaping', category: 'after' }
    ]
  },
  'auburn-hills-backyard': {
    title: 'Auburn Hills Backyard Lighting',
    location: 'Auburn Hills, Wichita',
    date: 'Completed: 2024',
    coverImage: '/projects/backyard_project/BACKYARD_1.jpeg',
    clientGoals: [
      'Illuminate the backyard for evening use',
      'Create security lighting for the back entrance',
      'Enhance outdoor entertaining spaces',
      'Provide safe navigation around the deck and patio'
    ],
    overview: "This Auburn Hills property needed a complete backyard lighting solution that would transform their outdoor space from an unused dark area into a functional, beautiful evening retreat. The focus was on the backdoor entrance and patio area.",
    challenge: "The backyard was completely dark after sunset, making it unusable and creating security concerns. The homeowners wanted to create ambiance for entertaining while ensuring the back entrance was well-lit and secure.",
    approach: "We designed a comprehensive backyard lighting system that layers security lighting with ambient illumination. The backdoor area received focused attention while the patio and landscape elements were highlighted to create an inviting outdoor room.",
    process: [
      {
        title: 'Security Lighting Focus',
        description: "The backdoor entrance and pathways received strategic lighting placement to eliminate dark spots and provide clear visibility for safe entry and exit."
      },
      {
        title: 'Entertainment Ambiance',
        description: "The patio and deck areas were enhanced with layered lighting that creates the perfect atmosphere for evening gatherings while remaining functional for everyday use."
      },
      {
        title: 'Landscape Accents',
        description: "Surrounding trees and garden beds received subtle uplighting to create depth and visual interest, extending the usable space feel throughout the backyard."
      }
    ],
    results: "The backyard transformation has completely changed how this family uses their outdoor space. What was once an afterthought is now their favorite gathering spot. The security lighting provides peace of mind while the ambient lighting creates a resort-like atmosphere perfect for entertaining.",
    testimonial: {
      quote: "We can't believe the difference! Our backyard went from dark and unused to our favorite place to spend evenings. The lighting makes us feel safe and creates such a beautiful atmosphere.",
      author: "Auburn Hills Family",
      role: "Homeowners"
    },
    galleryImages: [
      { src: '/projects/backyard_project/BACKYARD_1.jpeg', alt: 'Auburn Hills backyard with security lighting', category: 'after' },
      { src: '/projects/backyard_project/BACKYARD_2.jpeg', alt: 'Backdoor entrance with focused illumination', category: 'detail' },
      { src: '/projects/backyard_project/BACKYARD_3.jpeg', alt: 'Patio area with ambient lighting', category: 'after' },
      { src: '/projects/backyard_project/BACKYARD_4.jpeg', alt: 'Evening atmosphere with landscape accents', category: 'detail' },
      { src: '/projects/backyard_project/BACKYARD_5.jpeg', alt: 'Complete backyard transformation at night', category: 'after' }
    ]
  },
  'wichita-brick-facade': {
    title: 'Wichita Brick Facade Lighting',
    location: 'Wichita, KS',
    date: 'Completed: 2026',
    coverImage: '/projects/new_project/IMG_3955.webp',
    clientGoals: [
      'Bring out the texture and warmth of the brick exterior',
      'Create a polished street view after dusk',
      'Highlight young trees and landscape beds without overpowering the home',
      'Keep the front approach welcoming and natural'
    ],
    overview: "This Wichita brick home already had strong curb appeal during the day. The lighting plan was designed to carry that same presence into the evening, using warm architectural accents to reveal the brick texture, shape the front elevation, and tie the landscape into the home.",
    challenge: "The wide facade needed enough light to feel balanced from the street without flattening the brickwork or creating glare near the windows. The young trees and foundation plantings also needed subtle emphasis so the finished scene felt layered instead of spotlit.",
    approach: "We used warm uplighting across the brick facade and landscape beds, placing fixtures to catch the masonry texture and draw attention to the front elevation. Accent lighting on the trees adds vertical depth while keeping the overall scene soft and residential.",
    process: [
      {
        title: 'Facade Uplighting',
        description: "Warm fixtures were positioned to graze the brick and bring out the home's natural texture after sunset."
      },
      {
        title: 'Landscape Accents',
        description: "Tree and bed lighting adds depth across the front yard while keeping the composition balanced from the street."
      },
      {
        title: 'Final Aiming',
        description: "The system was adjusted at dusk so each beam supported the overall scene without glare or harsh hot spots."
      }
    ],
    results: "The home now has a clean, welcoming evening presence. The brick facade reads with more depth, the landscaping feels intentional, and the warm lighting gives the property a finished look from the street.",
    testimonial: {
      quote: "The front of the home feels completely different at night now. The lighting is warm, clean, and makes the brick stand out beautifully.",
      author: "Wichita Homeowners",
      role: "Homeowners"
    },
    galleryImages: [
      { src: '/projects/new_project/IMG_3955.webp', alt: 'Wichita brick home with warm architectural uplighting', category: 'after' }
    ]
  },
  'oak-creek-project': {
    title: 'Oak Creek Front Yard Lighting',
    location: 'Wichita, KS',
    date: '2026',
    coverImage: '/projects/oak_creek_project/IMG_3956.jpeg',
    clientGoals: [
      'Transform a dark front yard into a warmer and more welcoming entry',
      'Highlight the brick exterior, peaks, windows, columns, and landscape beds',
      'Add height and balance with discreet in-ground tree well lights',
      'Keep the lighting elegant, natural, and not overpowering'
    ],
    overview: "For this Oak Creek project, Lume Outdoor Lighting transformed a front yard that had very little nighttime presence. The design uses warm architectural lighting across the home and landscape so the property feels brighter, more finished, and more welcoming after sunset.",
    challenge: "Before the install, the front yard and home were very dark at night with no soffit lighting or existing accent lighting to bring out the property's features. The design needed to add curb appeal and definition while still feeling natural from the street.",
    approach: "We installed architectural uplighting across the front of the home using V1 spotlights to highlight the brick exterior, peaks, windows, columns, and landscape beds. In-ground well lights were added for the mature front yard trees, and landscape spotlights were used to accent key plantings near the entry.",
    process: [
      {
        title: 'Architectural Uplighting',
        description: "V1 spotlights were aimed across the brick exterior, peaks, windows, and columns to create depth and a more polished evening view."
      },
      {
        title: 'Tree Well Lights',
        description: "In-ground well lights were added around mature front yard trees to create height and balance while keeping the fixtures clean and discreet during the day."
      },
      {
        title: 'Landscape Accents',
        description: "Spotlights in the landscape beds bring attention to key plants, including the Japanese maple, and give the front entry a softer finished look."
      }
    ],
    results: "The final result is a front yard that feels warmer, brighter, and more welcoming. The brick exterior has more depth, the trees add vertical balance, and the landscape beds now support the home with a natural, elegant glow.",
    testimonial: {
      quote: "The front yard feels warmer, brighter, and more welcoming while still keeping the lighting natural and elegant.",
      author: "Oak Creek Project",
      role: "Project Notes"
    },
    galleryImages: [
      { src: '/projects/oak_creek_project/IMG_3952.jpeg', alt: 'Oak Creek front yard architectural uplighting', category: 'after' },
      { src: '/projects/oak_creek_project/IMG_3955.jpeg', alt: 'Oak Creek home with warm brick facade lighting', category: 'after' },
      { src: '/projects/oak_creek_project/IMG_3956.jpeg', alt: 'Oak Creek wide front yard lighting view', category: 'after' },
      { src: '/projects/oak_creek_project/IMG_3965.jpeg', alt: 'Oak Creek landscape and entry lighting detail', category: 'detail' },
      { src: '/projects/oak_creek_project/IMG_3966.jpeg', alt: 'Oak Creek tree and planting accent lighting', category: 'detail' },
      { src: '/projects/oak_creek_project/IMG_3967.jpeg', alt: 'Oak Creek front entry warm lighting detail', category: 'detail' }
    ]
  },
  'reeds-cove-project': {
    title: 'Reeds Cove Outdoor Lighting',
    location: 'Wichita, KS',
    date: '2026',
    coverImage: '/projects/reeds_cove_project/IMG_5410.jpeg',
    clientGoals: [
      'Improve front curb appeal with warm architectural lighting',
      'Make the backyard, pool area, and walkways safer at night',
      'Add soft landscape lighting around the pool and outdoor living areas',
      'Guide movement from the pool and backyard back to the home'
    ],
    overview: "This Reeds Cove project included a full front and backyard lighting system designed to improve curb appeal, safety, and nighttime usability. The lighting plan connects the front architecture, trees, pool area, walkways, deck steps, and landscape beds into one cohesive evening scene.",
    challenge: "The property needed lighting that could do two jobs at once: create a polished front elevation from the street and make the backyard more usable around the pool, walkways, and deck steps. The system also needed to stay warm and inviting instead of overpowering the outdoor living areas.",
    approach: "We used V2 integrated uplights on the home to highlight the brick exterior, rooflines, columns, and landscape beds. In-ground well lights add height through the trees, P14 path lights improve visibility around walkways and pool sidewalks, mini wash lights soften the poolside landscape, and deck lights guide the steps back into the home.",
    process: [
      {
        title: 'Front Yard Architecture',
        description: "V2 integrated uplights were placed on the home to highlight brick, architectural features, rooflines, columns, and landscape beds."
      },
      {
        title: 'Tree And Path Lighting',
        description: "In-ground well lights add dramatic tree lighting while P14 path lights improve safety along walkways, pool sidewalks, and outdoor living areas."
      },
      {
        title: 'Pool And Deck Details',
        description: "Mini wash lights softly illuminate poolside bushes and landscape beds, while deck step lights help guide homeowners safely from the backyard back into the home."
      }
    ],
    results: "The finished property feels safer, more inviting, and more enjoyable after dark. Warm lighting enhances the front curb appeal, backyard pool area, landscaping, and outdoor living spaces without overpowering the setting.",
    testimonial: {
      quote: "The property feels safer, more inviting, and more enjoyable after dark with warm lighting across the front curb appeal, pool area, landscaping, and outdoor living spaces.",
      author: "Reeds Cove Project",
      role: "Project Notes"
    },
    galleryImages: [
      { src: '/projects/reeds_cove_project/IMG_5410.jpeg', alt: 'Reeds Cove home with full outdoor lighting system', category: 'after' },
      { src: '/projects/reeds_cove_project/IMG_5403.jpeg', alt: 'Reeds Cove front architecture with warm uplighting', category: 'after' },
      { src: '/projects/reeds_cove_project/IMG_5399.jpeg', alt: 'Reeds Cove front yard lighting and tree accents', category: 'after' },
      { src: '/projects/reeds_cove_project/IMG_5398.jpeg', alt: 'Reeds Cove landscape lighting around the home', category: 'detail' },
      { src: '/projects/reeds_cove_project/IMG_5393.jpeg', alt: 'Reeds Cove poolside path and landscape lighting', category: 'after' },
      { src: '/projects/reeds_cove_project/IMG_4615.jpeg', alt: 'Reeds Cove backyard lighting near pool walkways', category: 'after' },
      { src: '/projects/reeds_cove_project/IMG_5391.jpeg', alt: 'Reeds Cove path lighting through outdoor living area', category: 'detail' },
      { src: '/projects/reeds_cove_project/IMG_4611.jpeg', alt: 'Reeds Cove deck and backyard lighting detail', category: 'detail' },
      { src: '/projects/reeds_cove_project/IMG_4610.jpeg', alt: 'Reeds Cove deck step lighting and landscape accents', category: 'detail' },
      { src: '/projects/reeds_cove_project/IMG_5381.jpeg', alt: 'Reeds Cove wide backyard outdoor lighting view', category: 'after' }
    ]
  },
  'suburban-estate': {
    title: 'Suburban Estate',
    location: 'City View Street, Wichita',
    date: 'Completed: 2024',
    coverImage: "/projects/SamProject/drakes-home-10.jpg",
    clientGoals: [
      'Create a welcoming glow for guests',
      'Provide extra peace of mind with security lighting',
      'Highlight the beautiful brick architecture',
      'Ensure safe navigation along walkways'
    ],
    overview: "Sam's 2016 brick home on City View Street used to disappear once the sun went down. The entryway was pitch-black, the walkway felt sketchy, and those rich red bricks—one of the house's best features—were completely lost at night.",
    challenge: "The main challenge was transforming a completely dark property into a welcoming, safe environment while showcasing the home's beautiful brick architecture that was invisible after sunset.",
    approach: "We designed a simple but powerful plan: four warm-white uplights to make the brick pop, four path lights to guide every step to the door, and two discreet tree spots to frame the whole scene from the street.",
    process: [
      {
        title: 'Strategic Uplighting',
        description: "Four warm-white uplights were carefully positioned to graze the brick facade, bringing out the rich texture and color of the red bricks that define this home's character."
      },
      {
        title: 'Path Illumination',
        description: "Four path lights were installed along the walkway, providing safe navigation from the street to the front door while maintaining an elegant appearance."
      },
      {
        title: 'Landscape Framing',
        description: "Two discreet tree spotlights were added to frame the property from the street view, creating depth and visual interest in the front yard."
      }
    ],
    results: "Installation took just one day—trenches cut, cables buried, lawn restored so neatly you'd never know we'd been there. As dusk fell, we walked the property with Sam, nudging beam angles until every brick line and flower bed landed in perfect, 2700K light. When the neighborhood lights came on, her house stole the show.",
    testimonial: {
      quote: "You guys knocked it out of the park! To say we love the outcome is an understatement. Thank you for helping us see our home in a new light! We love it!",
      author: "Sam Lucciarini",
      role: "Homeowner"
    },
    galleryImages: [
      { src: "/projects/SamProject/drakes-home-04.jpg", alt: 'Illuminated brick facade with warm uplighting', category: 'after' },
      { src: "/projects/SamProject/drakes-home-05.jpg", alt: 'Path lighting leading to entrance', category: 'detail' },
      { src: "/projects/SamProject/drakes-home-08.jpg", alt: 'Architectural lighting highlighting home features', category: 'after' },
      { src: "/projects/SamProject/drakes-home-09.jpg", alt: 'Tree uplighting creating depth', category: 'detail' },
      { src: "/projects/SamProject/drakes-home-10.jpg", alt: 'Complete property transformation at night', category: 'after' }
    ]
  }
};

// Testimonials data for Testimonials component
export const testimonials = [
  {
    id: 1,
    name: "Samantha L.",
    location: "City View Street, Wichita",
    rating: 5,
    text: "Lume Outdoor completely transformed our home's curb appeal. Their design sense is impeccable, and the quality of the lighting has exceeded our expectations. Our home now has a warm, inviting glow every evening. The team was professional and the process was seamless.",
    project: "Brick Home Transformation"
  },
  {
    id: 2,
    name: "John & Maria R.",
    location: "Eastborough, Wichita",
    rating: 5,
    text: "The architectural lighting Lume installed has added a new dimension to our property. The subtle, elegant illumination highlights the unique features of our home beautifully. We are thrilled with the result and have received numerous compliments from our neighbors.",
    project: "Modern Architectural Highlight"
  },
  {
    id: 3,
    name: "Mike Thompson",
    location: "Andover, KS",
    rating: 5,
    text: "Wife wanted the backyard done up for years and I kept putting it off. Glad I finally called Lume — the patio looks incredible at night now. We're out there grilling and hanging out way more than we used to. Buddies can't believe it's the same yard.",
    project: "Patio & Garden Oasis"
  }
];

// Services data for ServicesGrid component
// Note: Icons should be imported from imageConfig when used
export const services = [
  {
    id: "residential-landscape",
    title: "Residential Landscape",
    iconKey: 'residential', // Key for useImage hook
    slug: "/residential-landscape",
    description: "Transform your home's outdoor spaces"
  },
  {
    id: "commercial-lighting",
    title: "Commercial Lighting", 
    iconKey: 'commercial', // Key for useImage hook
    slug: "/commercial-lighting",
    description: "Professional business illumination"
  },
  {
    id: "pathway-lighting",
    title: "Pathway Lighting",
    iconKey: 'pathway', // Key for useImage hook
    slug: "/pathway-lighting",
    description: "Safe and beautiful walkways"
  },
  {
    id: "security-lighting",
    title: "Security Lighting",
    iconKey: 'security', // Key for useImage hook
    slug: "/security-lighting", 
    description: "Enhanced safety and protection"
  },
  {
    id: "deck-patio",
    title: "Deck & Patio",
    iconKey: 'deckPatio', // Key for useImage hook
    slug: "/deck-patio",
    description: "Perfect outdoor entertaining spaces"
  },
  {
    id: "architectural",
    title: "Architectural Lighting",
    iconKey: 'architectural', // Key for useImage hook
    slug: "/architectural", 
    description: "Highlight your building's features"
  },
  {
    id: "pool-water",
    title: "Pool & Water Features",
    iconKey: 'poolWater', // Key for useImage hook
    slug: "/pool-water",
    description: "Stunning aquatic illumination"
  },
  {
    id: "holiday-lighting",
    title: "Holiday Lighting",
    iconKey: 'holiday', // Key for useImage hook
    slug: "/holiday-lighting",
    description: "Seasonal decorative displays"
  }
];

// Service details data for ServicePage component
export const serviceData = {
  'residential-landscape': {
    title: 'Residential Landscape Lighting',
    subtitle: 'Transform your outdoor living spaces with elegant illumination',
    description: 'Our residential landscape lighting services enhance the beauty and functionality of your property while providing safety and security. We specialize in creating custom lighting designs that highlight your home\'s best features.',
    heroImage: '/servicesphotos/outside.jpg',
    benefits: [
      'Enhanced curb appeal and property value',
      'Improved safety for walkways and entrances',
      'Extended outdoor living hours',
      'Energy-efficient LED solutions',
      'Smart control systems for convenience',
      'Professional design and installation'
    ],
    process: [
      'Free consultation and property assessment',
      'Custom lighting design presentation',
      'Professional installation by certified technicians',
      'System testing and optimization',
      'Training on system operation',
      'Ongoing maintenance and support'
    ]
  },
  'commercial-lighting': {
    title: 'Commercial Lighting Solutions',
    subtitle: 'Professional lighting systems for businesses and properties',
    description: 'Our commercial lighting services provide businesses with attractive, functional, and energy-efficient outdoor lighting solutions. We understand the importance of creating the right impression while ensuring safety and security.',
    heroImage: '/servicesphotos/Commercial Lighting.png',
    benefits: [
      'Attract customers with appealing exterior lighting',
      'Reduce liability with proper illumination',
      'Lower energy costs with LED technology',
      'Comply with local lighting codes',
      'Enhance brand visibility at night',
      'Minimize maintenance requirements'
    ],
    process: [
      'Site evaluation and lighting audit',
      'Energy efficiency analysis',
      'Custom commercial lighting design',
      'Professional installation with minimal disruption',
      'Compliance verification',
      'Maintenance planning and support'
    ]
  },
  'pathway-lighting': {
    title: 'Pathway & Walkway Lighting',
    subtitle: 'Safe and beautiful illumination for all pedestrian areas',
    description: 'Our pathway lighting solutions combine safety with elegance, ensuring your walkways, driveways, and outdoor paths are beautifully illuminated while preventing trips and falls.',
    heroImage: '/servicesphotos/pathwaylighting.png',
    benefits: [
      'Prevent accidents with proper visibility',
      'Guide guests safely to entrances',
      'Enhance landscape design at night',
      'Durable fixtures for all weather conditions',
      'Low-voltage systems for efficiency',
      'Minimal maintenance requirements'
    ],
    process: [
      'Walkway safety assessment',
      'Fixture style selection',
      'Strategic placement planning',
      'Professional installation',
      'Brightness optimization',
      'Seasonal adjustment guidance'
    ]
  },
  'security-lighting': {
    title: 'Security & Safety Lighting',
    subtitle: 'Protect your property with strategic illumination',
    description: 'Our security lighting solutions provide peace of mind by deterring intruders and ensuring safe navigation around your property. We design systems that balance security needs with aesthetic appeal.',
    heroImage: '/servicesphotos/securitylighting.png',
    benefits: [
      'Deter criminal activity effectively',
      'Eliminate dark hiding spots',
      'Motion-activated options available',
      'Integration with security systems',
      'Energy-efficient operation',
      'Reduced insurance premiums'
    ],
    process: [
      'Security vulnerability assessment',
      'Strategic lighting plan development',
      'Motion sensor placement optimization',
      'Professional installation',
      'System integration and testing',
      'Security protocol training'
    ]
  },
  'deck-patio': {
    title: 'Deck & Patio Lighting',
    subtitle: 'Extend your outdoor living into the evening hours',
    description: 'Transform your deck or patio into an inviting outdoor room with our custom lighting solutions. We create the perfect ambiance for entertaining while ensuring safety and functionality.',
    heroImage: '/servicesphotos/deck&patio.jpg',
    benefits: [
      'Create inviting entertainment spaces',
      'Ensure safety on stairs and edges',
      'Highlight architectural features',
      'Weather-resistant fixtures',
      'Dimmable options for ambiance',
      'Increase usable outdoor hours'
    ],
    process: [
      'Deck/patio layout assessment',
      'Entertainment needs analysis',
      'Custom lighting design',
      'Weather-resistant installation',
      'Dimmer control setup',
      'Seasonal maintenance planning'
    ]
  },
  'architectural': {
    title: 'Architectural Lighting',
    subtitle: 'Showcase your home\'s unique architectural features',
    description: 'Our architectural lighting services highlight the distinctive elements of your home\'s design. From columns and arches to texture and materials, we create dramatic effects that enhance your property\'s character.',
    heroImage: '/servicesphotos/architect.tif',
    benefits: [
      'Emphasize architectural details',
      'Create dramatic shadow effects',
      'Enhance texture and materials',
      'Increase nighttime curb appeal',
      'Complement interior lighting',
      'Energy-efficient LED options'
    ],
    process: [
      'Architectural feature inventory',
      'Lighting angle determination',
      'Fixture selection and placement',
      'Professional installation',
      'Effect fine-tuning',
      'Seasonal adjustment planning'
    ]
  },
  'pool-water': {
    title: 'Pool & Water Feature Lighting',
    subtitle: 'Create magical aquatic environments after dark',
    description: 'Our pool and water feature lighting transforms your aquatic areas into stunning nighttime focal points. We specialize in underwater lighting, fountain illumination, and poolside ambiance.',
    heroImage: '/servicesphotos/poolandspa.jpg',
    benefits: [
      'Extend pool usage hours safely',
      'Create stunning visual effects',
      'Color-changing options available',
      'Energy-efficient LED technology',
      'Fully waterproof fixtures',
      'Enhanced pool area safety'
    ],
    process: [
      'Pool area safety evaluation',
      'Water feature assessment',
      'Underwater fixture planning',
      'Professional waterproof installation',
      'Color programming setup',
      'Maintenance schedule creation'
    ]
  },
  'holiday-lighting': {
    title: 'Holiday & Event Lighting',
    subtitle: 'Professional seasonal lighting installation and removal',
    description: 'Let us handle your holiday lighting needs with our professional installation services. From elegant white lights to colorful displays, we create festive atmospheres while ensuring safety and reliability.',
    heroImage: '/servicesphotos/holiday.png',
    benefits: [
      'Professional design and installation',
      'Safe, insured installation team',
      'Custom displays for any holiday',
      'Storage and maintenance included',
      'Energy-efficient LED options',
      'Hassle-free removal service'
    ],
    process: [
      'Holiday lighting consultation',
      'Custom design creation',
      'Professional installation',
      'Season-long maintenance',
      'Post-season removal',
      'Safe storage until next year'
    ]
  }
};
