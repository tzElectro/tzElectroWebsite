'use client';

import { useState } from 'react';
import SirvUploader from '@/app/admin/components/SirvUploader';

export default function Images({
  data,
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
}) {
  const handleFeatureImageUpload = (url) => {
    setFeatureImage(url);
  };

  const handleImagesUpload = (urls) => {
    setImageList(prev => [...prev, ...urls]);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold">Images</h1>
      
      {/* Feature Image */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs">
          Feature Image <span className="text-red-500">*</span>
        </label>
        <SirvUploader
          folder="products/feature"
          onUploadComplete={handleFeatureImageUpload}
          existingUrl={data?.featureImageURL || featureImage}
          imagePreset="preview"
        />
      </div>

      {/* Additional Images */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs">
          Additional Images
        </label>
        
        {/* Display existing images */}
        {(imageList?.length > 0 || data?.imageList?.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
            {[...(data?.imageList || []), ...(imageList || [])].map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Product image ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImageList(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add more images */}
        <SirvUploader
          folder="products/gallery"
          onUploadComplete={handleImagesUpload}
          multiple={true}
          imagePreset="preview"
        />
      </div>
    </section>
  );
}
