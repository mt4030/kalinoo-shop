
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../../../@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

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

// Read price values safely from URL.
function readPriceParam(
  value: string | null,
  fallback: number
): number {
  if (value === null) return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.min(MAX_PRICE, Math.max(MIN_PRICE, parsed));
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  // --------------------------------------------------
  // 1. READ FILTERS FROM URL
  // --------------------------------------------------

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const selectedBrands = [
    ...new Set(searchParams.getAll("brand")),
  ];

  // Price
  const urlMinPrice = readPriceParam(
    searchParams.get("minPrice"),
    MIN_PRICE
  );

  const urlMaxPrice = readPriceParam(
    searchParams.get("maxPrice"),
    MAX_PRICE
  );

  // Keep the range valid even if someone manually edits the URL.
  const minPrice = Math.min(urlMinPrice, urlMaxPrice);
  const maxPrice = Math.max(urlMinPrice, urlMaxPrice);

  // Rating
  const rawMinRating = searchParams.get("minRating");
  const parsedMinRating =
    rawMinRating === null ? NaN : Number(rawMinRating);

  const minRating =
    Number.isFinite(parsedMinRating) &&
    parsedMinRating > 0 &&
    parsedMinRating <= 5
      ? parsedMinRating
      : undefined;

  // Discount
  const discountedOnly =
    searchParams.get("discounted") === "true";

  // Sorting
  const rawSortBy = searchParams.get("sortBy");

  const sortBy: SortBy = SORT_OPTIONS.some(
    (option) => option.value === rawSortBy
  )
    ? (rawSortBy as SortBy)
    : "price_asc";

  // --------------------------------------------------
  // 2. FETCH CATEGORIES AND BRANDS
  // --------------------------------------------------

  const {
    data: categories = [],
    isPending: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const {
    data: brands = [],
    isPending: isBrandsLoading,
    isError: isBrandsError,
  } = useBrands(category);

  // --------------------------------------------------
  // 3. RESET PAGINATION WHEN URL FILTERS CHANGE
  // --------------------------------------------------

  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setPage(1);
  }, [searchParamsKey]);

  // --------------------------------------------------
  // 4. FILTER HANDLERS
  // --------------------------------------------------

  // Category: single selection.
  // Changing category also clears selected brands.
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

  // Brands: multiple selection.
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

  // Price: update URL only after the slider is released.
  const handlePriceChange = (min: number, max: number) => {
    const safeMin = Math.max(
      MIN_PRICE,
      Math.min(min, max, MAX_PRICE)
    );

    const safeMax = Math.min(
      MAX_PRICE,
      Math.max(min, max, MIN_PRICE)
    );

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (safeMin > MIN_PRICE) {
        nextParams.set("minPrice", String(safeMin));
      } else {
        nextParams.delete("minPrice");
      }

      if (safeMax < MAX_PRICE) {
        nextParams.set("maxPrice", String(safeMax));
      } else {
        nextParams.delete("maxPrice");
      }

      return nextParams;
    });
  };

  // Rating: one minimum rating threshold.
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

  // Discount: on/off.
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

  // Sorting.
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

  // Clear filters but preserve the search query and sorting.
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
      ].forEach((key) => {
        nextParams.delete(key);
      });

      return nextParams;
    });
  };

  // --------------------------------------------------
  // 5. FETCH FILTERED PRODUCTS FROM SUPABASE
  // --------------------------------------------------

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

  // --------------------------------------------------
  // 6. EMPTY SEARCH STATE
  // --------------------------------------------------

  if (!query.trim() && !category.trim()) {
    return (
      <p className="m-10 text-center text-zinc-500">
        لطفاً محصولی را جستجو کنید.
      </p>
    );
  }

  // --------------------------------------------------
  // 7. PAGE LAYOUT
  // --------------------------------------------------

  return (
    <div
      dir="rtl"
      className="mx-auto max-w-7xl px-4 py-8 md:px-8"
    >
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

        {/* -------------------------------------------
            FILTER SIDEBAR
            Always rendered, even when products fetch.
        -------------------------------------------- */}

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

        {/* -------------------------------------------
            PRODUCTS SECTION
        -------------------------------------------- */}

        <main className="min-w-0">

          {/* Results header and sorting */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">
              <p className="text-sm text-zinc-600">
                {total.toLocaleString("fa-IR")} محصول پیدا شد
              </p>

              {isFetching && (
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
                onValueChange={(value) => {
                  if (value !== null) {
                    handleSortChange(value as SortBy);
                  }
                }}
              >
                <SelectTrigger className="w-[190px]">
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
            <p className="py-16 text-center text-zinc-500">
              در حال بارگذاری محصولات...
            </p>
          ) : isError && !data ? (
            <p className="py-16 text-center text-red-500">
              {error instanceof Error
                ? error.message
                : "خطا در دریافت محصولات"}
            </p>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold">
                محصولی پیدا نشد
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                فیلترها را تغییر دهید یا پاک کنید.
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={handleClearFilters}
              >
                پاک کردن فیلترها
              </Button>
            </div>
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
                onClick={() => {
                  setPage((current) => current - 1);
                }}
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
                onClick={() => {
                  setPage((current) => current + 1);
                }}
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
