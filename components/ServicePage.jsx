'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { useImage } from '@/lib/imageConfig';
import { 
  getServiceHeroImage, 
  getServiceGalleryImages, 
  getServiceFeatureImages,
  serviceImageConfig,
  fallbackImages,
  checkImageExists 
} from '@/lib/serviceImages';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Feature Card Component
function FeatureCard({ feature, serviceSlug, index }) {
  const [imageSrc, setImageSrc] = useState(fallbackImages.feature);
  const fallbackImage = useImage('products', feature.image);
  
  useEffect(() => {
    const checkFeatureImage = async () => {
      const serviceFeatureImage = getServiceFeatureImages(serviceSlug, 4)[index];
      const exists = await checkImageExists(serviceFeatureImage);
      if (exists) {
        setImageSrc(serviceFeatureImage);
      } else {
        // Fallback to existing image system if available
        setImageSrc(fallbackImage || fallbackImages.feature);
      }
    };
    
    checkFeatureImage();
  }, [serviceSlug, index, feature.image, fallbackImage]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={imageSrc} 
          alt={feature.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </div>
  );
}

const serviceData = {
  'residential-landscape': {
    title: 'Residential Landscape Lighting',
    subtitle: 'Transform your outdoor living spaces with elegant illumination',
    description: 'Our residential landscape lighting services enhance the beauty and functionality of your property while providing safety and security. We specialize in creating custom lighting designs that highlight your home\'s best features.',
    heroImage: 'hero',
    benefits: [
      'Enhanced curb appeal and property value',
      'Improved safety for walkways and entrances',
      'Extended outdoor living hours',
      'Energy-efficient LED solutions',
      'Smart control systems for convenience',
      'Professional design and installation'
    ],
    features: [
      {
        title: 'Path & Walkway Lighting',
        description: 'Safe, elegant illumination for all pedestrian areas',
        image: 'pathLight'
      },
      {
        title: 'Garden & Plant Lighting',
        description: 'Showcase your landscaping with artistic accent lighting',
        image: 'floorLight'
      },
      {
        title: 'Tree & Architectural Uplighting',
        description: 'Create dramatic effects with strategic uplighting',
        image: 'wallWasherLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Attract customers with appealing exterior lighting',
      'Reduce liability with proper illumination',
      'Lower energy costs with LED technology',
      'Comply with local lighting codes',
      'Enhance brand visibility at night',
      'Minimize maintenance requirements'
    ],
    features: [
      {
        title: 'Parking Lot Lighting',
        description: 'Bright, efficient lighting for safety and visibility',
        image: 'floorLight'
      },
      {
        title: 'Building Facade Lighting',
        description: 'Highlight architectural features and signage',
        image: 'wallWasherLight'
      },
      {
        title: 'Landscape & Entrance Lighting',
        description: 'Create welcoming entrances for customers',
        image: 'pathLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Prevent accidents with proper visibility',
      'Guide guests safely to entrances',
      'Enhance landscape design at night',
      'Durable fixtures for all weather conditions',
      'Low-voltage systems for efficiency',
      'Minimal maintenance requirements'
    ],
    features: [
      {
        title: 'Traditional Path Lights',
        description: 'Classic fixtures for timeless appeal',
        image: 'pathLight'
      },
      {
        title: 'Modern LED Bollards',
        description: 'Contemporary designs with efficient lighting',
        image: 'walkWayLight'
      },
      {
        title: 'Recessed Step Lights',
        description: 'Subtle illumination for stairs and edges',
        image: 'deckLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Deter criminal activity effectively',
      'Eliminate dark hiding spots',
      'Motion-activated options available',
      'Integration with security systems',
      'Energy-efficient operation',
      'Reduced insurance premiums'
    ],
    features: [
      {
        title: 'Motion Sensor Lighting',
        description: 'Automatic activation for enhanced security',
        image: 'floorLight'
      },
      {
        title: 'Perimeter Lighting',
        description: 'Complete coverage of property boundaries',
        image: 'wallWasherLight'
      },
      {
        title: 'Entry Point Illumination',
        description: 'Bright lighting for doors and windows',
        image: 'pathLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Create inviting entertainment spaces',
      'Ensure safety on stairs and edges',
      'Highlight architectural features',
      'Weather-resistant fixtures',
      'Dimmable options for ambiance',
      'Increase usable outdoor hours'
    ],
    features: [
      {
        title: 'Deck Post Cap Lights',
        description: 'Elegant lighting for railing posts',
        image: 'deckLight'
      },
      {
        title: 'Under-Rail LED Strips',
        description: 'Subtle illumination for modern appeal',
        image: 'floorLight'
      },
      {
        title: 'Stair & Step Lighting',
        description: 'Safety lighting for elevation changes',
        image: 'walkWayLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Emphasize architectural details',
      'Create dramatic shadow effects',
      'Enhance texture and materials',
      'Increase nighttime curb appeal',
      'Complement interior lighting',
      'Energy-efficient LED options'
    ],
    features: [
      {
        title: 'Facade Uplighting',
        description: 'Dramatic illumination of exterior walls',
        image: 'wallWasherLight'
      },
      {
        title: 'Column & Pillar Lighting',
        description: 'Accent lighting for vertical elements',
        image: 'floorLight'
      },
      {
        title: 'Roofline & Eave Lighting',
        description: 'Define your home\'s silhouette at night',
        image: 'pathLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Extend pool usage hours safely',
      'Create stunning visual effects',
      'Color-changing options available',
      'Energy-efficient LED technology',
      'Fully waterproof fixtures',
      'Enhanced pool area safety'
    ],
    features: [
      {
        title: 'Underwater LED Lights',
        description: 'Brilliant illumination for pools and spas',
        image: 'floorLight'
      },
      {
        title: 'Fountain & Waterfall Lighting',
        description: 'Dynamic lighting for moving water',
        image: 'wallWasherLight'
      },
      {
        title: 'Poolside Path Lighting',
        description: 'Safe navigation around water areas',
        image: 'pathLight'
      }
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
    heroImage: 'hero',
    benefits: [
      'Professional design and installation',
      'Safe, insured installation team',
      'Custom displays for any holiday',
      'Storage and maintenance included',
      'Energy-efficient LED options',
      'Hassle-free removal service'
    ],
    features: [
      {
        title: 'Roofline & Gutter Lighting',
        description: 'Classic holiday outline lighting',
        image: 'pathLight'
      },
      {
        title: 'Tree Wrapping & Canopy Lighting',
        description: 'Magical illumination for trees and shrubs',
        image: 'wallWasherLight'
      },
      {
        title: 'Custom Display Elements',
        description: 'Unique decorative lighting features',
        image: 'floorLight'
      }
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

function ServicePage({ slug = 'residential-landscape' }) {
  const service = serviceData[slug];
  const heroRef = useRef(null);
  const contentRefs = useRef([]);
  const [heroImage, setHeroImage] = useState(fallbackImages.hero);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Get images
  const heroBackground = useImage(service.heroImage, 'background');
  
  // Load dynamic service images
  useEffect(() => {
    const loadServiceImages = async () => {
      // Check for custom hero image
      const serviceHeroImage = getServiceHeroImage(slug);
      const heroExists = await checkImageExists(serviceHeroImage);
      if (heroExists) {
        setHeroImage(serviceHeroImage);
      } else {
        setHeroImage(heroBackground);
      }
      
      // Load gallery images
      const config = serviceImageConfig[slug] || { galleryCount: 6 };
      const serviceGalleryImages = getServiceGalleryImages(slug, config.galleryCount);
      
      // Check which gallery images exist
      const validGalleryImages = [];
      for (const img of serviceGalleryImages) {
        const exists = await checkImageExists(img);
        if (exists) {
          validGalleryImages.push(img);
        }
      }
      setGalleryImages(validGalleryImages);
    };
    
    loadServiceImages();
  }, [slug, heroBackground]);
  
  useEffect(() => {
    // Scroll to top on component mount
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out"
      }
    );
    
    // Content animations
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [slug]);

  const scrollToContact = () => {
    // Navigate to home page with contact section
    window.location.href = '/#contact';
  };

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-brand-green"
      >
        {/* Dynamic Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">{service.subtitle}</p>
          <Button 
            onClick={scrollToContact}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg"
          >
            Schedule Light Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        {/* Overview Section */}
        <section ref={el => contentRefs.current[0] = el} className="max-w-4xl mx-auto px-4 mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            {service.description}
          </p>
        </section>

        {/* Benefits Section */}
        <section ref={el => contentRefs.current[1] = el} className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our {service.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <section ref={el => contentRefs.current[2] = el} className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Project Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image 
                      src={image}
                      alt={`${service.title} example ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section ref={el => contentRefs.current[3] = el} className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Lighting Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} serviceSlug={slug} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={el => contentRefs.current[4] = el} className="bg-brand-green text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={el => contentRefs.current[5] = el} className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Let&apos;s create a custom lighting design that perfectly suits your needs and budget.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg"
            >
              Schedule Light Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ServicePage;