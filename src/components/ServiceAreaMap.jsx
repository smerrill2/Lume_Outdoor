import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceAreaMap = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mapContainerRef = useRef(null);
  const infoCardsRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Service areas - you can customize these based on actual service areas
  const serviceAreas = [
    "Wichita",
    "Andover",
    "El Dorado",
    "Haysville",
    "Maize",
    "Derby",
    "Park City",
    "Bel Aire",
    "Goddard",
    "Valley Center"
  ];

  const serviceStats = [
    {
      icon: MapPin,
      title: "Service Radius",
      value: "30+ Miles",
      description: "Covering Wichita and surrounding areas"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24-48 Hours",
      description: "Quick consultation scheduling"
    },
    {
      icon: Award,
      title: "Projects Completed",
      value: "500+",
      description: "Trusted by Kansas homeowners"
    }
  ];

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      setMapLoaded(true);
      initializeMap();
    };

    // For development, we'll show a placeholder
    // document.head.appendChild(script);

    // GSAP Animations
    const section = sectionRef.current;
    const title = titleRef.current;
    const mapContainer = mapContainerRef.current;
    const infoCards = infoCardsRef.current;

    gsap.set([title, mapContainer], { opacity: 0, y: 30 });
    gsap.set(infoCards, { opacity: 0, x: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.8 })
      .to(mapContainer, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
      .to(infoCards, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.6');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      delete window.initMap;
    };
  }, []);

  const initializeMap = () => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapContainerRef.current.querySelector('.map-area'), {
      center: { lat: 37.6872, lng: -97.3301 }, // Wichita, KS
      zoom: 10,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ lightness: -80 }]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        }
      ]
    });

    // Add service area overlay
    const serviceAreaCircle = new window.google.maps.Circle({
      strokeColor: '#f97316',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#f97316',
      fillOpacity: 0.15,
      map: map,
      center: { lat: 37.6872, lng: -97.3301 }, // Wichita, KS
      radius: 48280 // 30 miles in meters
    });
  };

  return (
    <section ref={sectionRef} id="service-area" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          Our Service Area
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div ref={mapContainerRef} className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 lg:h-full relative">
              {!mapLoaded ? (
                // Placeholder while map loads
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="text-center relative z-10 p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <MapPin className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500" />
                        <div className="absolute inset-0 animate-ping">
                          <MapPin className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500 opacity-40" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Proudly Serving</h3>
                    <p className="text-orange-400 text-lg sm:text-xl font-semibold mb-6">Wichita Metro & Surrounding Areas</p>
                    
                    {/* Cities Grid with Better Styling */}
                    <div className="max-w-md mx-auto">
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {/* Primary Cities */}
                        <div className="col-span-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg p-3">
                          <h4 className="text-orange-500 font-bold text-lg mb-1">Primary Service Area</h4>
                          <p className="text-white text-xl font-semibold">Wichita</p>
                        </div>
                        
                        {/* Surrounding Cities */}
                        {serviceAreas.slice(1, 7).map((area, index) => (
                          <div key={index} className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg p-2 hover:bg-gray-700/70 transition-colors">
                            <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                              <span className="text-gray-100 font-medium">{area}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Additional Cities */}
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-2">Also Serving:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {serviceAreas.slice(7).map((area, index) => (
                            <span key={index} className="text-xs text-gray-300 bg-gray-700/30 px-2 py-1 rounded">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="map-area w-full h-full"></div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {serviceStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  ref={el => infoCardsRef.current[index] = el}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">{stat.value}</h3>
                      <h4 className="text-base sm:text-lg font-semibold mb-1">{stat.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-orange-500 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Ready to Light Up Your Property?</h3>
              <p className="text-white/90 mb-4 text-sm sm:text-base">
                We serve all neighborhoods within our service area with the same dedication to excellence.
              </p>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-white text-orange-600 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors duration-300">
                Check Service Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;