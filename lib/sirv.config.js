'use client';

const SIRV_DOMAIN = process.env.NEXT_PUBLIC_SIRV_DOMAIN;

export const SIRV_FOLDERS = {
  BRANDS: 'brands',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  BANNERS: 'banners'
};

/**
 * Uploads a file to Sirv using our backend API
 * @param {File} file - The file to upload
 * @param {string} folder - The destination folder (use SIRV_FOLDERS constant)
 * @returns {Promise<Object>} Upload result with URL and filename
 */
export async function uploadToSirv(file, folder = '') {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/sirv/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Upload failed: ${error.error}`);
    }

    const data = await response.json();
    return {
      url: data.url,
      filename: data.filename
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
 * Optimizes an image URL with Sirv parameters
 * @param {string} url - The original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - The optimized image URL
 */
export const optimizeImage = (url, options = {}) => {
  if (!url) return '';
  
  const {
    width = 800,
    height,
    quality = 85,
    format = 'auto',
    fit = 'contain'
  } = options;

  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('format', format);
  params.set('scale.option', fit);

  return `${url}?${params.toString()}`;
};

/**
 * Preset image optimization profiles
 */
export const imagePresets = {
  thumbnail: (url) => optimizeImage(url, { 
    width: 200, 
    height: 200, 
    quality: 80, 
    fit: 'cover' 
  }),
  preview: (url) => optimizeImage(url, { 
    width: 800,
    quality: 85
  }),
  full: (url) => optimizeImage(url, { 
    quality: 90
  }),
  banner: (url) => optimizeImage(url, { 
    width: 1200,
    height: 400,
    quality: 85,
    fit: 'cover'
  })
};
