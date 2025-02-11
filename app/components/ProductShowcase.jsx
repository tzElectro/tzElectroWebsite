"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
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
  autoplaySpeed: 5000,
  fade: true,
};

const FeaturedProduct = memo(function FeaturedProduct({ product }) {
  if (!product?.id || !product?.featureImageURL) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#363636] p-5 md:px-24 md:py-20 w-full">
      <div className="flex-1 flex flex-col md:gap-10 gap-4">
        <h2 className="text-blue-500 text-xs md:text-base uppercase tracking-wider">
          New Fashion
        </h2>
        <div className="flex flex-col gap-4">
          <Link href={`/products/${product.id}`} className="group">
            <h1 className="md:text-4xl text-xl font-semibold group-hover:text-blue-500 transition-colors">
              {product.title}
            </h1>
          </Link>
          <p className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
        <AuthContextProvider>
          <div className="flex items-center gap-4">
            <Link href={`/checkout?type=buynow&productId=${product.id}`}>
              <Button 
                color="primary"
                size="sm"
                className="font-semibold"
              >
                BUY NOW
              </Button>
            </Link>
            <AddToCartButton productId={product.id} type="large" />
            <FavoriteButton productId={product.id} />
          </div>
        </AuthContextProvider>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Link href={`/products/${product.id}`} className="block w-full">
          <div className="relative w-full" style={{ height: '368px' }}>
            <img
              src={product.featureImageURL}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  );
});

FeaturedProduct.displayName = 'FeaturedProduct';

export default memo(function FeaturedProductSlider({ featuredProducts = [] }) {
  if (!featuredProducts?.length) {
    return null;
  }

  // Remove duplicates by ID
  const uniqueProducts = featuredProducts.filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  );

  if (!uniqueProducts.length) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {uniqueProducts.map((product) => (
          <FeaturedProduct key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
});
