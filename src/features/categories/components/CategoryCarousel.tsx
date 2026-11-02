

import { useProductsByCategory } from "@/features/products/hooks/useProductsByCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../@/components/ui/carousel";
import { categoryCarouselData } from "./categoryCarouselData";
import ProductCard from "@/features/products/components/ProductCard";




type CarouselCategoryProps = {
  category: string;
};

export function CarouselCategory({ category }: CarouselCategoryProps) {
  const { data, isPending, isError, error } = useProductsByCategory(category);

  const categoryData = categoryCarouselData[category];

  if (!categoryData) {
    return <p>Category configuration not found: {category}</p>;
  }

  if (isPending) return <p>Loading {category}...</p>;

  if (isError) return <p>{error.message}</p>;

const products = data ?? [];

  return (
   
  <div className="my-8 md:border md:p-5 md:border-gray-200  shadow-sm ">
      
      <Carousel className="rounded p-1 lg:p-5">

        <h2 className="flex  justify-end  font-bold">{category}</h2>

        <CarouselContent className="-ml-1 mt-4 ">
         

          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 pl-1 md:basis-1/4 lg:basis-1/6"
            >
              <div className="p-1">

                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}

         
        </CarouselContent>

        <CarouselPrevious className="bottom-100 left-30 hidden translate-y-0 rounded sm:block" />
        <CarouselNext className="bottom-100 left-40 right-auto hidden rounded sm:block" />
      </Carousel>
    </div>
  );
}
