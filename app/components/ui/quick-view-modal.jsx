"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { GradientBorder } from "./gradient-border";
import AddToCartButton from "../AddToCartButton";
import FavoriteButton from "../FavoriteButton";

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [product?.featureImageURL, ...(product?.images || [])];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-brand-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <GradientBorder className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={images[selectedImage]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </GradientBorder>

                  {/* Thumbnail Gallery */}
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                            selectedImage === idx ? "ring-2 ring-brand-primary" : ""
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} - Image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
                    <p className="text-3xl font-bold text-brand-primary">${product.price}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-300">{product.description}</p>
                    
                    {/* Features or Specs */}
                    {product.features && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white">Key Features:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-brand-primary text-white py-3 rounded-lg font-medium"
                      onClick={() => {
                        // Handle buy now
                        window.location.href = `/checkout?type=buynow&productId=${product.id}`;
                      }}
                    >
                      Buy Now
                    </motion.button>
                    <AddToCartButton productId={product.id} />
                    <FavoriteButton productId={product.id} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
