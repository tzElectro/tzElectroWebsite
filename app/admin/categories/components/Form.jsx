"use client";

import { getCategory } from "@/lib/firestore/categories/read_server";
import {
  createNewCategory,
  updateCategory,
} from "@/lib/firestore/categories/write";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SirvUploader from "@/app/admin/components/SirvUploader";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category Not Found!");
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

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewCategory({ data: data, image: image });
      toast.success("Category Created!");
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCategory({ data: data, image: image });
      toast.success("Category Updated!");
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">{id ? "Update" : "Create"} Category</h1>
      <div className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs">
            Image <span className="text-red-500">*</span>
          </label>
          <SirvUploader
            folder="categories"
            onUploadComplete={(url) => setImage(url)}
            existingUrl={data?.imageURL || image}
            imagePreset="preview"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs" htmlFor="category-name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category-name"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full outline-none"
            placeholder="Enter category name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs" htmlFor="category-slug">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category-slug"
            value={data?.slug ?? ""}
            onChange={(e) => handleData("slug", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full outline-none"
            placeholder="Enter category slug"
          />
        </div>

        <Button
          className="w-full"
          color="primary"
          onClick={id ? handleUpdate : handleCreate}
          isLoading={isLoading}
        >
          {id ? "Update" : "Create"}
        </Button>
      </div>
    </section>
  );
}
