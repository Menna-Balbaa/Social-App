"use server"

import { getServerToken } from "@/lib/auth";
import { addProductToCart, clearLoggedUserCart, getLoggedUserCart, removeProductFromCart, updateCartProductQuantity } from "@/services/cart.services";

async function requireToken() {
    const token = await getServerToken();
    if (!token) throw new Error("You must be logged in");
    return token;
}

export async function addToCart(productId: string) {
 
    return await addProductToCart(productId, await requireToken());
}

export async function getUserCart() {
    return await getLoggedUserCart(await requireToken());
}

export async function removeUserCart(productId: string) {
    return await removeProductFromCart(productId, await requireToken());
}

export async function updateProductQuantity(productId: string, count: number) {
    return await updateCartProductQuantity(productId, count, await requireToken());
}

export async function clearUserCart() {
    return await clearLoggedUserCart(await requireToken());
}