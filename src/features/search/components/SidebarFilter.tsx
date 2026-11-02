
import { useEffect, useState, type ReactNode } from "react";

import { Badge } from "../../../../@/components/ui/badge";
import { Button } from "../../../../@/components/ui/button";
import { Checkbox } from "../../../../@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../@/components/ui/collapsible";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../@/components/ui/radio-group";
import { ScrollArea } from "../../../../@/components/ui/scroll-area";
import { Separator } from "../../../../@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../../@/components/ui/sheet";
import { Slider } from "../../../../@/components/ui/slider";
import { Switch } from "../../../../@/components/ui/switch";

import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

const MIN_PRICE = 0;
const MAX_PRICE = 37000;

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
  isCategoriesError: boolean;

  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  isBrandsLoading: boolean;
  isBrandsError: boolean;

  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;

  minRating: number | undefined;
  onMinRatingChange: (value: number | undefined) => void;

  discountedOnly: boolean;
  onDiscountedOnlyChange: (checked: boolean) => void;

  onClearFilters: () => void;
};

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

// Each section can independently expand or collapse.
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="py-3">
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-right text-sm font-semibold">
          <span>{title}</span>

          {open ? (
            <ChevronUp className="h-4 w-4 text-zinc-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-4">
          {children}
        </CollapsibleContent>
      </div>

      <Separator />
    </Collapsible>
  );
}

