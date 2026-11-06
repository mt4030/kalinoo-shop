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

// Automatically derive valid category names.
type CategoryCarouselSlug = keyof typeof categoryCarouselData;

// Validate the category before accessing the object.
function isCategoryCarouselSlug(
  category: string
): category is CategoryCarouselSlug {
  return Object.prototype.hasOwnProperty.call(
    categoryCarouselData,
    category
  );
}

export function CarouselCategory({
  category,
}: CarouselCategoryProps) {

  // Fetch products.
  const {
    data,
    isPending,
    isError,
    error,
  } = useProductsByCategory(category);

  // Check category configuration.
  if (!isCategoryCarouselSlug(category)) {
    return (
      <p className="my-5 text-sm text-zinc-500">
        Category configuration not found: {category}
      </p>
    );
  }

  // TypeScript now knows category is a valid key.
  const categoryData = categoryCarouselData[category];

  if (isPending) {
    return (
      <p className="my-5 text-sm text-zinc-500">
        Loading {categoryData.title}...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="my-5 text-sm text-red-500">
        {error.message}
      </p>
    );
  }

  const products = data ?? [];

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="
      my-8 shadow-sm
      md:border md:border-gray-200 md:p-5
    ">
      <Carousel className="rounded p-1 lg:p-5">

        <h2 className="flex justify-end font-bold text-[#172554]">
          {categoryData.title}
        </h2>

        <CarouselContent className="-ml-1 mt-4">

          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="
                basis-1/2 pl-1
                md:basis-1/4
                lg:basis-1/6
              "
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}

        </CarouselContent>

        <CarouselPrevious className="
          bottom-100 left-30 hidden
          translate-y-0 rounded
          border-[#173B8F]
          hover:bg-[#DBEAFE]
          hover:text-gray-900
          sm:block
        " />

        <CarouselNext className="
          bottom-100 left-40 right-auto
          hidden rounded
          hover:bg-[#DBEAFE]
          hover:text-gray-900
          sm:block
        " />

      </Carousel>
    </div>
  );
}