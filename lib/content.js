// Centralized content management for Lume Outdoor website
// This file contains all static content that can be easily updated

// Projects data for PreviousWorkShowcase component
export const projects = [
  {
    id: 'suburban-estate',
    title: "Suburban Estate",
    location: 'City View Street, Wichita',
    description: 'Transformed a 2016 brick home from pitch-black to picture-perfect with strategic uplighting, path illumination, and architectural accents.',
    image: "/SamProject/Drake's Home-04 (1).jpg",
    tags: ['Residential', 'Brick Home', 'Path Lighting'],
    featured: true
  },
  {
    id: 'wichita-traditional-home',
    title: 'The Millers\' Traditional Home',
    location: 'College Hill, Wichita',
    description: 'Transformed a beautiful traditional home with strategic uplighting, driveway illumination, and architectural accents that respect the home\'s classic character.',
    image: '/Project2.png',
    tags: ['Residential', 'Traditional', 'Driveway Lighting'],
    showOnHomePage: false
  },
  {
    id: 'augusta-prairie-estate',
    title: 'Prairie Style Estate',
    location: 'Augusta, KS',
    description: 'Dark-sky friendly lighting design celebrating prairie architecture and native Kansas landscape while preserving stunning night sky views.',
    image: '/3rdProject.png',
    tags: ['Residential', 'Dark Sky', 'Native Landscape'],
    showOnHomePage: false
  },
  {
    id: 'newton-ranch-style',
    title: 'Newton Ranch Style Home',
    location: 'Newton, KS',
    description: 'Classic ranch home enhanced with modern lighting that highlights architectural lines and creates inviting outdoor spaces for the whole family.',
    image: '/projects/NEWTON1.jpeg',
    tags: ['Residential', 'Ranch Home', 'Architectural']
  },
  {
    id: 'auburn-hills-backyard',
    title: 'Auburn Hills Backyard Lighting',
    location: 'Auburn Hills, Wichita',
    description: 'Stunning backyard transformation with strategic backdoor lighting for security and ambiance, perfect for evening entertaining and safe navigation.',
    image: '/projects/BACKYARD_1.jpeg',
    tags: ['Residential', 'Backyard', 'Security Lighting']
  }
];

