"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { Meteors } from "./ui/meteors";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { memo } from "react";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const FeaturedProduct = memo(({ product }) => (
  <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#8A2BE2]/90 via-[#FF69B4]/90 to-[#00BFFF]/90 backdrop-blur-md p-6 rounded-xl border border-white/10">
    {/* Left: Product Info */}
    <div className="md:w-1/2 text-left">
      <h2 className="text-[#00FFFF] text-xs md:text-sm uppercase tracking-wider font-bold">
        Premium LED Lighting
      </h2>
      <Link href={`/products/${product.id}`} className="group">
        <h1 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#00FFFF] transition">
          {product.title}
        </h1>
      </Link>
      <p className="text-white/80 text-sm mt-2 max-w-lg">
        {product.shortDescription}
      </p>

      <AuthContextProvider>
        <div className="flex items-center gap-4 mt-6">
          <Link href={`/checkout?type=buynow&productId=${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] 
                text-white font-medium shadow-lg shadow-[#00FFFF]/25 
                hover:shadow-[#00FFFF]/50 transition-shadow"
            >
              Buy Now
            </motion.button>
          </Link>
          <AddToCartButton product={product} />
          <FavoriteButton productId={product.id} />
        </div>
      </AuthContextProvider>
    </div>

    {/* Right: Product Image */}
    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.featureImageURL}
          width={300}
          height={300}
          alt={product.title}
          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          priority
        />
      </Link>
    </div>
  </div>
));

FeaturedProduct.displayName = "FeaturedProduct";

export default memo(function FeaturedProductSlider({ featuredProducts = [] }) {
  if (!featuredProducts?.length) return null;

  return (
    <div className="relative overflow-hidden py-8 bg-[#0A0A0A] -mt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2]/90 via-[#FF69B4]/90 to-[#00BFFF]/90 backdrop-blur-md" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <Meteors number={20} />

      <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-8 relative z-10">
        Featured Products
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <FeaturedProduct key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
});