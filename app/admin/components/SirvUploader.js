'use client';

import { useState, useCallback } from 'react';
import { uploadToSirv, imagePresets } from '@/lib/sirv.config';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * SirvUploader Component
 * @param {Object} props Component props
 * @param {Function} props.onUploadComplete Callback when upload completes
 * @param {string} props.folder Destination folder in Sirv
 * @param {string} props.existingUrl Existing image URL
 * @param {string} props.imagePreset Preset for image optimization
 * @param {string} props.accept Accepted file types
 * @param {boolean} props.multiple Allow multiple file uploads
 * @param {string} props.className Additional CSS classes
 */
export default function SirvUploader({
  onUploadComplete,
  folder = '',
  existingUrl = null,
  imagePreset = 'preview',
  accept = "image/*",
  multiple = false,
  className = ""
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(existingUrl);
  const [error, setError] = useState(null);

  const validateFile = useCallback((file) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    }

    return true;
  }, []);

  const handleUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // Validate all files first
      files.forEach(validateFile);

      if (multiple) {
        const results = [];
        for (let i = 0; i < files.length; i++) {
          setProgress((i / files.length) * 90);
          const result = await uploadToSirv(files[i], folder);
          results.push(result.url);
        }
        setProgress(100);
        
        if (onUploadComplete) {
          onUploadComplete(results);
        }
      } else {
        setProgress(10);
        const result = await uploadToSirv(files[0], folder);
        setProgress(100);
        setPreview(result.url);
        
        if (onUploadComplete) {
          onUploadComplete(result.url);
        }
      }

      toast.success('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message || 'Failed to upload image');
      toast.error(error.message || 'Failed to upload image');
      setPreview(existingUrl);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [folder, multiple, onUploadComplete, existingUrl, validateFile]);

  const previewUrl = preview ? imagePresets[imagePreset](preview) : null;

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        accept={accept}
        multiple={multiple}
        className="hidden"
        id="sirv-upload"
      />
      <label
        htmlFor="sirv-upload"
        className={`
          block w-full p-4 text-center border-2 border-dashed rounded-lg cursor-pointer 
          transition-colors duration-200
          ${uploading ? 'bg-gray-100' : 'hover:bg-gray-50'}
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        {previewUrl ? (
          <div className="relative w-full aspect-video">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-600">
              {uploading ? (
                `Uploading... ${progress}%`
              ) : (
                <>
                  <span className="block text-blue-600 font-semibold">
                    Click to upload image
                  </span>
                  <span className="text-sm text-gray-500">
                    JPEG, PNG, GIF, WebP up to {MAX_FILE_SIZE / 1024 / 1024}MB
                  </span>
                </>
              )}
            </div>
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error}
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  );
}
