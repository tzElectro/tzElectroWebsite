'use client';

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense, memo, useEffect, useState } from "react";
import MyRating from "./MyRating";
import { Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductsGridSkeleton = memo(() => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Skeleton className="h-8 w-48 mx-auto rounded-lg mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 border p-4 rounded-lg shadow-md">
          <Skeleton className="rounded-lg aspect-square w-full" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  </div>
));

ProductsGridSkeleton.displayName = 'ProductsGridSkeleton';

function useProductReviews(productId) {
  const [reviewData, setReviewData] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    async function fetchReviews() {
      try {
        const counts = await getProductReviewCounts({ productId });
        setReviewData({
          averageRating: counts?.averageRating ?? 0,
          totalReviews: counts?.totalReviews ?? 0
        });
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  return { reviewData, loading };
}

const RatingReview = memo(({ product }) => {
  const { reviewData, loading } = useProductReviews(product?.id);
  return loading ? <RatingSkeleton /> : (
    <div className="flex items-center gap-2">
      <MyRating value={reviewData.averageRating} readOnly size="sm" />
      <span className="text-xs text-gray-500">
        {reviewData.averageRating.toFixed(1)} ({reviewData.totalReviews})
      </span>
    </div>
  );
});

const RatingSkeleton = memo(() => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-4 w-24 rounded" />
    <Skeleton className="h-4 w-16 rounded" />
  </div>
));

export const ProductCard = memo(({ product }) => {
  if (!product) return null;
  const isOutOfStock = product?.stock <= (product?.orders ?? 0);
  return (
    <div className="group flex flex-col gap-3 border p-4 rounded-lg hover:shadow-lg transition-all duration-200">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={product?.featureImageURL}
          alt={product?.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 z-10">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-sm font-semibold px-3 py-1 bg-red-500 rounded">
              Out Of Stock
            </span>
          </div>
        )}
      </div>
      <Link href={`/products/${product?.id}`} className="group/title">
        <h2 className="font-semibold line-clamp-2 text-sm group-hover/title:text-blue-500 transition-colors">
          {product?.title}
        </h2>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-green-500 text-sm font-semibold">₹{product?.salePrice}</span>
        {product?.price > product?.salePrice && (
          <span className="line-through text-xs text-gray-600">₹{product?.price}</span>
        )}
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">{product?.shortDescription}</p>
      <Suspense fallback={<RatingSkeleton />}>
        <RatingReview product={product} />
      </Suspense>
      {!isOutOfStock && (
        <div className="flex gap-2 mt-auto">
          <AuthContextProvider>
            <AddToCartButton productId={product?.id} type="large" />
          </AuthContextProvider>
        </div>
      )}
    </div>
  );
});

export default function ProductsGridView({ products = [], isLoading = false }) {
  if (isLoading) return <ProductsGridSkeleton />;
  if (!products?.length) return null;
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold text-center mb-8">Latest Products</h1>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item} className="min-h-[400px]">
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
