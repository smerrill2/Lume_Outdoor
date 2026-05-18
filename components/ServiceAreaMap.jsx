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
          fillColor: area.name === "Wichita" ? '#ffffff' : '#999999',
          fillOpacity: area.name === "Wichita" ? 0.9 : 0.6,
          strokeColor: '#ffffff',
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
      strokeColor: '#ffffff',
      strokeOpacity: 0.2,
      strokeWeight: 1,
      fillColor: '#ffffff',
      fillOpacity: 0.05,
      map,
    });

    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
  };

  useEffect(() => {
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
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

    return () => {
      delete window[callbackName];
    };
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded]);

  return (
    <section id="service-area" className="py-24 md:py-28 px-4 bg-neutral-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Service Area
          </h2>
        </div>

        {/* Map + Side Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden">
            <div className="relative h-72 sm:h-80 md:h-full min-h-[350px] bg-neutral-800">
              {!mapLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <p className="text-sm font-light text-white/40 tracking-wide">Loading map...</p>
                </div>
              )}
              <div ref={mapAreaRef} className="w-full h-full" />
            </div>
          </div>

          {/* Side Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {/* Service Radius */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-4xl md:text-5xl font-extralight text-white/80 block mb-1">
                  30+
                </span>
                <span className="text-[10px] font-light tracking-[0.2em] text-white/40 uppercase">
                  Mile Radius
                </span>
              </div>
              <p className="text-xs font-light text-white/25 leading-relaxed mt-4">
                If it&apos;s in the metro, we&apos;re there.
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-4xl md:text-5xl font-extralight text-white/80 block mb-1">
                  24-48
                </span>
                <span className="text-[10px] font-light tracking-[0.2em] text-white/40 uppercase">
                  Hour Response
                </span>
              </div>
              <p className="text-xs font-light text-white/25 leading-relaxed mt-4">
                Quick consultation scheduling.
              </p>
            </div>

            {/* Cities Served */}
            <div className="col-span-2 lg:col-span-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 md:p-8 text-center">
              <span className="text-[10px] font-light tracking-[0.3em] text-white/30 uppercase block mb-4">
                Proudly Serving
              </span>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className={`text-xs font-light tracking-wide ${
                      area.name === "Wichita" ? 'text-white/60' : 'text-white/30'
                    }`}
                  >
                    {area.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
