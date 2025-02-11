"use client";

import { getCollection } from "@/lib/firestore/collections/read_server";
import {
  createNewCollection,
  updateCollection,
} from "@/lib/firestore/collections/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { Button, Input } from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { uploadToSirv } from "@/lib/sirv.config";

export default function Form() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { data: products } = useProducts({ pageLimit: 2000 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCollection({ id: id });
      if (!res) {
        toast.error("Collection Not Found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key, value) => {
    setData((preData) => ({
      ...(preData ?? {}),
      [key]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const path = `collections/${Date.now()}-${file.name}`;
      const imageURL = await uploadToSirv(file, path);
      handleData('imageURL', imageURL);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = async () => {
    if (!data?.imageURL) {
      toast.error("Image is required");
      return;
    }
    if (!data?.title) {
      toast.error("Title is required");
      return;
    }
    if (!data?.products || data.products.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setIsLoading(true);
    try {
      await createNewCollection({ data });
      toast.success("Collection created successfully");
      setData(null);
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    if (!data?.title) {
      toast.error("Title is required");
      return;
    }
    if (!data?.products || data.products.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setIsLoading(true);
    try {
      await updateCollection({ data });
      toast.success("Collection updated successfully");
      router.push('/admin/collections');
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Collection</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          {data?.imageURL && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={data.imageURL}
                alt={data.title || 'Collection image'}
                fill
                className="object-cover"
              />
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleData('imageURL', null)}
              >
                <X size={16} />
              </Button>
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={data?.title ?? ""}
            onChange={(e) => handleData("title", e.target.value)}
            placeholder="Enter collection title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">
            Products <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 border rounded-xl p-2">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                setData={setData}
                isSelected={data?.products?.includes(product.id)}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          color="primary"
          isLoading={isLoading || uploadingImage}
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}

function ProductCard({ productId, setData, isSelected }) {
  const { data: product } = useProduct({ productId });
  if (!product) return null;

  return (
    <div
      onClick={() => {
        setData((preData) => {
          const products = preData?.products ?? [];
          if (products.includes(productId)) {
            return {
              ...preData,
              products: products.filter((id) => id !== productId),
            };
          } else {
            return {
              ...preData,
              products: [...products, productId],
            };
          }
        });
      }}
      className={`cursor-pointer border rounded-lg p-2 ${
        isSelected ? "border-blue-500" : ""
      }`}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={product.featureImageURL}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xs mt-1 font-medium line-clamp-2">{product.title}</h3>
    </div>
  );
}
