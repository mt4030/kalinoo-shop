

import { useBrands } from "@/features/categories/hooks/useBrands";
import { useCategories } from "@/features/categories/hooks/useCategories";
import ProductCard from "@/features/products/components/ProductCard";
import SidebarFilter from "@/features/search/components/SidebarFilter";
import { useSearchPageProducts } from "@/features/search/hooks/useSearchPageProducts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  // Read search parameters from URL
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const selectedBrands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice") ?? "";
const maxPrice = searchParams.get("maxPrice") ?? "";

  // Fetch categories
  const {
    data: categories = [],
    isPending: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  // Fetch brands based on selected category
  const {
    data: brands = [],
    isPending: isBrandsLoading,
    isError: isBrandsError,
  } = useBrands(category);

  // Change category
  const handleCategoryChange = (slug: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (slug) {
        nextParams.set("category", slug);
      } else {
        nextParams.delete("category");
      }

      // Clear brands when category changes
      nextParams.delete("brand");

      return nextParams;
    });
  };

  // Toggle selected brands
  const handleBrandChange = (brand: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      const currentBrands = nextParams.getAll("brand");

      if (currentBrands.includes(brand)) {
        // Remove selected brand
        nextParams.delete("brand");

        currentBrands
          .filter((item) => item !== brand)
          .forEach((item) => nextParams.append("brand", item));
      } else {
        // Add new selected brand
        nextParams.append("brand", brand);
      }

      return nextParams;
    });
  };

const handlePriceChange = (
  min: string,
  max: string
) => {
  setSearchParams((currentParams) => {
    const nextParams = new URLSearchParams(currentParams);

    if (min) {
      nextParams.set("minPrice", min);
    } else {
      nextParams.delete("minPrice");
    }

    if (max) {
      nextParams.set("maxPrice", max);
    } else {
      nextParams.delete("maxPrice");
    }

    return nextParams;
  });
};


  

  // Reset pagination whenever filters change
  useEffect(() => {
    setPage(1);
  }, [query, category, selectedBrands.join("|")]);

  // Fetch products
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
    page,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 24);

  // Require a search term or category
  if (!query.trim() && !category.trim()) {
    return (
      <p className="m-10 text-center">
        لطفاً محصولی را جستجو کنید.
      </p>
    );
  }

  // Initial loading
  if (isPending) {
    return (
      <p className="m-10 text-center">
        در حال بارگذاری محصولات...
      </p>
    );
  }

  // Product error
  if (isError) {
    return (
      <p className="m-10 text-center text-red-500">
        {error.message}
      </p>
    );
  }

  return (
    <div className="m-5 md:m-10 lg:m-15">
      <div className="mx-auto mt-5 max-w-7xl px-4 pb-12 md:px-8">

        {/* Results header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-600">
            {total} محصول پیدا شد
          </p>

          {isFetching && (
            <span className="text-xs text-zinc-400">
              در حال بروزرسانی...
            </span>
          )}
        </div>

        {/* Sidebar + Product grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Filters */}
          <div>
            {isCategoriesError ? (
              <p className="text-sm text-red-500">
                خطا در بارگذاری دسته‌بندی‌ها
              </p>
            ) : (
              <SidebarFilter
                categories={categories}
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
                isCategoriesLoading={isCategoriesLoading}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                isBrandsLoading={isBrandsLoading}
isBrandsError={isBrandsError}
  minPrice={minPrice}
  maxPrice={maxPrice}
  onPriceChange={handlePriceChange}
              />
            )}
          </div>

          {/* Products */}
          <div>
            {products.length === 0 ? (
              <p className="py-10 text-center text-zinc-500">
                محصولی پیدا نشد.
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
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border px-4 py-2 disabled:opacity-40"
                >
                  قبلی
                </button>

                <span>
                  صفحه {page} از {totalPages}
                </span>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border px-4 py-2 disabled:opacity-40"
                >
                  بعدی
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
