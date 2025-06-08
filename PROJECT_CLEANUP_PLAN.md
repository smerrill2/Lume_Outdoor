# 🧹 Project Cleanup Plan

## 📋 Overview

After confirming your Next.js website works perfectly, you can safely clean up the old Vite/React project files to avoid confusion and maintain a clean codebase.

## 🎯 What We're Keeping vs. Removing

### ✅ **KEEP (Next.js Project)**
```
📁 lume-outdoor-nextjs/          ← Your new Next.js app
├── app/                         ← All your pages
├── components/                  ← All components
├── lib/                         ← Utilities & content
├── public/                      ← All images & assets
├── package.json                 ← Next.js dependencies
├── tailwind.config.js          ← Tailwind setup
├── next.config.js              ← Next.js config
└── All documentation files
```

### ❌ **REMOVE (Old Vite Project)**
```
📁 /Lume_Outdoor/ (parent directory)
├── src/                         ← Old React components
├── public/                      ← Old assets (already copied)
├── package.json                 ← Old Vite dependencies
├── vite.config.js              ← Vite configuration
├── index.html                  ← Old HTML entry
├── tailwind.config.js          ← Old Tailwind config
├── components.json             ← Old component config
├── eslint.config.js            ← Old ESLint config
├── jsconfig.json               ← Old JS config
└── node_modules/               ← Old dependencies
```

## 🔒 Step-by-Step Safe Cleanup

### **Step 1: Final Verification** ✅
Before any cleanup, verify your Next.js site works 100%:
```bash
cd lume-outdoor-nextjs
npm run build
npm run start
```
Test every page, every link, every form.

### **Step 2: Create Backup** 📦
```bash
# From the parent directory
cd /Users/spencermerrill/Lume_outdoor_webapp/
tar -czf lume-outdoor-backup-$(date +%Y%m%d).tar.gz Lume_Outdoor/
```

### **Step 3: Remove Old Files** (AFTER backup!)
```bash
# Navigate to old project directory
cd /Users/spencermerrill/Lume_outdoor_webapp/Lume_Outdoor/

# Remove old development files (SAFE - these are regenerated)
rm -rf node_modules/
rm -rf .next/
rm -rf dist/

# Remove old source code (AFTER confirming new site works!)
rm -rf src/
rm index.html
rm vite.config.js
rm components.json

# Remove old configs (keep only if you need them for reference)
rm eslint.config.js
rm jsconfig.json

# Keep package.json temporarily for reference
mv package.json package.json.old
```

### **Step 4: Update Project Structure**
After cleanup, your structure should look like:
```
📁 /Users/spencermerrill/Lume_outdoor_webapp/
├── Lume_Outdoor/
│   ├── lume-outdoor-nextjs/     ← Your main project
│   ├── package.json.old         ← Backup reference
│   ├── tailwind.config.js       ← Keep for reference
│   └── README.md                ← Keep for reference
└── lume-outdoor-backup-YYYYMMDD.tar.gz  ← Your backup
```

### **Step 5: Make Next.js the Main Project**
```bash
# Navigate to your main directory
cd /Users/spencermerrill/Lume_outdoor_webapp/Lume_Outdoor/

# Move Next.js project up one level (optional)
mv lume-outdoor-nextjs/* .
mv lume-outdoor-nextjs/.* . 2>/dev/null || true
rmdir lume-outdoor-nextjs
```

## ⚠️ **CRITICAL: Don't Delete Until Verified**

**DO NOT delete anything until:**
1. ✅ New Next.js site builds successfully
2. ✅ All pages work in production
3. ✅ All forms submit properly
4. ✅ All images load correctly
5. ✅ You've created a backup

## 🆘 Recovery Plan

If something goes wrong:
1. **Stop immediately**
2. **Extract backup**: `tar -xzf lume-outdoor-backup-YYYYMMDD.tar.gz`
3. **Compare files** to see what's missing
4. **Copy missing files** from backup

## 📝 Files to Keep for Reference

Even after cleanup, consider keeping:
- `package.json.old` - dependency reference
- `tailwind.config.js` - configuration reference  
- `README.md` - project documentation
- Any custom configuration files

## 🎯 Recommended Cleanup Approach

1. **Week 1**: Verify new site works perfectly
2. **Week 2**: Create backup and remove node_modules, dist folders
3. **Week 3**: Remove src/ folder after final confirmation
4. **Week 4**: Complete cleanup and reorganize

## ✅ Cleanup Checklist

- [ ] New Next.js site tested and working 100%
- [ ] Backup created and verified
- [ ] Old node_modules removed
- [ ] Old src/ directory removed (after final testing)
- [ ] Old config files cleaned up
- [ ] Project structure reorganized
- [ ] Documentation updated

---

**Remember: It's better to be safe than sorry. Keep backups until you're 100% confident everything works!**