// Project details for ProjectDetailPage component
export const projectDetails = {
  'suburban-estate': {
    title: "Suburban Estate",
    location: 'City View Street, Wichita',
    date: 'Completed: 2024',
    coverImage: "/SamProject/Drake's Home-10.jpg",
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
      quote: "You guys knocked it out of the park! To say we love the outcome is an understatement. Thank you for helping us see our home in a new light! We love it 😍",
      author: "Sam Lucciarini",
      role: "Homeowner"
    },
    galleryImages: [
      { src: "/SamProject/Drake's Home-04 (1).jpg", alt: 'Illuminated brick facade with warm uplighting', category: 'after' },
      { src: "/SamProject/Drake's Home-05 (2).jpg", alt: 'Path lighting leading to entrance', category: 'detail' },
      { src: "/SamProject/Drake's Home-08 (1).jpg", alt: 'Architectural lighting highlighting home features', category: 'after' },
      { src: "/SamProject/Drake's Home-09 (1).jpg", alt: 'Tree uplighting creating depth', category: 'detail' },
      { src: "/SamProject/Drake's Home-10.jpg", alt: 'Complete property transformation at night', category: 'after' }
    ]
  },
  'wichita-modern-ranch': {
    title: 'Modern Ranch Retreat',
    location: 'Wichita, KS',
    date: 'Completed: September 2023',
    coverImage: '/placeholder.jpg',
    clientGoals: [
      'Create dramatic entrance lighting for the modern ranch facade',
      'Illuminate the expansive front yard and mature trees',
      'Provide security lighting for the long driveway',
      'Highlight the horizontal lines of the modern architecture'
    ],
    overview: "This stunning modern ranch home in Wichita showcased clean lines and expansive glass windows that called for sophisticated lighting design. The homeowners wanted to enhance their property's contemporary aesthetic while ensuring practical illumination for their large lot.",
    challenge: "The property's sprawling layout and modern architecture required a delicate balance between dramatic accent lighting and functional security lighting. The challenge was to create visual interest across the large facade without over-illuminating the interior through the expansive windows.",
    approach: "We developed a layered lighting approach that combined architectural accent lighting with landscape illumination. Special attention was paid to controlling light spill while creating dramatic effects that complemented the home's modern design.",
    process: [
      {
        title: 'Architectural Analysis',
        description: "We studied the home's horizontal lines and geometric features to develop a lighting plan that would enhance the modern aesthetic. Linear LED fixtures were selected to echo the architecture's clean lines."
      },
      {
        title: 'Tree Uplighting Design',
        description: "The mature oak trees received custom uplighting to create dramatic silhouettes against the night sky, adding depth and dimension to the front yard landscape."
      },
      {
        title: 'Smart Integration',
        description: "A smart lighting control system was integrated with the home's existing automation, allowing scene setting and scheduling through their preferred home control app."
      }
    ],
    results: "The lighting transformation turned this modern ranch into a striking nighttime showcase. The horizontal architecture is beautifully emphasized with linear lighting, while the illuminated trees create a dramatic backdrop. The driveway and entrance are now safely lit without compromising the sophisticated aesthetic.",
    testimonial: {
      quote: "The lighting design perfectly captures the modern spirit of our home. We love how it looks like an art installation at night while still being completely functional.",
      author: "The Mitchell Family",
      role: "Homeowners"
    },
    galleryImages: [
      {
        src: '/placeholder.jpg',
        alt: 'Modern ranch home with architectural lighting',
        caption: 'Linear lighting emphasizes the horizontal architecture'
      }
    ]
  },
  'wichita-traditional-home': {
    title: 'The Millers\' Traditional Home',
    location: 'College Hill, Wichita',
    date: 'Completed: November 2023',
    coverImage: '/Project2.png',
    clientGoals: [
      'Enhance curb appeal for their traditional two-story home',
      'Create safe, welcoming driveway and walkway lighting',
      'Highlight architectural features without overwhelming the neighborhood',
      'Provide security lighting that maintains the home\'s charm'
    ],
    overview: "The Miller family reached out to us after seeing Sam's transformation down the street. Their beautiful traditional home in College Hill had great bones but completely disappeared after sunset. With teenage kids coming home late from activities and frequent dinner parties, they needed both safety and style.",
    challenge: "The main challenge was creating enough light for safety while respecting the quiet elegance of this established neighborhood. The Millers wanted their home to feel welcoming, not like a commercial property. Drake immediately recognized the need to highlight the home's classic lines while Talan focused on the practical aspects of driveway safety.",
    approach: "We designed a subtle yet effective lighting plan that would make the Millers feel proud every time they pulled into their driveway. Using our signature warm 2700K fixtures, we created layers of light that guide visitors from the street to the front door while showcasing the home's traditional architecture.",
    process: [
      {
        title: 'Driveway Path Lighting',
        description: "We installed low-profile path lights along both sides of the driveway, creating a runway effect that makes coming home feel special. Each fixture was carefully angled to avoid glare while providing ample illumination."
      },
      {
        title: 'Architectural Uplighting',
        description: "Subtle uplights were placed to graze the home's facade, highlighting the texture of the siding and creating gentle shadows that add depth. The garage coach lights were positioned to complement, not compete with, our lighting design."
      },
      {
        title: 'Walkway and Entry Focus',
        description: "We paid special attention to the walkway from the driveway to the front door, ensuring every step is safely lit. The entry received focused lighting to create a warm, welcoming glow that makes guests feel expected."
      }
    ],
    results: "The transformation took just one day, with Drake and Talan personally overseeing every detail. As the sun set on installation day, the Millers couldn't believe their eyes. Their home now has incredible curb appeal, the driveway feels safe and inviting, and neighbors have been stopping by asking for our card. Mrs. Miller loves how the lights make coming home from her evening book club feel magical.",
    testimonial: {
      quote: "Drake and Talan turned our house into a home that glows with warmth. Our teenagers actually comment on how cool it looks, and that's saying something! The whole process was so smooth, and these guys really care about getting every detail right.",
      author: "The Miller Family",
      role: "Homeowners"
    },
    galleryImages: []
  },
  'augusta-prairie-estate': {
    title: 'Prairie Style Estate',
    location: 'Augusta, KS',
    date: 'Completed: October 2023',
    coverImage: '/3rdProject.png',
    clientGoals: [
      'Highlight the prairie-style architectural elements',
      'Illuminate the native Kansas landscape design',
      'Create safe lighting for the rural property',
      'Emphasize the connection between home and landscape'
    ],
    overview: "This breathtaking prairie-style home in Augusta sits on 5 acres of beautifully landscaped property featuring native Kansas plants and grasses. The homeowners wanted lighting that would celebrate both the architecture and the natural landscape.",
    challenge: "The rural setting meant dealing with very dark conditions while being mindful of light pollution. The challenge was to provide adequate illumination for safety and beauty while preserving the starry night sky that the homeowners cherished.",
    approach: "We designed a dark-sky friendly lighting system that provided necessary illumination while minimizing upward light spillage. Native landscape areas received subtle accent lighting to highlight the natural beauty without overwhelming it.",
    process: [
      {
        title: 'Dark Sky Consultation',
        description: "We worked with dark sky principles to select fully shielded fixtures that direct light downward, preserving the rural night sky while providing excellent visibility."
      },
      {
        title: 'Native Landscape Lighting',
        description: "Specialized fixtures were chosen to highlight the native prairie grasses and wildflower gardens, creating depth and texture in the landscape."
      },
      {
        title: 'Architectural Integration',
        description: "Low-profile fixtures were integrated into the prairie-style architecture, emphasizing the horizontal lines and natural materials without dominating the design."
      }
    ],
    results: "The lighting design successfully merged the home with its prairie landscape setting. The dark-sky compliant fixtures provide beautiful illumination while preserving the stunning night sky views. The native gardens glow softly at night, creating a magical atmosphere that changes with the seasons.",
    testimonial: {
      quote: "We can still see the Milky Way from our patio, but now we can also safely walk our property and enjoy our gardens at night. It's the perfect balance.",
      author: "The Thompson Family",
      role: "Homeowners"
    },
    galleryImages: [
      {
        src: '/placeholder.jpg',
        alt: 'Prairie home with dark-sky friendly lighting',
        caption: 'Dark-sky compliant fixtures preserve the night sky views'
      }
    ]
  },
  'newton-ranch-style': {
    title: 'Newton Ranch Style Home',
    location: 'Newton, KS',
    date: 'Completed: 2024',
    coverImage: '/projects/NEWTON1.jpeg',
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
      { src: '/projects/NEWTON1.jpeg', alt: 'Newton ranch home front view with architectural lighting', category: 'after' },
      { src: '/projects/NEWTON2.jpeg', alt: 'Ranch home detail with landscape lighting', category: 'detail' },
      { src: '/projects/NEWTON3.jpeg', alt: 'Front entrance with welcoming pathway lights', category: 'after' },
      { src: '/projects/NEWTON4.jpeg', alt: 'Side view showing architectural emphasis', category: 'detail' },
      { src: '/projects/NEWTON5.jpeg', alt: 'Evening view of illuminated landscaping', category: 'after' }
    ]
  },
  'auburn-hills-backyard': {
    title: 'Auburn Hills Backyard Lighting',
    location: 'Auburn Hills, Wichita',
    date: 'Completed: 2024',
    coverImage: '/projects/BACKYARD_1.jpeg',
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
      { src: '/projects/BACKYARD_1.jpeg', alt: 'Auburn Hills backyard with security lighting', category: 'after' },
      { src: '/projects/BACKYARD_2.jpeg', alt: 'Backdoor entrance with focused illumination', category: 'detail' },
      { src: '/projects/BACKYARD_3.jpeg', alt: 'Patio area with ambient lighting', category: 'after' },
      { src: '/projects/BACKYARD_4.jpeg', alt: 'Evening atmosphere with landscape accents', category: 'detail' },
      { src: '/projects/BACKYARD_5.jpeg', alt: 'Complete backyard transformation at night', category: 'after' }
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
    name: "David Chen",
    location: "Andover, KS",
    rating: 5,
    text: "Our backyard and patio have become our favorite part of our home, thanks to Lume. The landscape lighting has created a magical resort-like atmosphere. It's perfect for entertaining guests or simply relaxing after a long day. A fantastic investment.",
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