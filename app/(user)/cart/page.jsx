"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState, memo } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="p-10 flex w-full justify-center">
        <CircularProgress />
      </div>
    );
  }

  const hasItems = data?.carts && data.carts.length > 0;

  return (
    <main className="flex flex-col gap-3 justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Cart</h1>
      
      {!hasItems && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="Empty cart" />
          </div>
          <h1 className="text-gray-600 font-semibold">
            Please Add Products To Cart
          </h1>
        </div>
      )}

      {hasItems && (
        <>
          <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
            {data.carts.map((item) => (
              <ProductItem item={item} key={item?.id} />
            ))}
          </div>
          <div>
            <Link href="/checkout?type=cart">
              <Button 
                color="primary"
                className="px-5 py-2"
                size="sm"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

const ProductItem = memo(function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const { data: product } = useProduct({ productId: item?.id });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    if (!confirm("Are you sure?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id !== item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsRemoving(false);
  };

  const handleUpdate = async (quantity) => {
    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: parseInt(quantity),
          };
        }
        return d;
      });
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsUpdating(false);
  };

  if (!product) return null;

  return (
    <div className="flex gap-3 items-center border px-3 py-3 rounded-xl">
      <div className="relative h-14 w-14 overflow-hidden rounded-lg">
        <Image
          src={product?.featureImageURL}
          alt={product?.title}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <Link 
          href={`/products/${product?.id}`}
          className="font-semibold text-sm hover:text-blue-500 transition-colors line-clamp-1"
        >
          {product?.title}
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-sm font-semibold">
            ₹{product?.salePrice}
          </span>
          {product?.price > product?.salePrice && (
            <span className="line-through text-xs text-gray-600">
              ₹{product?.price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            isDisabled={isUpdating || item?.quantity <= 1}
            onPress={() => handleUpdate(item?.quantity - 1)}
          >
            <Minus size={16} />
          </Button>

          <span className="text-sm w-6 text-center">{item?.quantity}</span>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            isDisabled={isUpdating || item?.quantity >= (product?.stock ?? 0)}
            onPress={() => handleUpdate(item?.quantity + 1)}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <Button
        isIconOnly
        size="sm"
        color="danger"
        variant="light"
        isLoading={isRemoving}
        onPress={handleRemove}
      >
        <X size={16} />
      </Button>
    </div>
  );
});
