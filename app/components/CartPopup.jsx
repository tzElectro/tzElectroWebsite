"use client";

import { useUser } from "@/lib/firestore/user/read";
import { Popover, PopoverTrigger, PopoverContent, Badge } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPopup({ user }) {
  const { data } = useUser({ uid: user?.uid });

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <div>
          {(data?.carts?.length ?? 0) != 0 && (
            <Badge
              variant="solid"
              size="sm"
              className="text-white bg-red-500 text-[8px]"
              content={data?.carts?.length ?? 0}
            >
              <button
                title="My Cart"
                className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
              >
                <ShoppingCart size={14} />
              </button>
            </Badge>
          )}
          {(data?.carts?.length ?? 0) === 0 && (
            <button
              title="My Cart"
              className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
            >
              <ShoppingCart size={14} />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Shopping Cart</h3>
            <span className="text-sm text-gray-500">
              {data?.carts?.length ?? 0} items
            </span>
          </div>
          
          {data?.carts?.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-[250px] overflow-y-auto">
                {data?.carts?.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    {item.image && (
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
                {data?.carts?.length > 3 && (
                  <p className="text-sm text-center text-gray-500">
                    and {data.carts.length - 3} more items...
                  </p>
                )}
              </div>
              
              <div className="pt-3 border-t">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    ${data?.carts?.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <Link href="/cart">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Cart
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
