# 🔍 Quick Verification Script

## Run These Commands to Test Everything:

### 1. **Test Development Build**
```bash
npm run dev
```
- Visit `http://localhost:3000`
- Check console for errors (F12 → Console)
- Test a few pages and links

### 2. **Test Production Build**
```bash
npm run build
npm run start
```
- Visit `http://localhost:3000`
- Verify everything works in production mode

### 3. **Test Service Image System**
Visit these URLs to verify images work:
- `http://localhost:3000/services/residential-landscape`
- `http://localhost:3000/services/commercial-lighting`
- `http://localhost:3000/services/pathway-lighting`

### 4. **Mobile Test**
- Open Chrome DevTools (F12)
- Click device toggle (Ctrl+Shift+M)
- Test iPhone and iPad views

### 5. **Performance Check**
- In Chrome DevTools → Lighthouse
- Run Performance audit
- Should score 90+ for Performance

## ✅ What Success Looks Like:

- **No console errors**
- **All pages load under 3 seconds**
- **Animations work smoothly**
- **Forms function properly**
- **Images display correctly**
- **Mobile layout looks good**
- **Navigation works on all pages**

## 🚨 If You See Issues:

1. **Console Errors**: Note the error and file location
2. **Broken Images**: Check file paths and names
3. **Slow Loading**: Check image sizes and optimization
4. **Layout Issues**: Test different screen sizes

## 📞 Contact Form Test:

1. Go to `/consultation`
2. Fill out the Jobber form
3. Submit and verify it works
4. Check that leads come through to your system

---

**Once everything passes these tests, you're ready to clean up the old project!**