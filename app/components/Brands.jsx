"use client";

import Slider from "react-slick";
import Image from "next/image";
import { memo } from "react";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const BrandItem = memo(function BrandItem({ brand }) {
  if (!brand?.imageURL) return null;

  return (
    <div className="px-2">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="relative h-20 rounded-lg md:p-5 p-2 border overflow-hidden">
          <Image
            src={brand.imageURL}
            alt={brand.name || 'Brand logo'}
            fill
            className="object-contain"
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw"
          />
        </div>
      </div>
    </div>
  );
});

BrandItem.displayName = 'BrandItem';

export default memo(function Brands({ brands = [] }) {
  if (!brands?.length) {
    return null;
  }

  // If we have 2 or fewer brands, triple the array to ensure smooth sliding
  const displayBrands = brands.length <= 2 
    ? [...brands, ...brands, ...brands]
    : brands;

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5">
      <Slider {...settings}>
        {displayBrands.map((brand, index) => (
          <BrandItem 
            key={`${brand.id || brand.imageURL}-${index}`} 
            brand={brand} 
          />
        ))}
      </Slider>
    </div>
  );
});
