const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getALLProducts() {
    const response = await fetch (`${BASE_URL}/api/v1/products`)
    const data = await response.json()
    return data
}