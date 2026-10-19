"use server"

import { getServerToken } from "@/lib/auth";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "@/services/wishlist.services";

async function requireToken() {
    const token = await getServerToken();
    if (!token) throw new Error("You must be logged in");
    return token;
}

export async function addToWishlist(productId: string) {
 
    return await addProductToWishlist(productId, await requireToken());
}

export async function getUserWishlist() {
    return await getLoggedUserWishlist(await requireToken());
}

export async function removeUserWishlist(productId: string) {
    return await removeProductFromWishlist(productId, await requireToken());
}