
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../../../@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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

// --------------------------------------------------
// EMPTY RESULTS ILLUSTRATION
// --------------------------------------------------

function EmptyResultsIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="محصولی پیدا نشد"
      className="h-40 w-56 sm:h-48 sm:w-64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="160" cy="105" r="85" fill="#EFF6FF" />

      {/* Product box */}
      <path
        d="M105 91L160 64L215 91V151L160 180L105 151V91Z"
        fill="white"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M105 91L160 120L215 91"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M160 120V180"
        stroke="#60A5FA"
        strokeWidth="3"
      />

      <path
        d="M137 78L190 108"
        stroke="#DBEAFE"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Magnifying glass */}
      <circle
        cx="205"
        cy="132"
        r="29"
        fill="white"
        stroke="#2457D6"
        strokeWidth="6"
      />

      <path
        d="M226 153L245 172"
        stroke="#2457D6"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path
        d="M194 132H216"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Small decorative elements */}
      <circle cx="79" cy="66" r="5" fill="#60A5FA" />
      <circle cx="247" cy="68" r="4" fill="#DBEAFE" />

      <path
        d="M80 139L88 139"
        stroke="#2457D6"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M235 43L240 53L250 58L240 63L235 73L230 63L220 58L230 53L235 43Z"
        fill="#60A5FA"
      />
    </svg>
  );
}

// --------------------------------------------------
// READ PRICE PARAMS
// --------------------------------------------------

function readPriceParam(
  value: string | null,
  fallback: number
): number {
  if (value === null) return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.min(MAX_PRICE, Math.max(MIN_PRICE, parsed));
}

// --------------------------------------------------
// SEARCH PAGE
// --------------------------------------------------

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

  // Support old misspelled URL value.
  const normalizedSortBy =
    rawSortBy === "price_accs" ? "price_asc" : rawSortBy;

  const sortBy: SortBy = SORT_OPTIONS.some(
    (option) => option.value === normalizedSortBy
  )
    ? (normalizedSortBy as SortBy)
    : "price_asc";

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    "مرتب‌سازی";

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
  // 3. RESET PAGINATION WHEN FILTERS CHANGE
  // --------------------------------------------------

  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setPage(1);
  }, [searchParamsKey]);

  // --------------------------------------------------
  // 4. FILTER HANDLERS
  // --------------------------------------------------

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

  // Price
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

  // Rating
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

  // Discount
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

  // Sorting
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

  // Clear filters but preserve search query and sorting.
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

  // Return to the default product listing.
  const handleShowAllProducts = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      [
        "q",
        "category",
        "brand",
        "minPrice",
        "maxPrice",
        "minRating",
        "discounted",
        "sortBy",
      ].forEach((key) => {
        nextParams.delete(key);
      });

      return nextParams;
    });
  };

  // --------------------------------------------------
  // 5. FETCH PRODUCTS
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
  // 6. PAGE LAYOUT
  // --------------------------------------------------

  return (
    <div
      dir="rtl"
      className="mx-auto max-w-7xl px-4 py-8 md:px-8"
    >
      <div
        className="
          grid grid-cols-1
          items-start gap-6
          lg:grid-cols-[16rem_minmax(0,1fr)]
        "
      >
        {/* FILTER SIDEBAR */}
        <div className="min-w-0">
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
        </div>

        {/* PRODUCTS SECTION */}
        <main className="min-w-0">

          {/* Results Header and Sorting */}
          <div
            className="
              mb-6 flex flex-col gap-4
              sm:flex-row sm:items-center
              sm:justify-between
            "
          >
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

            {/* Sorting */}
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
                <SelectTrigger
                  dir="rtl"
                  className="
                    w-[190px]
                    border border-[#DBEAFE]
                    bg-white text-[#172554]
                    shadow-sm
                    focus:ring-2 focus:ring-[#DBEAFE]
                  "
                >
                  <span className="truncate">
                    {selectedSortLabel}
                  </span>
                </SelectTrigger>

                <SelectContent
                  dir="rtl"
                  className="
                    z-[100]
                    border border-zinc-200
                    bg-white text-[#172554]
                    shadow-xl
                  "
                >
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="
                        focus:bg-[#EFF6FF]
                        focus:text-[#173B8F]
                      "
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* -------------------------------------------
              LOADING / ERROR / EMPTY / PRODUCTS
          -------------------------------------------- */}

          {/* LOADING / ERROR / EMPTY / PRODUCTS */}

{isPending && !data ? (
  <div
    className="
      flex min-h-[400px]
      items-center justify-center
      rounded-xl border border-zinc-200
      bg-white
    "
  >
    <p className="text-sm text-zinc-500">
      در حال بارگذاری محصولات...
    </p>
  </div>
) : isError && !data ? (
  <div
    className="
      flex min-h-[400px]
      items-center justify-center
      rounded-xl border border-zinc-200
      bg-white p-6 text-center
    "
  >
    <p className="text-sm text-red-500">
      {error instanceof Error
        ? error.message
        : "خطا در دریافت محصولات"}
    </p>
  </div>
) : products.length === 0 ? (
  <div
    className="
      flex min-h-[420px]
      flex-col items-center justify-center
      rounded-xl border border-zinc-200
      bg-white px-5 py-10 text-center
    "
  >
    <EmptyResultsIllustration />

    <h2 className="mt-4 text-base font-bold text-[#172554]">
      محصولی پیدا نشد
    </h2>

    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
      متأسفانه محصولی با مشخصات و فیلترهای انتخاب‌شده پیدا نکردیم.
      می‌توانید فیلترها را تغییر دهید یا همه محصولات را مشاهده کنید.
    </p>

    <Button
      onClick={handleShowAllProducts}
      className="
        mt-5 rounded-lg bg-[#2457D6]
        px-6 text-white hover:bg-[#173B8F]
      "
    >
      مشاهده همه محصولات
    </Button>
  </div>
) : (
  <div
    className="
      grid grid-cols-2 gap-4
      md:grid-cols-3
      xl:grid-cols-4
    "
  >
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
            <div
              className="
                mt-10 flex items-center
                justify-center gap-4
              "
            >
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
