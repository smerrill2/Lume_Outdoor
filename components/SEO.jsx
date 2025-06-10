'use client';

import { useEffect } from 'react';

const SEO = ({ 
  title = 'Premium Outdoor Lighting | Lume Outdoor',
  description = 'Transform your property with professional outdoor and landscape lighting. Schedule a light consultation today. Serving a 50-mile radius with premium lighting solutions.',
  keywords = 'outdoor lighting, landscape lighting, path lighting, deck lighting, architectural lighting, security lighting, professional installation, light consultation',
  author = 'Lume Outdoor',
  ogImage = '/Hero_Drake.jpg',
  type = 'website',
  url = typeof window !== 'undefined' ? window.location.href : ''
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property, content, isOG = false) => {
      const attribute = isOG ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', 'Lume Outdoor', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD Schema for Local Business
    const schemaScript = document.getElementById('schema-script') || document.createElement('script');
    schemaScript.id = 'schema-script';
    schemaScript.type = 'application/ld+json';
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Lume Outdoor",
      "description": "Premium outdoor and landscape lighting services",
      "url": typeof window !== 'undefined' ? window.location.origin : '',
      "telephone": "+1 (316) 655-1270",
      "email": "Drake@lumeoutdoorlighting.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Your City",
        "addressRegion": "Your State",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 40.7128,
          "longitude": -74.0060
        },
        "geoRadius": "50 miles"
      },
      "priceRange": "$$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.facebook.com/lumeoutdoor",
        "https://www.instagram.com/lumeoutdoor"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Outdoor Lighting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Path & Walkway Lighting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Deck & Patio Lighting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landscape & Garden Lighting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Architectural Lighting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Security Lighting"
            }
          }
        ]
      }
    };

    schemaScript.textContent = JSON.stringify(schema);
    
    if (!document.getElementById('schema-script')) {
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Cleanup is handled by next render
    };
  }, [title, description, keywords, author, ogImage, type, url]);

  return null;
};

export default SEO;