"use client";

import { useAdmins } from "@/lib/firestore/admins/read";
import { deleteAdmin } from "@/lib/firestore/admins/write";
import { Button, CircularProgress, Image } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, memo } from "react";
import toast from "react-hot-toast";

const Row = memo(function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);
    try {
      await deleteAdmin({ id: item?.id });
      toast.success("Successfully Deleted");
      router.refresh();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/admins?id=${item?.id}`);
  };

  return (
    <tr key={item?.id}>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <div className="flex justify-center">
          <Image
            width={40}
            height={40}
            src={item?.imageURL}
            alt={item?.name || "Admin image"}
            className="object-cover rounded-lg"
            radius="sm"
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex flex-col">
          <h2>{item?.name}</h2>
          <h3 className="text-xs text-gray-500">{item?.email}</h3>
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={handleUpdate}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            variant="light"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
            variant="light"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
});

export default function ListView() {
  const { data: admins, error, isLoading } = useAdmins();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error?.message || "Something went wrong"}
      </div>
    );
  }

  if (!admins?.length) {
    return (
      <div className="text-gray-500 p-4">
        No admins found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <h1 className="text-xl font-semibold">Admins</h1>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-y-3 min-w-full">
          <thead>
            <tr>
              <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg w-16">
                SN
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 w-20">
                Image
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-left">
                Name
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((item, index) => (
              <Row key={item.id} index={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
