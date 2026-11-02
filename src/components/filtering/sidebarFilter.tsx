
import { useEffect, useState } from "react";
import { Slider } from "../../../@/components/ui/slider";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type SidebarFilterProps = {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  isCategoriesLoading: boolean;

  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  isBrandsLoading: boolean;
  isBrandsError: boolean;

  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
};

export default function SidebarFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isCategoriesLoading,
  brands,
  selectedBrands,
  onBrandChange,
  isBrandsLoading,
  isBrandsError,
  minPrice,
  maxPrice,
  onPriceChange,
}: SidebarFilterProps) {
  const [priceRange, setPriceRange] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);

  // Keep the local slider synchronized with URL values.
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-5 text-right">
      <h2 className="mb-5 text-lg font-bold text-zinc-900">
        فیلتر محصولات
      </h2>

      {/* Categories */}
      <section className="border-b border-zinc-200 pb-5">
        <h3 className="mb-3 font-semibold">دسته‌بندی</h3>

        {isCategoriesLoading ? (
          <p className="text-sm text-zinc-500">
            در حال بارگذاری دسته‌بندی‌ها...
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === ""}
                onChange={() => onCategoryChange("")}
              />
              همه دسته‌بندی‌ها
            </label>

            {categories.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.slug}
                  onChange={() => onCategoryChange(category.slug)}
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Brands */}
      <section className="border-b border-zinc-200 py-5">
        <h3 className="mb-3 font-semibold">برند</h3>

        {isBrandsLoading ? (
          <p className="text-sm text-zinc-500">
            در حال بارگذاری برندها...
          </p>
        ) : isBrandsError ? (
          <p className="text-sm text-red-500">
            خطا در بارگذاری برندها
          </p>
        ) : brands.length === 0 ? (
          <p className="text-sm text-zinc-500">
            برندی پیدا نشد.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandChange(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Price Range */}
      <section className="border-b border-zinc-200 py-5">
        <h3 className="mb-5 font-semibold">محدوده قیمت</h3>

        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex-1">
            <label className="mb-2 block text-xs text-zinc-500">
              از
            </label>

            <div className="rounded-lg border border-zinc-300 px-3 py-2 text-center text-sm">
              {priceRange[0].toLocaleString("fa-IR")}
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-xs text-zinc-500">
              تا
            </label>

            <div className="rounded-lg border border-zinc-300 px-3 py-2 text-center text-sm">
              {priceRange[1].toLocaleString("fa-IR")}
            </div>
          </div>
        </div>

        <Slider
          dir="rtl"
          min={0}
          max={37000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(value) => {
            onPriceChange(value[0], value[1]);
          }}
        />

        <div className="mt-3 flex justify-between text-xs text-zinc-500">
          <span>ارزان‌ترین</span>
          <span>گران‌ترین</span>
        </div>
      </section>

      {/* Rating */}
      <section className="border-b border-zinc-200 py-5">
        <h3 className="mb-3 font-semibold">امتیاز کاربران</h3>
        <p className="text-sm text-zinc-500">
          در مرحله بعد اضافه می‌کنیم.
        </p>
      </section>

      {/* Discount */}
      <section className="pt-5">
        <h3 className="mb-3 font-semibold">تخفیف</h3>
        <p className="text-sm text-zinc-500">
          در مرحله بعد اضافه می‌کنیم.
        </p>
      </section>
    </aside>
  );
}
