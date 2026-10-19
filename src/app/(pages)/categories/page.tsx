import { getALLCategories } from "@/services/categories.services";
import { CategoryI } from "@/types/category";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

export default async function Categories() {

  const data = await getALLCategories();

  const categories: CategoryI[] = data.data;
  console.log(categories);
  

  return (
    <>
     <div className="min-h-screen bg-slate-50">
       <div className="bg-linear-to-r from-green-600 to-green-400 py-14 text-white">
        <div className="container mx-auto px-10">
          <p className=" text-md mb-4">
            <Link href="/" className="hover:underline ">Home</Link> /{" "}
            <span className="font-semibold text-white">Categories</span>
          </p>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
              <Layers className="size-8" />
            </span>
            <div>
              <h1 className="text-4xl font-bold mb-1">All Categories</h1>
              <p className="text-md">
                Browse our wide range of product categories</p>
                
            </div>
          </div>
        </div>
      </div>

       <div className="container mx-auto p-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-xl  p-3">

                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-xl h-50 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-[15px] font-semibold text-slate-800 group-hover:text-green-600">
                {category.name}
              </p>
              <span className="invisible flex items-center gap-1 text-[13px] font-medium text-green-600 group-hover:visible">
                View Subcategories <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
     </div>

    </>
  )
}
