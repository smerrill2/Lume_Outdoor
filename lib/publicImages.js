// List of all public images
// Update this list when you add new images to the public folder
// In production, this would ideally come from a backend API

export const publicImagesList = [
  'Hero_Drake.jpg',
  'Hero_photo.jpg',
  'LogoLume.svg',
  'LumeOutdoor (2).svg',
  'Lumepng.png',
  'architectural-lighting-icon.svg',
  'commercial-lighting-icon.svg',
  'commercial-lighting.svg',
  'deck-patio-icon.svg',
  'deckLight.png',
  'floorLight.png',
  'holiday-lighting-icon.svg',
  'pathLight.png',
  'pathway-lighting-icon.svg',
  'pathway-lighting.svg',
  'placeholder.jpg',
  'pool-water-icon.svg',
  'residential-landscape-icon.svg',
  'residential-landscape.svg',
  'security-lighting-icon.svg',
  'walkWayLight.png',
  'wallWasherLight.png',
  'workShowcase1.png'
];

// Add new function to add images to the list
export const addPublicImage = (imageName) => {
  if (!publicImagesList.includes(imageName)) {
    publicImagesList.push(imageName);
  }
};
