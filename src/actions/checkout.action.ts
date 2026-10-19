"use server"

import { getServerToken } from "@/lib/auth";
import { cashCheckout, onlineCheckout } from "@/services/checkout.services";
import type { CheckoutFormValues } from "@/types/checkout";

async function requireToken() {
    const token = await getServerToken();
    if (!token) throw new Error("You must be logged in");
    return token;
}

export async function onlinePayment(cartId: string, formData: CheckoutFormValues) {
    return await onlineCheckout(cartId, formData, await requireToken());
}


export async function cashPayment(cartId: string, formData: CheckoutFormValues) {
    return await cashCheckout(cartId, formData, await requireToken());
}