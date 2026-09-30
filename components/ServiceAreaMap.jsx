'use client';

import React, { useEffect, useRef, useState } from 'react';

const ServiceAreaMap = () => {
  const mapAreaRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const serviceAreas = [
    { name: "Wichita", lat: 37.6872, lng: -97.3301 },
    { name: "Andover", lat: 37.7139, lng: -97.1364 },
    { name: "El Dorado", lat: 37.8172, lng: -96.8614 },
    { name: "Haysville", lat: 37.5644, lng: -97.3523 },
    { name: "Maize", lat: 37.7789, lng: -97.4684 },
    { name: "Derby", lat: 37.5456, lng: -97.2689 },
    { name: "Park City", lat: 37.7997, lng: -97.3184 },
    { name: "Bel Aire", lat: 37.7706, lng: -97.2542 },
    { name: "Goddard", lat: 37.6597, lng: -97.5753 },
    { name: "Valley Center", lat: 37.8347, lng: -97.3734 },
  ];

  const boundaryOrder = [
    "Valley Center", "El Dorado", "Andover", "Derby",
    "Haysville", "Goddard", "Maize"
  ];

  const initializeMap = () => {
    if (!window.google || !mapAreaRef.current || mapInstanceRef.current) return;

    const map = new window.google.maps.Map(mapAreaRef.current, {
      center: { lat: 37.6872, lng: -97.3301 },
      zoom: 10,
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#1a1a1a" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ lightness: -80 }]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b6b6b" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#2a2a2a" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#111111" }]
        }
      ]
    });

    mapInstanceRef.current = map;

    const bounds = new window.google.maps.LatLngBounds();

    serviceAreas.forEach((area) => {
      const position = { lat: area.lat, lng: area.lng };
      bounds.extend(position);

      new window.google.maps.Marker({
        position,
        map,
        title: area.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: area.name === "Wichita" ? 7 : 5,
          fillColor: area.name === "Wichita" ? '#D8813A' : '#999999',
          fillOpacity: area.name === "Wichita" ? 1 : 0.6,
          strokeColor: area.name === "Wichita" ? '#D8813A' : '#ffffff',
          strokeWeight: 1,
        },
        label: {
          text: area.name,
          color: '#ffffff',
          fontSize: area.name === "Wichita" ? '12px' : '10px',
          fontWeight: area.name === "Wichita" ? '500' : '300',
        },
      });
    });

    const polygonCoords = boundaryOrder.map((cityName) => {
      const city = serviceAreas.find((a) => a.name === cityName);
      return { lat: city.lat, lng: city.lng };
    });

    new window.google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: '#D8813A',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: '#D8813A',
      fillOpacity: 0.08,
      map,
    });

    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
  };

  useEffect(() => {
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    // Another mount may already be loading the script; wait for it instead of adding a second copy
    const existingMapsScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingMapsScript) {
      const readyCheck = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(readyCheck);
          setMapLoaded(true);
        }
      }, 200);
      return () => clearInterval(readyCheck);
    }

    const callbackName = `initMap_${Date.now()}`;
    window[callbackName] = () => {
      setMapLoaded(true);
      delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded]);

  return (
    <section id="service-area" className="py-20 md:py-28 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-white mb-5">
            Where we <em className="italic font-normal">work</em>
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-md">
            Based in Wichita and serving homes across the metro, roughly a 30-mile radius.
          </p>

          <ul className="grid grid-cols-2 gap-x-8 border-t border-white/15">
            {serviceAreas.map((area) => (
              <li
                key={area.name}
                className={`py-3 border-b border-white/15 ${area.name === 'Wichita' ? 'text-orange-300' : 'text-white/80'}`}
              >
                {area.name}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-white/55">
            Don&rsquo;t see your town?{' '}
            <a href="/consultation" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-300">
              Ask us anyway
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-80 sm:h-96 lg:h-full lg:min-h-[520px] rounded-sm overflow-hidden bg-neutral-900">
            {!mapLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <p className="text-sm text-white/40">Loading map…</p>
              </div>
            )}
            <div ref={mapAreaRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
