// page.jsx
import { getProduct } from "@/lib/firestore/products/read_server";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";
import AddReview from "./components/AddReiveiw";
import AuthContextProvider from "@/contexts/AuthContext";

export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return {
    title: `${product?.title} | Product`,
    description: product?.shortDescription ?? "",
    openGraph: {
      images: [product?.featureImageURL],
    },
  };
}

export default async function Page({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#000000] text-white">
      <section className="flex flex-col md:flex-row gap-10 w-full max-w-6xl mx-auto">
        {/* Left: Product Image & Thumbnails */}
        <div className="md:w-2/5 w-full flex flex-col items-center">
          <Photos imageList={[product?.featureImageURL, ...(product?.imageList ?? [])]} />
        </div>

        {/* Right: Product Details */}
        <div className="md:w-3/5 w-full flex flex-col gap-6 bg-gray-900 p-6 rounded-lg shadow-md border border-blue-500">
          <Details product={product} />
        </div>
      </section>

      

      {/* Reviews & Add Review */}
      <div className="flex flex-col md:flex-row gap-6 py-10 w-full max-w-6xl mx-auto">
        <AuthContextProvider>
          <div className="md:w-1/2 w-full bg-gray-800 p-5 rounded-lg">
            <AddReview productId={productId} />
          </div>
          <div className="md:w-1/2 w-full bg-gray-800 p-5 rounded-lg">
            <Reviews productId={productId} />
          </div>
        </AuthContextProvider>
      </div>

      {/* Related Products */}
      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
}