export default function SidebarFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isCategoriesLoading,
  isCategoriesError,
  brands,
  selectedBrands,
  onBrandChange,
  isBrandsLoading,
  isBrandsError,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onMinRatingChange,
  discountedOnly,
  onDiscountedOnlyChange,
  onClearFilters,
}: SidebarFilterProps) {
  const [priceRange, setPriceRange] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);

  const [mobileOpen, setMobileOpen] = useState(false);

  // Keep the slider synchronized with URL changes.
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const activeFiltersCount =
    Number(Boolean(selectedCategory)) +
    selectedBrands.length +
    Number(minPrice > MIN_PRICE || maxPrice < MAX_PRICE) +
    Number(minRating !== undefined) +
    Number(discountedOnly);

  // Rendered in both the desktop sidebar and mobile drawer.
  const renderFilterSections = () => (
    <div className="space-y-1">
      {/* CATEGORY */}
      <FilterSection title="دسته‌بندی">
        {isCategoriesError ? (
          <p className="text-sm text-red-500">
            خطا در بارگذاری دسته‌بندی‌ها
          </p>
        ) : isCategoriesLoading ? (
          <p className="text-sm text-zinc-500">
            در حال بارگذاری دسته‌بندی‌ها...
          </p>
        ) : (
          <ScrollArea className="h-48 pr-1">
            <RadioGroup
              dir="rtl"
              value={selectedCategory || "all"}
              onValueChange={(value) =>
                onCategoryChange(value === "all" ? "" : value)
              }
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="category-all" />

                <label
                  htmlFor="category-all"
                  className="cursor-pointer text-sm"
                >
                  همه دسته‌بندی‌ها
                </label>
              </div>

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-2"
                >
                  <RadioGroupItem
                    value={category.slug}
                    id={`category-${category.id}`}
                  />

                  <label
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer text-sm"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
        )}
      </FilterSection>

      {/* BRANDS */}
      <FilterSection title="برند">
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
            برندی برای این دسته‌بندی پیدا نشد.
          </p>
        ) : (
          <ScrollArea className="h-48 pr-1">
            <div className="space-y-3">
              {brands.map((brand, index) => {
                const checked = selectedBrands.includes(brand);

                return (
                  <div
                    key={brand}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={`brand-${index}`}
                      checked={checked}
                      onCheckedChange={(value) => {
                        if (value === true && !checked) {
                          onBrandChange(brand);
                        } else if (value !== true && checked) {
                          onBrandChange(brand);
                        }
                      }}
                    />

                    <label
                      htmlFor={`brand-${index}`}
                      className="cursor-pointer text-sm"
                    >
                      {brand}
                    </label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </FilterSection>

      {/* PRICE */}
      <FilterSection title="محدوده قیمت">
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs text-zinc-500">
              از
            </label>

            <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-center text-sm tabular-nums">
              {priceRange[0].toLocaleString("fa-IR")}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-zinc-500">
              تا
            </label>

            <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-center text-sm tabular-nums">
              {priceRange[1].toLocaleString("fa-IR")}
            </div>
          </div>
        </div>

        <Slider
  dir="rtl"
  min={MIN_PRICE}
  max={MAX_PRICE}
  step={100}
  value={priceRange}
  onValueChange={(value) => {
    if (typeof value !== "number") {
      setPriceRange([...value]);
    }
  }}
  onValueCommitted={(value) => {
    if (typeof value !== "number") {
      onPriceChange(
        value[0] ?? MIN_PRICE,
        value[1] ?? MAX_PRICE
      );
    }
  }}
/>

        <div className="mt-3 flex justify-between text-xs text-zinc-500">
          <span>ارزان‌ترین</span>
          <span>گران‌ترین</span>
        </div>
      </FilterSection>

      {/* RATING */}
      <FilterSection title="امتیاز کاربران">
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className="flex items-center gap-2"
            >
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => {
                  onMinRatingChange(
                    checked === true ? rating : undefined
                  );
                }}
              />

              <label
                htmlFor={`rating-${rating}`}
                className="flex cursor-pointer items-center gap-1 text-sm"
              >
                <span className="flex items-center">
                  {Array.from({ length: rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </span>

                <span className="text-zinc-600">
                  {rating.toLocaleString("fa-IR")} و بالاتر
                </span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* DISCOUNT */}
      <FilterSection title="تخفیف">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="discount-filter"
            className="cursor-pointer text-sm"
          >
            فقط کالاهای تخفیف‌دار
          </label>

          <Switch
            id="discount-filter"
            checked={discountedOnly}
            onCheckedChange={onDiscountedOnlyChange}
          />
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* MOBILE FILTER DRAWER */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setMobileOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            فیلترها

            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <SheetContent
            side="right"
            dir="rtl"
            showCloseButton={false}
            className="flex w-[min(24rem,90vw)] flex-col gap-0 p-0"
          >
            <SheetHeader className="border-b px-5 py-4 text-right">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-right">
                  فیلتر محصولات
                </SheetTitle>

                <SheetClose className="rounded-md p-2 hover:bg-zinc-100">
                  <X className="h-4 w-4" />
                </SheetClose>
              </div>
            </SheetHeader>

            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="text-xs text-zinc-500">
                {activeFiltersCount} فیلتر فعال
              </span>

              <Button
                variant="ghost"
                size="sm"
                disabled={activeFiltersCount === 0}
                onClick={onClearFilters}
              >
                پاک کردن همه
              </Button>
            </div>

            <ScrollArea className="min-h-0 flex-1 px-5">
              {renderFilterSections()}
            </ScrollArea>

            <SheetFooter className="flex-row border-t p-4">
              <Button
                variant="outline"
                className="flex-1"
                disabled={activeFiltersCount === 0}
                onClick={onClearFilters}
              >
                پاک کردن همه
              </Button>

              <SheetClose className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                مشاهده محصولات
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP FILTER SIDEBAR */}
      <aside
        dir="rtl"
        className="sticky top-24 hidden h-fit w-64 shrink-0 self-start rounded-xl border border-zinc-200 bg-white p-5 text-right lg:block"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            فیلتر محصولات
          </h2>

          {activeFiltersCount > 0 && (
            <Badge variant="secondary">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 px-0 text-zinc-500"
            onClick={onClearFilters}
          >
            پاک کردن همه
          </Button>
        )}

        {renderFilterSections()}
      </aside>
    </>
  );
}
