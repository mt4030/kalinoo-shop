import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../../../../@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../@/components/ui/select";
import { Skeleton } from "../../../../@/components/ui/skeleton";

import { useBrands } from "@/features/categories/hooks/useBrands";
import { useCategories } from "@/features/categories/hooks/useCategories";
import ProductCard from "@/features/products/components/ProductCard";
import SidebarFilter from "@/features/search/components/SidebarFilter";
import { useSearchPageProducts } from "@/features/search/hooks/useSearchPageProducts";

const MIN_PRICE = 0;
const MAX_PRICE = 37000;
const PAGE_SIZE = 24;

const SORT_OPTIONS = [
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "rating", label: "بالاترین امتیاز" },
  { value: "discount", label: "بیشترین تخفیف" },
] as const;

type SortBy = (typeof SORT_OPTIONS)[number]["value"];

function readPriceParam(
  value: string | null,
  fallback: number
): number {
  if (value === null) return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.min(MAX_PRICE, Math.max(MIN_PRICE, parsed));
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  // Read values from URL.
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const selectedBrands = searchParams.getAll("brand");

  // Read and validate prices.
  const rawMinPrice = readPriceParam(
    searchParams.get("minPrice"),
    MIN_PRICE
  );

  const rawMaxPrice = readPriceParam(
    searchParams.get("maxPrice"),
    MAX_PRICE
  );

  // Make sure minimum price never exceeds maximum price.
  const minPrice = Math.min(rawMinPrice, rawMaxPrice);
  const maxPrice = Math.max(rawMinPrice, rawMaxPrice);

  // Read minimum rating.
  const rawMinRating = searchParams.get("minRating");
  const parsedMinRating =
    rawMinRating === null ? NaN : Number(rawMinRating);

  const minRating =
    Number.isFinite(parsedMinRating) &&
    parsedMinRating > 0 &&
    parsedMinRating <= 5
      ? parsedMinRating
      : undefined;

  // Read discount filter.
  const discountedOnly =
    searchParams.get("discounted") === "true";

  // Read and validate sorting option.
  const rawSortBy = searchParams.get("sortBy");

  const isValidSortBy = SORT_OPTIONS.some(
    (option) => option.value === rawSortBy
  );

  const sortBy: SortBy = isValidSortBy
    ? (rawSortBy as SortBy)
    : "price_asc";

  // Fetch categories.
  const {
    data: categories = [],
    isPending: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // Fetch brands based on selected category.
  const {
    data: brands = [],
    isPending: isBrandsLoading,
    isError: isBrandsError,
  } = useBrands(category);

  // Reset pagination whenever URL filters or search query change.
  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setPage(1);
  }, [searchParamsKey]);

  // Change category and remove selected brands.
  const handleCategoryChange = (slug: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (slug) {
        nextParams.set("category", slug);
      } else {
        nextParams.delete("category");
      }

      nextParams.delete("brand");

      return nextParams;
    });
  };

  // Add or remove a selected brand.
  const handleBrandChange = (brand: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const currentBrands = nextParams.getAll("brand");

      nextParams.delete("brand");

      const nextBrands = currentBrands.includes(brand)
        ? currentBrands.filter((item) => item !== brand)
        : [...currentBrands, brand];

      nextBrands.forEach((item) => {
        nextParams.append("brand", item);
      });

      return nextParams;
    });
  };

  // Update price range after the slider is released.
  const handlePriceChange = (min: number, max: number) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (min > MIN_PRICE) {
        nextParams.set("minPrice", String(min));
      } else {
        nextParams.delete("minPrice");
      }

      if (max < MAX_PRICE) {
        nextParams.set("maxPrice", String(max));
      } else {
        nextParams.delete("maxPrice");
      }

      return nextParams;
    });
  };

  // Change minimum rating.
  const handleMinRatingChange = (
    value: number | undefined
  ) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value !== undefined) {
        nextParams.set("minRating", String(value));
      } else {
        nextParams.delete("minRating");
      }

      return nextParams;
    });
  };

  // Turn discount filter on or off.
  const handleDiscountedChange = (checked: boolean) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (checked) {
        nextParams.set("discounted", "true");
      } else {
        nextParams.delete("discounted");
      }

      return nextParams;
    });
  };

  // Change product sorting.
  const handleSortChange = (value: SortBy) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value === "price_asc") {
        nextParams.delete("sortBy");
      } else {
        nextParams.set("sortBy", value);
      }

      return nextParams;
    });
  };

  // Clear filters without removing the search query.
  const handleClearFilters = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      [
        "category",
        "brand",
        "minPrice",
        "maxPrice",
        "minRating",
        "discounted",
      ].forEach((key) => nextParams.delete(key));

      return nextParams;
    });
  };

  // Fetch products from Supabase through TanStack Query.
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
  } = useSearchPageProducts({
    query,
    category,
    brands: selectedBrands,

    minPrice:
      minPrice > MIN_PRICE ? minPrice : undefined,

    maxPrice:
      maxPrice < MAX_PRICE ? maxPrice : undefined,

    minRating,
    discountedOnly,
    sortBy,

    page,
    pageSize: PAGE_SIZE,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Require a search term or category.
  if (!query.trim() && !category.trim()) {
    return (
      <p className="m-10 text-center text-zinc-500">
        لطفاً محصولی را جستجو کنید.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Filters */}
        <SidebarFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          isCategoriesLoading={isCategoriesLoading}
          isCategoriesError={isCategoriesError}
          brands={brands}
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}
          isBrandsLoading={isBrandsLoading}
          isBrandsError={isBrandsError}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          minRating={minRating}
          onMinRatingChange={handleMinRatingChange}
          discountedOnly={discountedOnly}
          onDiscountedOnlyChange={handleDiscountedChange}
          onClearFilters={handleClearFilters}
        />

        {/* Products */}
        <main>
          {/* Results count and sorting */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-zinc-600">
                {total.toLocaleString("fa-IR")} محصول پیدا شد
              </p>

              {isFetching && data && (
                <span className="text-xs text-zinc-400">
                  در حال بروزرسانی...
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0 text-sm text-zinc-500">
                مرتب‌سازی:
              </span>

              <Select
              
                value={sortBy}
                onValueChange={(value) =>
                  handleSortChange(value as SortBy)
                }
              >
                <SelectTrigger className="w-47.5">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>

                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Initial loading */}
          {isPending && !data ? (
            <ProductGridSkeleton />
          ) : isError && !data ? (
            <p className="py-10 text-center text-red-500">
              {error instanceof Error
                ? error.message
                : "خطا در دریافت محصولات"}
            </p>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-zinc-500">
              محصولی با این فیلترها پیدا نشد.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={page <= 1 || isFetching}
                onClick={() =>
                  setPage((current) => current - 1)
                }
              >
                قبلی
              </Button>

              <span className="text-sm text-zinc-600">
                صفحه {page.toLocaleString("fa-IR")} از{" "}
                {totalPages.toLocaleString("fa-IR")}
              </span>

              <Button
                variant="outline"
                disabled={page >= totalPages || isFetching}
                onClick={() =>
                  setPage((current) => current + 1)
                }
              >
                بعدی
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}