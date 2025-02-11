"use client";

import { motion } from "framer-motion";

export const ProductCardSkeleton = () => {
  return (
    <div className="relative h-full rounded-xl overflow-hidden bg-brand-dark/50 backdrop-blur-sm">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-shine" />
      </div>

      {/* Image Placeholder */}
      <div className="relative h-48 bg-gray-800/50" />

      {/* Content Placeholder */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-800/50 rounded-md w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-800/50 rounded-md w-full" />
          <div className="h-4 bg-gray-800/50 rounded-md w-2/3" />
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-8 bg-gray-800/50 rounded-md w-20" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-800/50 rounded-md" />
            <div className="h-8 w-8 bg-gray-800/50 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
