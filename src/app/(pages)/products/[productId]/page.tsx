import { getSpecificProduct } from "@/services/products.services"
import { ProductI } from "@/types/product"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "@/components/products/productCarousel";
import AddProductToCartBtn from "@/components/cart/addProductToCartBtn";


export default async function productDetals({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params
    const data = await getSpecificProduct(productId)
    const product: ProductI = data.data

    return (
        <>
            <div className="container mx-auto p-10">

                <div className="bread-crumb ms-1">
                    <Breadcrumb>
                        <BreadcrumbList className="text-xl">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{product.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-3">
                        <div className="content mt-8 border-2 border-gray-100 p-3 rounded-2xl">
                            <ProductCarousel images={product.images} />
                        </div>

                    </div>
                    <div className="col-span-9">
                        <div className="content mt-8 rounded-2xl h-full">
                            <Card className="mx-auto flex w-full h-full justify-around flex-col overflow-hidden p-5">

                            <CardHeader className="h-full flex flex-col justify-between">
                                <Badge className="text-xl p-5">{product.category.name}</Badge>

                                <CardTitle
                                    className="text-3xl min-h-14 font-semibold"
                                    title={product.title}
                                >
                                    {product.title}
                                </CardTitle>

                                <CardDescription className="text-2xl">
                                    {product.description}
                                </CardDescription>

                                <p className="text-2xl font-medium">{product.price} EGP</p>

                                <div className="flex items-center gap-1">
                                    {[0, 1, 2, 3, 4].map((star) => {
                                        const filled = star < Math.floor(product.ratingsAverage);
                                        return (
                                            <Star
                                                key={star}
                                                className={
                                                    filled
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "fill-gray-500 text-gray-500"
                                                }
                                            />
                                        );
                                    })}
                                    <p className="ms-1 text-sm font-semibold text-gray-700">
                                        {product.ratingsAverage}
                                    </p>
                                </div>
                            </CardHeader>

                            <CardFooter className="mt-auto">
                                <AddProductToCartBtn productId={product._id} />
                            </CardFooter>
                        </Card>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}