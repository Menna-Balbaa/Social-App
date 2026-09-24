import CarouselWithPagination from "@/components/carousel-06";
import Benefits from "@/components/home/benefits";

export default function Home() {
  return (
    <>
        <CarouselWithPagination />
      <section className="container mx-auto">
      <Benefits />
      </section>
    </>
  );
}
