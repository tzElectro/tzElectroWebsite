"use client";

import { getAdmin } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { uploadToSirv } from "@/lib/sirv.config";
import { X } from "lucide-react";

export default function Form() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getAdmin({ id: id });
      if (!res) {
        toast.error("Admin Not Found!");
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
      const path = `admins/${Date.now()}-${file.name}`;
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
    if (!data?.name) {
      toast.error("Name is required");
      return;
    }
    if (!data?.email) {
      toast.error("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      await createNewAdmin({ data });
      toast.success("Admin created successfully");
      setData(null);
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    if (!data?.name) {
      toast.error("Name is required");
      return;
    }
    if (!data?.email) {
      toast.error("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      await updateAdmin({ data });
      toast.success("Admin updated successfully");
      router.push('/admin/admins');
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Admin</h1>
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
                alt={data.name || 'Admin profile'}
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
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            placeholder="Enter admin name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            value={data?.email ?? ""}
            onChange={(e) => handleData("email", e.target.value)}
            placeholder="Enter admin email"
          />
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
