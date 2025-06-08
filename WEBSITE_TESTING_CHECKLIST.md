# 🧪 Website Testing Checklist

## ✅ Critical Functionality Tests

### 1. **Page Loading & Navigation**
- [ ] **Home page** loads without errors (`/`)
- [ ] **About page** loads with owner bios (`/about`)
- [ ] **Consultation page** loads with form (`/consultation`)
- [ ] **All service pages** load properly:
  - [ ] `/services/residential-landscape`
  - [ ] `/services/commercial-lighting`
  - [ ] `/services/pathway-lighting`
  - [ ] `/services/security-lighting`
  - [ ] `/services/deck-patio`
  - [ ] `/services/architectural`
  - [ ] `/services/pool-water`
  - [ ] `/services/holiday-lighting`
- [ ] **All project pages** load properly:
  - [ ] `/projects/sams-house`
  - [ ] `/projects/wichita-modern-ranch`
  - [ ] `/projects/wichita-traditional-home`
  - [ ] `/projects/augusta-prairie-estate`

### 2. **Navigation & Links**
- [ ] **Navbar logo** links back to home
- [ ] **Main navigation** links work (Home, About, Services dropdown, Consultation)
- [ ] **Services dropdown** shows all 8 services and links work
- [ ] **Footer links** work (services, social media, contact info)
- [ ] **CTA buttons** ("Schedule Consultation") link to `/consultation`
- [ ] **Project gallery links** from home page work

### 3. **Image System Tests**
- [ ] **Favicon** appears in browser tab
- [ ] **Service hero images** display (check residential-landscape has custom image)
- [ ] **Service gallery sections** appear when images exist
- [ ] **Feature card images** load properly
- [ ] **All existing images** still work (logos, project photos, icons)

### 4. **GSAP Animation Tests**
- [ ] **Hero section animations** work (text appears with stagger effect)
- [ ] **Service grid animations** trigger on scroll
- [ ] **Project showcase animations** work
- [ ] **Testimonials animations** function
- [ ] **Service page animations** work
- [ ] **No console errors** related to GSAP or animations

### 5. **Forms & Functionality**
- [ ] **Consultation form** (Jobber integration) works
- [ ] **Contact forms** throughout site function
- [ ] **Mobile menu** opens and closes properly
- [ ] **Scroll animations** trigger correctly

### 6. **Responsive Design**
- [ ] **Mobile view** (320px - 768px) looks good
- [ ] **Tablet view** (768px - 1024px) functions properly
- [ ] **Desktop view** (1024px+) displays correctly
- [ ] **Navigation** works on all screen sizes
- [ ] **Images** scale properly on all devices

### 7. **Performance & Console**
- [ ] **No hydration errors** in console
- [ ] **No JavaScript errors** in console
- [ ] **Fast loading times** (under 3 seconds)
- [ ] **Images load** without broken links
- [ ] **Animations smooth** without lag

### 8. **SEO & Metadata**
- [ ] **Page titles** show correctly in browser tabs
- [ ] **Meta descriptions** are appropriate
- [ ] **Open Graph** images work for social sharing
- [ ] **Favicon** appears consistently

## 🔧 Quick Test Commands

```bash
# Start dev server
npm run dev

# Test production build
npm run build
npm run start

# Check for ESLint errors
npm run lint
```

## 🌐 Browser Testing

Test in multiple browsers:
- [ ] **Chrome** (latest)
- [ ] **Safari** (if on Mac)
- [ ] **Firefox** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

## 📱 Mobile Testing

1. Open Chrome DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different device sizes:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)

## ✅ Success Criteria

Your website is ready when:
- ✅ All pages load without errors
- ✅ Navigation works smoothly
- ✅ Images display correctly
- ✅ Animations function properly
- ✅ Forms work for lead capture
- ✅ Mobile experience is excellent
- ✅ No console errors

## 🚨 Red Flags to Watch For

- ❌ 404 errors on any pages
- ❌ Broken images or missing content
- ❌ JavaScript errors in console
- ❌ Slow loading times (>5 seconds)
- ❌ Layout breaks on mobile
- ❌ Forms not submitting
- ❌ Animations not working

---

**Once all tests pass, you're ready to clean up the old project files!**