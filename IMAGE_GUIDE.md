# Service Page Image Management Guide

This guide explains how to easily add and update images for service pages. The system automatically detects and displays your images based on standardized naming conventions.

## 🚀 Quick Start

To add images to any service page, simply drop your images into the `/public/services/` folder using the naming patterns below.

## 📁 Directory Structure

```
/public/services/
├── residential-landscape.png          # Hero image
├── residential-landscape-1.png        # Gallery image 1
├── residential-landscape-2.png        # Gallery image 2
├── residential-landscape-feature-1.png # Feature card image 1
├── commercial-lighting.png            # Hero image
├── commercial-lighting-1.png          # Gallery image 1
└── ... (and so on)
```

## 🎯 Service Slugs (Use these exact names)

- `residential-landscape`
- `commercial-lighting`
- `pathway-lighting`
- `security-lighting`
- `deck-patio`
- `architectural`
- `pool-water`
- `holiday-lighting`

## 🖼️ Image Types & Naming Patterns

### 1. Hero Images (Main banner on service page)
**Format:** `{service-slug}.png`
**Examples:**
- `residential-landscape.png`
- `commercial-lighting.png`
- `pathway-lighting.png`

### 2. Gallery Images (Project showcase grid)
**Format:** `{service-slug}-{number}.png`
**Examples:**
- `residential-landscape-1.png`
- `residential-landscape-2.png`
- `commercial-lighting-1.png`
- `commercial-lighting-2.png`

**Image Counts per Service:**
- Residential Landscape: up to 8 images
- Commercial Lighting: up to 6 images
- Pathway Lighting: up to 6 images
- Security Lighting: up to 4 images
- Deck & Patio: up to 8 images
- Architectural: up to 6 images
- Pool & Water: up to 8 images
- Holiday Lighting: up to 6 images

### 3. Feature Card Images (Product/solution cards)
**Format:** `{service-slug}-feature-{number}.png`
**Examples:**
- `residential-landscape-feature-1.png`
- `residential-landscape-feature-2.png`
- `commercial-lighting-feature-1.png`

**Feature Image Counts:**
- Most services: up to 3 feature images
- Residential Landscape & Deck/Patio: up to 4 feature images

### 4. Before/After Images (Optional)
**Format:** 
- `{service-slug}-before.png`
- `{service-slug}-after.png`

**Examples:**
- `residential-landscape-before.png`
- `residential-landscape-after.png`

## 📝 Step-by-Step Instructions

### To Update a Service Page:

1. **Prepare your images:**
   - Recommended size: 1200x800px minimum
   - Format: PNG or JPG (rename to .png)
   - Optimize for web (under 1MB each)

2. **Name your images correctly:**
   - Use the exact service slug from the list above
   - Follow the naming patterns exactly
   - Use lowercase and hyphens only

3. **Upload to the services folder:**
   ```
   /public/services/your-image-name.png
   ```

4. **The images appear automatically:**
   - Hero images replace the default background
   - Gallery images appear in the project showcase
   - Feature images replace the default product icons

## 📋 Example: Adding Images for Residential Landscape

To completely customize the Residential Landscape service page:

```
📁 /public/services/
├── residential-landscape.png           # Main hero background
├── residential-landscape-1.png         # Gallery image 1
├── residential-landscape-2.png         # Gallery image 2
├── residential-landscape-3.png         # Gallery image 3
├── residential-landscape-4.png         # Gallery image 4
├── residential-landscape-5.png         # Gallery image 5
├── residential-landscape-6.png         # Gallery image 6
├── residential-landscape-7.png         # Gallery image 7
├── residential-landscape-8.png         # Gallery image 8
├── residential-landscape-feature-1.png # Feature card 1
├── residential-landscape-feature-2.png # Feature card 2
├── residential-landscape-feature-3.png # Feature card 3
├── residential-landscape-feature-4.png # Feature card 4
├── residential-landscape-before.png    # Before photo
└── residential-landscape-after.png     # After photo
```

## 🔄 How It Works

The system automatically:
1. Checks if custom images exist for each service
2. Displays your custom images if found
3. Falls back to default images if custom ones don't exist
4. Optimizes all images for fast loading
5. Makes images responsive across all devices

## ⚡ Pro Tips

- **Consistent aspect ratios:** Keep gallery images similar sizes for best layout
- **High quality:** Use high-resolution images (they'll be automatically optimized)
- **Descriptive content:** Show actual project work rather than stock photos
- **Before/after:** These create powerful visual impact when available
- **Feature images:** Should clearly show the specific lighting product/solution

## 🚨 Important Notes

- Image names are case-sensitive
- Use exact service slugs listed above
- PNG format recommended (but JPG works too, just rename to .png)
- Images appear immediately after upload (no restart needed)
- Missing images automatically use fallback defaults

## 🎨 Recommended Image Specifications

- **Hero Images:** 1920x1080px (landscape)
- **Gallery Images:** 1200x900px (4:3 ratio)
- **Feature Images:** 800x600px (4:3 ratio)
- **Before/After:** 1200x900px (4:3 ratio)
- **File Size:** Under 1MB each (optimized for web)
- **Format:** PNG preferred, JPG acceptable

---

Need help? The system is designed to be forgiving - if an image doesn't show up, check the filename against this guide!