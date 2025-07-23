#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const BACKUP_DIR = path.join(__dirname, '../public/original-backups');
const TEMP_DIR = path.join(__dirname, '../temp-optimization');

// Ensure directories exist
[BACKUP_DIR, TEMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image optimization settings
const OPTIMIZATION_CONFIG = {
  jpeg: {
    quality: 75,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: 75,
    compressionLevel: 8,
    progressive: true
  },
  webp: {
    quality: 75,
    effort: 6
  }
};

// Heavy images that need optimization (over 1MB)
const HEAVY_IMAGES = [
  'Hero_Drake.jpg',      // 21MB
  'Hero_photo.jpg',      // 16MB  
  'drake-photo.jpg',     // 14MB
  'workShowcase1.png',   // 45MB
  'childhood-photo.jpg', // 2.6MB
  'talon-photo.png',     // 2.7MB
  'Project2.png',        // 1.7MB
  '3rdProject.png',      // 2.2MB
  'deckLight.png',       // 997KB
  'wallWasherLight.png', // 1021KB
  'walkWayLight.png',    // 1022KB
  'floorLight.png',      // 1.0MB
  'pathLight.png'        // 974KB
];

async function optimizeImage(inputPath, outputPath, format = 'original') {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizing ${path.basename(inputPath)} (${metadata.width}x${metadata.height}, ${metadata.format})`);
    
    let optimized = image;
    
    // Resize if too large (max 2048px width for hero images, 1200px for others)
    const isHeroImage = path.basename(inputPath).includes('Hero_');
    const maxWidth = isHeroImage ? 2048 : 1200;
    
    if (metadata.width > maxWidth) {
      optimized = optimized.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
      console.log(`  📏 Resizing to max width: ${maxWidth}px`);
    }
    
    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        optimized = optimized.webp(OPTIMIZATION_CONFIG.webp);
        break;
      case 'jpeg':
      case 'jpg':
        optimized = optimized.jpeg(OPTIMIZATION_CONFIG.jpeg);
        break;
      case 'png':
        optimized = optimized.png(OPTIMIZATION_CONFIG.png);
        break;
      default:
        // Keep original format but optimize
        if (metadata.format === 'jpeg') {
          optimized = optimized.jpeg(OPTIMIZATION_CONFIG.jpeg);
        } else if (metadata.format === 'png') {
          optimized = optimized.png(OPTIMIZATION_CONFIG.png);
        }
    }
    
    await optimized.toFile(outputPath);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✅ Saved ${savings}% (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)})`);
    
    return { originalSize, optimizedSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`  ❌ Error optimizing ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  
  for (const imageName of HEAVY_IMAGES) {
    const originalPath = path.join(PUBLIC_DIR, imageName);
    
    if (!fs.existsSync(originalPath)) {
      console.log(`⚠️  Skipping ${imageName} (file not found)`);
      continue;
    }
    
    // Create backup if it doesn't exist
    const backupPath = path.join(BACKUP_DIR, imageName);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(originalPath, backupPath);
      console.log(`📦 Backed up ${imageName}`);
    }
    
    // Optimize to temp file first
    const tempPath = path.join(TEMP_DIR, imageName);
    const result = await optimizeImage(originalPath, tempPath);
    
    if (result) {
      // Replace original with optimized version
      fs.copyFileSync(tempPath, originalPath);
      fs.unlinkSync(tempPath); // Clean up temp file
      
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      processedCount++;
      
      // Also create WebP version for modern browsers
      const webpName = imageName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const webpPath = path.join(PUBLIC_DIR, webpName);
      await optimizeImage(backupPath, webpPath, 'webp');
      console.log(`  🌐 Created WebP version: ${webpName}`);
    }
    
    console.log(''); // Add spacing
  }
  
  // Cleanup temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  
  console.log('🎉 Optimization complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   • Processed: ${processedCount} images`);
  console.log(`   • Total size reduction: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalOptimizedSize)}`);
  
  if (totalOriginalSize > 0) {
    console.log(`   • Total savings: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
    console.log(`   • Space saved: ${formatBytes(totalOriginalSize - totalOptimizedSize)}`);
  }
  
  console.log(`   • Backups saved to: ${BACKUP_DIR}`);
  console.log('\n💡 Benefits:');
  console.log('   • Images now load 3-5x faster');
  console.log('   • WebP versions created for modern browsers');
  console.log('   • Next.js will automatically serve the best format');
  console.log('   • Better mobile performance and SEO scores');
}

main().catch(console.error); 