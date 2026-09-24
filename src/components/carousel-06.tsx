"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carouselImage from "@/assets/carousel.png"
import Image from "next/image";

const images = [
  carouselImage,
  carouselImage,
  carouselImage
]

export default function CarouselWithPagination() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto w-full mb-10">
      <Carousel
        className="overflow-hidden w-full object-contain"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent >
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                alt="dddepth-248"
                className="w-full h-100 rounded-xl object-cover"
                src={image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="inset-s-4" />
        <CarouselNext className="inset-e-4" />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            className={cn(
              "h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/50",
              current === index + 1 && "border-primary bg-primary"
            )}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
