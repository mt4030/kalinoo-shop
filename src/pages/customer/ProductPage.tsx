import { useParams } from "react-router-dom";

import CartQuantityControl from "@/features/cart/components/CartQuantityControl";
import { useCartStore } from "@/features/cart/store/cartStore";

import MobileProductPurchaseBar from "@/features/products/components/MobileProductPurchaseBar";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductTopBar from "@/features/products/components/ProductTop";

import { useProduct } from "@/features/products/hooks/useProduct";

import ProductFavoriteButton from "@/features/favorites/components/ProductFavoriteButton";
import { useTrackRecentlyViewed } from "@/features/history/hooks/useTrackRecentlyViewed";

export default function ProductPage() {
  const { id } = useParams();

  const productId = Number(id);

  // Fetch product using its Supabase primary key.
  const {
    data,
    isPending,
    isError,
    error,
  } = useProduct(productId);

  // Record the product visit.
  // This custom hook uses Supabase for authenticated customers
  // and Zustand for guests and demo customers.
  useTrackRecentlyViewed(data?.id);

  // Existing Zustand cart (we'll migrate this separately).
  const addItem = useCartStore((state) => state.addItem);

  // Calculate discounted price.
  const discountPercentage = Number(
    data?.discount_percentage ?? 0
  );

  const finalPrice =
    Number(data?.price ?? 0) *
    (1 - discountPercentage / 100);

  // Find the current product in the cart.
  // data.id is the real Supabase product ID.
  const cartItem = useCartStore((state) =>
    state.items.find(
      (item) => item.productId === data?.id
    )
  );

  // Validate URL parameter.
  if (!id || !Number.isInteger(productId) || productId <= 0) {
    return (
      <p className="p-6 text-center text-red-600">
        شناسه محصول معتبر نیست.
      </p>
    );
  }

  // Loading state.
  if (isPending) {
    return (
      <p className="p-6 text-center text-zinc-500">
        در حال بارگذاری محصول...
      </p>
    );
  }

  // Error state.
  if (isError) {
    return (
      <p className="p-6 text-center text-red-600">
        {error.message}
      </p>
    );
  }

  // Product not found.
  if (!data) {
    return (
      <p className="p-6 text-center text-zinc-500">
        محصول پیدا نشد.
      </p>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-360 flex-1 px-4 md:px-6 lg:px-8">

        {/* Mobile product top bar */}
        <ProductTopBar productId={data.id} />

        {/* Mobile purchase bar */}
        <MobileProductPurchaseBar
          data={data}
          finalPrice={finalPrice}
          cartItem={cartItem}
          productId={data.id}
          addItem={addItem}
        />

        {/* Main product information */}
        <div
          className="
            mt-10 flex flex-col gap-8
            rounded-[12px] border-zinc-200
            bg-white p-6 text-right
            sm:flex-row
          "
        >

          {/* Purchase / stock information */}
          <div
            className="
              z-50 hidden w-full flex-col
              rounded-[12px] border border-zinc-200
              p-5 sm:flex sm:w-64
            "
          >
            {/* Warranty */}
            <div className="mb-4 hidden border-b border-zinc-200 pb-4 sm:block">
              <span className="text-sm text-zinc-500">
                گارانتی
              </span>

              <div className="mt-1 text-sm font-medium text-zinc-800">
                {data.warranty_information}
              </div>
            </div>

            {/* Shipping */}
            <div className="mb-6 hidden sm:block">
              <span className="text-sm text-zinc-500">
                ارسال
              </span>

              <div className="mt-1 text-sm font-medium text-zinc-800">
                {data.shipping_information}
              </div>
            </div>

            {/* Price and cart */}
            <div className="mt-auto border-t border-zinc-200 pt-5">

              <div className="flex flex-col gap-2">

                {discountPercentage > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-600">
                      {discountPercentage}% تخفیف
                    </span>

                    <span className="text-sm text-zinc-400 line-through">
                      {Number(data.price).toLocaleString("fa-IR")}
                    </span>
                  </div>
                )}

                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold tracking-tight text-zinc-900">
                    {finalPrice.toLocaleString("fa-IR")}
                  </span>

                  <span className="text-xs font-medium text-zinc-500">
                    تومان
                  </span>
                </div>
              </div>

              {/* Cart quantity or add button */}
              {cartItem ? (
                <CartQuantityControl
                  productId={data.id}
                  quantity={cartItem.quantity}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => addItem(data)}
                  className="
                    w-full rounded-[12px]
                    bg-[#2457D6] py-3
                    font-bold text-white
                    transition hover:bg-[#173B8F]
                  "
                >
                  افزودن به سبد خرید
                </button>
              )}
            </div>
          </div>

          {/* Product information */}
          <div className="order-2 flex flex-1 flex-col justify-start pt-3 sm:order-0">

            {/* Brand */}
            <div className="mb-3 text-sm font-medium text-[#172554]">
              {data.brand}
            </div>

            {/* Product title and desktop favorite */}
            <div className="mb-5 flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-zinc-900">
                {data.title}
              </h1>

              {/* Desktop favorite button */}
              <div className="hidden sm:block">
                <ProductFavoriteButton productId={data.id} />
              </div>
            </div>

            {/* Rating */}
            <div className="pb-5">
              <span className="ml-5 px-3 py-1 text-sm font-bold text-gray-700">
                امتیاز خریداران
              </span>

              <span className="rounded-[12px] bg-yellow-50 px-3 py-1 text-sm font-bold text-yellow-700">
                {data.rating} از 5
              </span>
            </div>
          </div>

          {/* Product gallery */}
          <div className="order-1 sm:order-0">
            <ProductGallery images={data.images ?? []} />
          </div>
        </div>

        {/* Product description and specifications */}
        <div className="mt-10 space-y-8 text-right">

          {/* Description */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900">
              معرفی محصول
            </h2>

            <p className="text-sm leading-8 text-zinc-600">
              {data.description}
            </p>
          </section>

          {/* Product specifications */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-zinc-900">
              ویژگی‌های محصول
            </h2>

            <div className="grid grid-cols-3 gap-3">

              {/* Weight */}
              <div className="col-span-3 rounded-xl bg-zinc-100 p-4">
                <span className="mb-2 block text-xs font-medium text-zinc-500">
                  وزن محصول
                </span>

                <span className="text-base font-bold text-zinc-800">
                  {data.weight}
                </span>
              </div>

              {/* Width */}
              <div className="rounded-xl bg-zinc-100 p-3">
                <span className="mb-2 block text-xs text-zinc-500">
                  عرض
                </span>

                <span className="text-sm font-bold text-zinc-800">
                  {data.dimensions?.width}
                </span>
              </div>

              {/* Height */}
              <div className="rounded-xl bg-zinc-100 p-3">
                <span className="mb-2 block text-xs text-zinc-500">
                  ارتفاع
                </span>

                <span className="text-sm font-bold text-zinc-800">
                  {data.dimensions?.height}
                </span>
              </div>

              {/* Depth */}
              <div className="rounded-xl bg-zinc-100 p-3">
                <span className="mb-2 block text-xs text-zinc-500">
                  عمق
                </span>

                <span className="text-sm font-bold text-zinc-800">
                  {data.dimensions?.depth}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ReviewSection will be added after we build it. */}
      </div>
    </>
  );
}