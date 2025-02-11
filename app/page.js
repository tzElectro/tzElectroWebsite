import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import { getCollections } from "@/lib/firestore/collections/read_server";
import { getCategories } from "@/lib/firestore/categories/read_server";
import { getBrands } from "@/lib/firestore/brands/read_server";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProductSlider from "./components/Sliders";
import Collections from "./components/Collections";
import Categories from "./components/Categories";
import ProductsGridView from "./components/Products";
import CustomerReviews from "./components/CustomerReviews";
import Brands from "./components/Brands";
import Footer from "./components/Footer";
// import { useParams } from "next/navigation";

import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

// Increase revalidation time to reduce server load
export const revalidate = 300;
export const dynamic = "force-dynamic";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="w-full py-8 flex justify-center">
    <Spinner size="lg" />
  </div>
);

export default async function Home() {
  // Fetch data in parallel
  const [featuredProducts, collections, categories, products, brands] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getCollections().catch(() => []),
    getCategories().catch(() => []),
    getProducts().catch(() => []),
    getBrands().catch(() => []),
  ]);

  return (
    <main className="w-full min-h-screen flex flex-col text-white bg-[#363636] pt-[70px] md:pt-[80px]">
      <Navbar/>

      {/* Hero Section */}
      <HeroSection />

      <div className="flex-1 space-y-0">
        {/* Featured Products */}
        {featuredProducts.length > 0 ? (
          <section className="mb-0">
            <FeaturedProductSlider featuredProducts={featuredProducts} />
          </section>
        ) : (
          <section>
            <p className="text-center py-0">No featured products available at the moment.</p>
          </section>
        )}


        {/* Categories Section with lamp effect*/}
        {categories.length > 0 ? (
          <section className="pt-0 bg-[#2A2A2A]">
            <Categories categories={categories} />
          </section>
        ) : (
          <section className="pt-0 bg-[#2A2A2A]">
            <p className="text-center">No categories available.</p>
          </section>
        )}

        {/* Collections Section */}
        {collections.length > 0 ? (
          <section className="pt-0 bg-[#2A2A2A]">
            <Collections collections={collections} />
          </section>
        ) : (
          <section className="pt-0 bg-[#2A2A2A]">
            <p className="text-center">No collections found.</p>
          </section>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <section className="py-16">
            <ProductsGridView products={products} />
          </section>
        ) : (
          <section className="py-16">
            <p className="text-center">No products available.</p>
          </section>
        )}

        {/* Customer Reviews (Suspense Wrapped) */}
        <Suspense fallback={<LoadingSpinner />}>
          <section className="py-16 bg-[#2A2A2A]">
            <CustomerReviews />
          </section>
        </Suspense>

        {/* Brands Section */}
        {brands.length > 0 ? (
          <section className="py-16">
            <Brands brands={brands} />
          </section>
        ) : (
          <section className="py-16">
            <p className="text-center">No brands available.</p>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
