// Service Image Management System
// This utility handles dynamic image loading for service pages

/**
 * Gets the main hero image for a service page
 * Format: /services/{service-slug}.png
 * Example: /services/residential-landscape.png
 */
export function getServiceHeroImage(slug) {
  return `/services/${slug}.png`;
}

/**
 * Gets gallery images for a service page
 * Format: /services/{service-slug}-{number}.png
 * Example: /services/residential-landscape-1.png, /services/residential-landscape-2.png
 */
export function getServiceGalleryImages(slug, count = 6) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push(`/services/${slug}-${i}.png`);
  }
  return images;
}

/**
 * Gets before/after images for a service page
 * Format: /services/{service-slug}-before.png, /services/{service-slug}-after.png
 */
export function getServiceBeforeAfterImages(slug) {
  return {
    before: `/services/${slug}-before.png`,
    after: `/services/${slug}-after.png`
  };
}

/**
 * Gets feature section images for a service page
 * Format: /services/{service-slug}-feature-{number}.png
 */
export function getServiceFeatureImages(slug, count = 3) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push(`/services/${slug}-feature-${i}.png`);
  }
  return images;
}

/**
 * Checks if an image exists (client-side fallback)
 * Returns a promise that resolves to true if image exists
 */
export function checkImageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Service-specific image configurations
 * You can customize image counts per service here
 */
export const serviceImageConfig = {
  'residential-landscape': {
    galleryCount: 8,
    featureCount: 4,
    hasBeforeAfter: true
  },
  'commercial-lighting': {
    galleryCount: 6,
    featureCount: 3,
    hasBeforeAfter: true
  },
  'pathway-lighting': {
    galleryCount: 6,
    featureCount: 3,
    hasBeforeAfter: true
  },
  'security-lighting': {
    galleryCount: 4,
    featureCount: 3,
    hasBeforeAfter: false
  },
  'deck-patio': {
    galleryCount: 8,
    featureCount: 4,
    hasBeforeAfter: true
  },
  'architectural': {
    galleryCount: 6,
    featureCount: 3,
    hasBeforeAfter: true
  },
  'pool-water': {
    galleryCount: 8,
    featureCount: 4,
    hasBeforeAfter: true
  },
  'holiday-lighting': {
    galleryCount: 6,
    featureCount: 3,
    hasBeforeAfter: false
  }
};

/**
 * Default fallback images if service-specific images don't exist
 */
export const fallbackImages = {
  hero: '/Hero_photo.jpg',
  gallery: '/workShowcase1.png',
  before: '/Hero_photo.jpg',
  after: '/workShowcase1.png',
  feature: '/workShowcase1.png'
};