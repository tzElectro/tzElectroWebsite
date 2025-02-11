import { useState } from 'react';
import Image from 'next/image';
import { uploadToSirv } from '@/lib/sirv.config';

export default function ImageUploader({ 
  onUpload, 
  folder, 
  existingImage = null,
  className = '',
  aspectRatio = 'aspect-square',
  maxWidth = 'max-w-[200px]'
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existingImage);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      // Create a preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Upload the file
      const result = await uploadToSirv(file, folder);
      
      // Call the onUpload callback with the result
      onUpload(result);
    } catch (err) {
      setError(err.message);
      setPreviewUrl(existingImage); // Revert to existing image on error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <div className={`relative ${maxWidth} ${aspectRatio} bg-gray-100 rounded-lg overflow-hidden`}>
        {/* Image Preview */}
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Upload preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Upload Overlay */}
        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-white text-sm font-medium">
            {isUploading ? 'Uploading...' : 'Change Image'}
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
