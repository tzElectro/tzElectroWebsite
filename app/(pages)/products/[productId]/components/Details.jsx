"use client";
import { useState } from "react";
import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import AuthContextProvider from "@/contexts/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";

export default function Details({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="w-full p-4 flex flex-col gap-10 text-white">
      {/* Category & Brand */}
      <div className="flex gap-3 text-sm text-gray-500">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>

      {/* Product Title */}
      <h1 className="font-semibold text-3xl md:text-5xl text-blue-300 drop-shadow-md">
        {product?.title}
      </h1>

      {/* Rating & Reviews */}
      <Suspense fallback="Loading...">
        <RatingReview product={product} />
      </Suspense>

      {/* Price Section */}
      <div className="flex items-center gap-2 text-2xl font-bold text-green-400">
        ₹ {product?.salePrice}
        {product?.price && (
          <span className="text-gray-400 line-through text-lg">₹ {product?.price}</span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 my-4">
        <button className="px-3 py-2 bg-gray-700 rounded-md text-white text-lg" onClick={handleDecrease}>
          -
        </button>
        <span className="text-xl font-semibold">{quantity}</span>
        <button className="px-3 py-2 bg-gray-700 rounded-md text-white text-lg" onClick={handleIncrease}>
          +
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition">
            Buy Now
          </button>
        </Link>
        <AuthContextProvider>
          <AddToCartButton type="cute" productId={product?.id} quantity={quantity} />
        </AuthContextProvider>
        <AuthContextProvider>
          <FavoriteButton productId={product?.id} />
        </AuthContextProvider>
      </div>

      {/* Tabs Section */}
      <div className="mt-6">
        <div className="flex gap-4 border-b border-gray-700">
          <button
            className={`pb-2 ${activeTab === "details" ? "border-b-2 border-blue-500 text-blue-300" : "text-gray-400"}`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`pb-2 ${activeTab === "whyus" ? "border-b-2 border-blue-500 text-blue-300" : "text-gray-400"}`}
            onClick={() => setActiveTab("whyus")}
          >
            Why Us?
          </button>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg mt-3">
          {activeTab === "details" && (
            <div dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}></div>
          )}
          {activeTab === "whyus" && (
            <p className="text-gray-300">We provide top-quality LED lighting with the latest technology and premium materials.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Category Component */
async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-1 border px-3 py-1 rounded-full bg-gray-800">
        <img className="h-4" src={category?.imageURL} alt={category?.name} />
        <h4 className="text-xs font-semibold text-gray-300">{category?.name}</h4>
      </div>
    </Link>
  );
}

/* Brand Component */
async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-1 border px-3 py-1 rounded-full bg-gray-800">
      <img className="h-4" src={brand?.imageURL} alt={brand?.name} />
      <h4 className="text-xs font-semibold text-gray-300">{brand?.name}</h4>
    </div>
  );
}

/* Ratings & Reviews Component */
async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-sm text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews} Reviews)
      </h1>
    </div>
  );
}
