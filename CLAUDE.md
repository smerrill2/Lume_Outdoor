# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Lume Outdoor is a React-based web application for a residential premium outdoor lighting company. The site showcases landscape lighting products and services with extensive GSAP animations and interactive elements.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Photo Manager (Development Tool)

The app includes a Photo Manager UI that allows developers to quickly update images across the entire platform. This tool is **only visible in development mode** and automatically hidden in production builds.

### How it works:
- Floating button in bottom-right corner (dev mode only)
- Organized by categories: Hero, Logo, Products, Services, Projects
- Live preview and instant updates across all components
- Centralized image configuration in `/src/lib/imageConfig.js`

### Security:
- Uses Vite's `import.meta.env.DEV` to ensure it's never visible in production
- When you run `npm run build`, the Photo Manager is automatically excluded
- Users will never see this tool on the deployed site

## Tech Stack & Architecture

### Core Technologies
- **React 19.1.0** - UI framework
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS 4.1.5** - Utility-first CSS framework
- **GSAP 3.13.0** - Animation library for complex animations
- **Lucide React** - Icon library
- **Radix UI** - Unstyled, accessible component primitives

### Project Structure
- Single Page Application with client-side routing via URL parameters
- Component-based architecture with separation of pages and components
- GSAP animations integrated throughout for interactive user experience
- Responsive design with mobile-first approach

### Key Architectural Decisions
1. **Routing**: Uses URL parameters and sessionStorage for navigation between views (home, project-detail)
2. **Styling**: Tailwind CSS with custom brand colors (brand-green: #1D4B26, orange-500 for CTAs)
3. **Animations**: GSAP with ScrollTrigger for scroll-based animations
4. **Path Aliases**: `@/` maps to `./src/` for cleaner imports

## Implemented Features

### 1. Animated Hero Section
- Staggered text reveal animations for title, subtitle, and CTA
- Subtle parallax stars background animation
- Integration with React components and refs

### 2. Animated Navigation
- Transparent to solid animation on scroll
- Mobile menu with staggered item animations
- Animated logo entrance

### 3. Previous Work Showcase
- Gallery of completed projects with hover effects
- Scroll-triggered animations for each project card
- Featured project highlighting
- Link to detailed project page

### 5. Project Detail Pages
- Rich storytelling format for showcasing project processes
- Animated section reveals as user scrolls
- Parallax header effect
- Client testimonial section

## Animation Techniques Used
- GSAP Timeline animations
- ScrollTrigger for scroll-based animations
- Staggered element entrances
- Hover state animations
- Opacity and position transitions
- Parallax effects

## File Structure

### Components
- `/src/components/Navbar.jsx` - Main navigation with mobile menu and scroll animations
- `/src/components/PreviousWorkShowcase.jsx` - Portfolio gallery with GSAP animations
- `/src/components/ProjectDetailPage.jsx` - Detailed project page with storytelling format

### Pages
- `/src/pages/HomePage.jsx` - Main landing page that combines all components
- `/public/project-detail.html` - Entry point for project detail views

### Assets
- Product icons: `/public/pathLight.png`, `/public/deckLight.png`, etc.
- Project images: `/public/workShowcase1.png`, etc.

## Technical Implementation Notes

### GSAP Integration
- Used both core GSAP and ScrollTrigger plugin
- Registered plugins in main components that use them
- Added appropriate useEffect cleanup

### Animation Performance
- Used refs for direct DOM manipulation with GSAP
- Optimized animations by batching similar transitions
- Used CSS transitions for simpler hover effects

### Responsive Design
- Ensured all animations work across device sizes
- Mobile-specific adaptations for menu animations

## Key Implementation Patterns

### GSAP Animation Pattern
```javascript
// Register plugins at component level
gsap.registerPlugin(ScrollTrigger);

// Use refs for DOM manipulation
const elementRef = useRef(null);

// Initialize animations in useEffect with cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animation code here
  });
  
  return () => ctx.revert();
}, []);
```

### Adding New Projects
Edit the projects array in `/src/components/PreviousWorkShowcase.jsx`

### Creating Project Detail Pages
1. Add project data to the projectDetails object in `/src/components/ProjectDetailPage.jsx`
2. Link from the project showcase using the project ID