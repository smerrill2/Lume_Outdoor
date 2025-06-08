'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Sparkles, Lightbulb, Calendar, MapPin, X } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// This would typically come from a database or CMS in a real application
const projectDetails = {
  'sams-house': {
    title: "Sam's House, After Dark",
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
    coverImage: '/placeholder.jpg',
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
  }
};

function ProjectDetailPage({ projectId }) {
  const projectData = projectDetails[projectId];
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRefs = useRef([]);
  const galleryRef = useRef(null);
  const galleryItemsRef = useRef([]);
  
  useEffect(() => {
    // Header parallax effect
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 100,
      ease: "none"
    });
    
    // Content sections animation
    contentRefs.current.forEach((section, index) => {
      if (!section) return;
      
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Gallery items animation
    if (galleryItemsRef.current.length > 0) {
      gsap.fromTo(
        galleryItemsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [projectId]);
  
  if (!projectData) {
    return <div>Project not found</div>;
  }

  const filteredImages = activeFilter === 'all' 
    ? projectData.galleryImages 
    : projectData.galleryImages.filter(img => img.category === activeFilter);
  
  return (
    <div className="min-h-screen bg-white" ref={sectionRef}>
      <Navbar />
      
      {/* Hero Header with Parallax */}
      <header 
        ref={headerRef}
        className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: `url(${projectData.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto relative z-10 px-4 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
              <span className="text-orange-500 font-semibold uppercase tracking-wider">Featured Project</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              {projectData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>{projectData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>{projectData.date}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative light beams */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </header>
      
      <main>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Project Overview with Enhanced Styling */}
            <section ref={el => contentRefs.current[0] = el} className="mb-20">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-10 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-8 h-8 text-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-900">The Vision</h2>
                </div>
                <p className="text-xl leading-relaxed text-gray-700 mb-8">
                  {projectData.overview}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Client Goals</h3>
                    <ul className="space-y-3">
                      {projectData.clientGoals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">The Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {projectData.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Our Approach with Timeline */}
            <section ref={el => contentRefs.current[1] = el} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {projectData.approach}
                </p>
              </div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-500/30"></div>
                
                <div className="space-y-12">
                  {projectData.process.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className="absolute left-8 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                      <div className="ml-20">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Results Section with Special Styling */}
            <section ref={el => contentRefs.current[2] = el} className="mb-20">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-orange-600" />
                    <h2 className="text-3xl font-bold text-gray-900">The Transformation</h2>
                  </div>
                  <p className="text-xl leading-relaxed text-gray-700">
                    {projectData.results}
                  </p>
                  <p className="mt-6 text-lg font-medium text-orange-600">
                    Now her entry is safe, the curb appeal is unmistakable, and the neighbors can&apos;t stop talking. 
                    One evening, one transformation—exactly what Lūme Outdoor Lighting is all about.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Testimonial with Enhanced Design */}
            <section ref={el => contentRefs.current[3] = el} className="mb-20">
              <div className="bg-gray-900 text-white rounded-2xl p-10 relative">
                <div className="absolute top-6 left-6 text-6xl text-orange-500/20">&quot;</div>
                <div className="relative z-10">
                  <blockquote className="text-2xl leading-relaxed mb-6 italic">
                    {projectData.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-px bg-orange-500"></div>
                    <div>
                      <cite className="text-lg font-semibold not-italic">{projectData.testimonial.author}</cite>
                      <p className="text-orange-400">{projectData.testimonial.role}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 text-6xl text-orange-500/20 rotate-180">&quot;</div>
              </div>
            </section>
            
            {/* Enhanced Gallery Section */}
            <section ref={galleryRef} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
                <p className="text-lg text-gray-600 mb-8">
                  See the stunning transformation from every angle
                </p>
                
                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'all' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Photos
                  </button>
                  <button
                    onClick={() => setActiveFilter('before')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'before' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setActiveFilter('after')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'after' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    After
                  </button>
                  <button
                    onClick={() => setActiveFilter('detail')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeFilter === 'detail' 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Details
                  </button>
                </div>
              </div>
              
              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div 
                    key={index}
                    ref={el => galleryItemsRef.current[index] = el}
                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image 
                        src={image.src} 
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-sm font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add more photos placeholder */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 italic">
                  More photos coming soon...
                </p>
              </div>
            </section>
            
            {/* CTA with Enhanced Design */}
            <section className="text-center py-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-orange-100 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Ready to Light Up Your Property?</h2>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Join our growing list of satisfied homeowners who now see their properties in a whole new light.
                </p>
                <Button 
                  className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg text-lg font-medium transform hover:scale-105 transition-all"
                  onClick={() => window.location.href = '/?view=consultation'}
                >
                  Schedule Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Lightbox for full-size images */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full h-[90vh]">
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default ProjectDetailPage;