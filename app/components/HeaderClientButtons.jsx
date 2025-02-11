"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import CartPopup from "./CartPopup";

export default function HeaderClientButtons() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  return (
    <div className="flex items-center gap-1">
      <Link href={`/favorites`}>
        {(data?.favorites?.length ?? 0) != 0 && (
          <Badge
            variant="solid"
            size="sm"
            className="text-white bg-red-500 text-[8px]"
            content={data?.favorites?.length ?? 0}
          >
            <button
              title="My Favorites"
              className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
            >
              <Heart size={14} />
            </button>
          </Badge>
        )}
        {(data?.favorites?.length ?? 0) === 0 && (
          <button
            title="My Favorites"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <Heart size={14} />
          </button>
        )}
      </Link>
      <CartPopup user={user} />
    </div>
  );
}
