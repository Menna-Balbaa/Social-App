import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getALLProducts } from "@/services/products.services";
import { ProductI } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function Products() {
  const data = await getALLProducts();

  const products: ProductI[] = data.data;

  return (
    <div className="container mx-auto p-10">
      <h1 className="relative mb-8 ps-4 text-4xl font-bold before:absolute before:inset-s-0 before:top-0 before:h-full before:w-1.5 before:rounded-full before:bg-primary">
        Featured <span className="text-primary">Products</span>
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          >
            <Card className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <Image
                width={600}
                height={600}
                src={product.imageCover}
                alt={product.title}
                className="h-72 w-full border-b-4 border-primary object-cover"
              />

              <CardHeader>
                <p className="text-sm text-gray-500">{product.category.name}</p>

                <CardTitle
                  className="line-clamp-2 min-h-14 text-xl font-semibold leading-7"
                  title={product.title}
                >
                  {product.title}
                </CardTitle>

                <p className="text-lg font-medium">{product.price} EGP</p>

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
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}