"use client"
import { useContext, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { addToWishlist, removeUserWishlist } from "@/actions/wishlist.action";
import { WishlistContext } from "@/context/wishlistContext";
import { WishlistMutationI } from "@/types/wishlist";

export default function AddProductToWishlistBtn({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { wishlistIds, setWishlistIds } = useContext(WishlistContext)!
    const router = useRouter();
    const isInWishlist = wishlistIds.includes(productId);

    async function toggleWishlist() {
        try {
            setIsLoading(true);
            const data: WishlistMutationI = isInWishlist
                ? await removeUserWishlist(productId)
                : await addToWishlist(productId);
            toast.success(data.message);
            if (Array.isArray(data.data)) setWishlistIds(data.data);
        } catch (error: any) {
            toast.error(error.message);
            router.push("/login");
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <button
            type="button"
            onClick={toggleWishlist}
            disabled={isLoading}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 inset-e-4 cursor-pointer disabled:opacity-50"
        >
            <Heart className={isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>
    )
}
