'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageConfig, updateImage } from '@/lib/imageConfig';
import { publicImagesList } from '@/lib/publicImages';
import { X, Upload, Link2, RefreshCw, Image as ImageIcon } from 'lucide-react';

const PhotoManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [imageUrls, setImageUrls] = useState({});
  const [activeCategory, setActiveCategory] = useState('hero');
  const [publicImages, setPublicImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  // Initialize with current config
  useEffect(() => {
    const urls = {};
    Object.entries(imageConfig).forEach(([category, images]) => {
      urls[category] = { ...images };
    });
    setImageUrls(urls);
    
    // Fetch public folder images
    fetchPublicImages();
  }, []);

  // Function to check if an image is in use
  const getImageUsage = (imagePath) => {
    const usage = [];
    Object.entries(imageConfig).forEach(([category, images]) => {
      Object.entries(images).forEach(([key, value]) => {
        if (value === imagePath || value === `/${imagePath}`) {
          usage.push(category);
        }
      });
    });
    return [...new Set(usage)]; // Remove duplicates
  };

  // Function to get public images from our list
  const fetchPublicImages = () => {
    setPublicImages([...publicImagesList]);
  };

  const handleUrlChange = (category, key, value) => {
    setImageUrls(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const applyChange = (category, key) => {
    const newUrl = imageUrls[category]?.[key];
    if (newUrl) {
      updateImage(category, key, newUrl);
    }
  };

  const applyAllChanges = () => {
    Object.entries(imageUrls).forEach(([category, images]) => {
      Object.entries(images).forEach(([key, url]) => {
        updateImage(category, key, url);
      });
    });
  };

  const resetToDefaults = () => {
    const urls = {};
    Object.entries(imageConfig).forEach(([category, images]) => {
      urls[category] = { ...images };
    });
    setImageUrls(urls);
  };

  // Only render in development and on client
  if (!isClient || process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-brand-green text-white p-3 rounded-full shadow-lg hover:bg-brand-green/90 transition-colors"
        title="Open Photo Manager"
      >
        <Upload className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-brand-green text-white p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Photo Manager</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="bg-gray-100 p-2 flex gap-1 overflow-x-auto">
            {Object.keys(imageConfig).map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowGallery(false);
                }}
                className={`px-4 py-2 rounded text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  activeCategory === category && !showGallery
                    ? 'bg-brand-green text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={() => setShowGallery(true)}
              className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                showGallery
                  ? 'bg-brand-green text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </button>
          </div>

          {/* Image List or Gallery */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showGallery ? (
              // Gallery View
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Public Folder Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {publicImages.map((imageName) => {
                    const usage = getImageUsage(`/${imageName}`);
                    return (
                      <div key={imageName} className="relative group">
                        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={`/${imageName}`}
                            alt={imageName}
                            fill
                            className="object-cover"
                            sizes="150px"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        
                        {/* Image Name */}
                        <p className="mt-2 text-xs text-gray-600 truncate">{imageName}</p>
                        
                        {/* Usage Badges */}
                        {usage.length > 0 && (
                          <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1">
                            {usage.map((category) => (
                              <span
                                key={category}
                                className="bg-brand-green text-white text-xs px-2 py-1 rounded capitalize"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Copy Path Button */}
                        <button
                          onClick={() => {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText(`/${imageName}`);
                            }
                          }}
                          className="absolute bottom-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white p-1 rounded text-xs"
                        >
                          Copy Path
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Category View
              imageUrls[activeCategory] && Object.entries(imageUrls[activeCategory]).map(([key, url]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <button
                    onClick={() => applyChange(activeCategory, key)}
                    className="text-xs bg-brand-green text-white px-3 py-1 rounded hover:bg-brand-green/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleUrlChange(activeCategory, key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      placeholder="Enter image URL or path"
                    />
                  </div>
                </div>

                {/* Preview */}
                {url && (
                  <div className="relative w-full h-24 mt-2">
                    <Image
                      src={url}
                      alt={`Preview of ${key}`}
                      fill
                      className="object-cover rounded border border-gray-200"
                      sizes="100%"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t bg-white p-4 space-y-2">
            <button
              onClick={applyAllChanges}
              className="w-full bg-brand-green text-white py-2 rounded-md hover:bg-brand-green/90 transition-colors font-medium"
            >
              Apply All Changes
            </button>
            <button
              onClick={resetToDefaults}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;