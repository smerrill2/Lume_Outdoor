// Centralized image configuration for the entire app
// This allows quick swapping of images across all components

export const imageConfig = {
  // Hero Section
  hero: {
    background: "/Hero_Drake.jpg",
  },
  
  // Logo
  logo: {
    main: "/Lumepng.png",
    svg: "/LogoLume.svg"
  },
  
  // Product Images
  products: {
    pathLight: "/pathLight.png",
    deckLight: "/deckLight.png",
    floorLight: "/floorLight.png",
    wallWasherLight: "/wallWasherLight.png",
    walkWayLight: "/walkWayLight.png"
  },
  
  // Service Icons
  services: {
    residential: "/residential-landscape-icon.svg",
    commercial: "/commercial-lighting-icon.svg",
    architectural: "/architectural-lighting-icon.svg",
    pathway: "/pathway-lighting-icon.svg",
    deckPatio: "/deck-patio-icon.svg",
    poolWater: "/pool-water-icon.svg",
    security: "/security-lighting-icon.svg",
    holiday: "/holiday-lighting-icon.svg"
  },
  
  // Project Showcase
  projects: {
    showcase1: "/workShowcase1.png",
    placeholder: "/placeholder.jpg"
  }
};

// Function to update images dynamically
export const updateImage = (category, key, newUrl) => {
  if (imageConfig[category] && imageConfig[category][key] !== undefined) {
    imageConfig[category][key] = newUrl;
    // Trigger re-render by dispatching custom event
    window.dispatchEvent(new CustomEvent('imageConfigUpdated', { 
      detail: { category, key, newUrl } 
    }));
  }
};

// Hook to use images with live updates
import { useState, useEffect } from 'react';

export const useImage = (category, key) => {
  const [imageUrl, setImageUrl] = useState(imageConfig[category]?.[key] || '');
  
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail.category === category && e.detail.key === key) {
        setImageUrl(e.detail.newUrl);
      }
    };
    
    window.addEventListener('imageConfigUpdated', handleUpdate);
    return () => window.removeEventListener('imageConfigUpdated', handleUpdate);
  }, [category, key]);
  
  return imageUrl;
};
