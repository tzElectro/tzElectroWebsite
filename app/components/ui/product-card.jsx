"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GradientBorder } from "./gradient-border";
import { AnimatedCard } from "./animated-card";
import AddToCartButton from "../AddToCartButton";
import FavoriteButton from "../FavoriteButton";
import { QuickViewModal } from "./quick-view-modal";

export const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <AnimatedCard
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex flex-col h-full">
          {/* Product Image with Hover Effect */}
          <div className="relative block">
            <div className="relative h-48 overflow-hidden rounded-lg group">
              <Image
                src={product.featureImageURL}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Quick View Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-brand-dark px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors z-10"
              >
                Quick View
              </motion.button>

              {/* Price Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-2 left-2 bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
              >
                ${product.price}
              </motion.div>

              {/* Favorite Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-2 right-2"
              >
                <FavoriteButton productId={product.id} />
              </motion.div>
            </div>
          </div>

          {/* Product Info */}
          <Link href={`/products/${product.id}`} className="flex-1 p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white hover:text-brand-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {product.shortDescription}
            </p>
          </Link>

          {/* Action Buttons */}
          <div className="p-4 pt-0 flex items-center justify-between mt-auto">
            <Link href={`/checkout?type=buynow&productId=${product.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium"
              >
                Buy Now
              </motion.button>
            </Link>
            <AddToCartButton productId={product.id} />
          </div>

          {/* Category Tag */}
          {product.category && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 right-12 bg-brand-accent/10 text-brand-accent px-2 py-1 rounded-full text-xs backdrop-blur-sm"
            >
              {product.category}
            </motion.span>
          )}
        </div>
      </AnimatedCard>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
