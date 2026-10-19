"use client"
import { Button } from "../ui/button";
import { addToCart } from "@/actions/cart.action";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";

export default function AddProductToCartBtn({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { handleCart } = useContext(CartContext)!
    const router = useRouter();

    async function addProduct() {
        try {
            setIsLoading(true);
            const data = await addToCart(productId);
            toast.success(data.message);
            handleCart();
            
        } catch (error:any) {
            toast.error(error.message);
            router.push("/login");
        }

        finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Button onClick={addProduct} className="w-full">
                {isLoading ? <>
                <span className="text-[17px]">Loading... <Spinner className="inline size-5" /></span>
                </> : <p className="text-[17px]">Add to Cart</p>}
            </Button>
        </>
    )
}
