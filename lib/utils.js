import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Image optimization utilities
export const imageOptimization = {
  // Standard blur placeholder for lazy loaded images
  blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  
  // Quality settings for different image types (used in our Image components)
  quality: {
    hero: 85,      // High quality for hero images
    standard: 75,  // Standard quality for most images - great balance of quality/size
    thumbnail: 60, // Lower quality for small images
    logo: 90       // High quality for logos
  },
  
  // Common responsive image sizes
  sizes: {
    hero: "100vw",
    card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    thumbnail: "(max-width: 768px) 128px, 160px",
    fullWidth: "100vw",
    gallery: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  },
  
  // Standard props for different image types
  getImageProps: (type = 'standard', isAboveFold = false) => {
    const baseProps = {
      quality: imageOptimization.quality.standard,
      loading: isAboveFold ? undefined : 'lazy',
      placeholder: isAboveFold ? undefined : 'blur',
      blurDataURL: isAboveFold ? undefined : imageOptimization.blurDataURL,
    };

    switch (type) {
      case 'hero':
        return {
          ...baseProps,
          priority: true,
          quality: imageOptimization.quality.hero,
          sizes: imageOptimization.sizes.hero,
          loading: undefined,
          placeholder: 'blur',
          blurDataURL: imageOptimization.blurDataURL,
        };
      
      case 'logo':
        return {
          ...baseProps,
          priority: true,
          quality: imageOptimization.quality.logo,
          sizes: imageOptimization.sizes.thumbnail,
          loading: undefined,
          placeholder: undefined,
          blurDataURL: undefined,
        };
      
      case 'card':
        return {
          ...baseProps,
          quality: imageOptimization.quality.standard,
          sizes: imageOptimization.sizes.card,
        };
      
      case 'gallery':
        return {
          ...baseProps,
          quality: imageOptimization.quality.standard,
          sizes: imageOptimization.sizes.gallery,
        };
      
      case 'thumbnail':
        return {
          ...baseProps,
          quality: imageOptimization.quality.thumbnail,
          sizes: imageOptimization.sizes.thumbnail,
        };
      
      default:
        return baseProps;
    }
  }
};

// Performance monitoring utilities
export const performance = {
  // Measure image load time
  measureImageLoad: (imageSrc, callback) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      callback({ success: true, loadTime, src: imageSrc });
    };
    
    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      callback({ success: false, loadTime, src: imageSrc });
    };
    
    img.src = imageSrc;
  },
  
  // Preload critical images
  preloadImages: (imagePaths) => {
    imagePaths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
    });
  }
};
