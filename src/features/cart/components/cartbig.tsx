
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../@/components/ui/card";

import { Label } from "../../../../@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";

import {
  Trash2,
  Package,
  CreditCard,
  Truck,
  Shield,
  ShoppingBag,
  ArrowRight,
  Info,
} from "lucide-react";

import CartQuantitybtn from "./cartbtn";
import { useCartStore } from "@/features/cart/store/cartStore";

import type { ShippingMethod } from "@/types";

const formatPrice = (price: number) => {
  return `$${price.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function Cartb() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const [shippingMethod, setShippingMethod] = useState("standard");

  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "ارسال استاندارد",
      price: 5.99,
      estimatedDays: "۳ تا ۵ روز",
      description: "ارسال معمولی سفارش",
    },
    {
      id: "express",
      name: "ارسال سریع",
      price: 12.99,
      estimatedDays: "۱ تا ۲ روز",
      description: "اولویت در ارسال سفارش",
    },
  ];

  // Calculate discounted product price
  const getDiscountedPrice = (
    price: number,
    discount: number
  ) => {
    return price * (1 - discount / 100);
  };

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const finalPrice = getDiscountedPrice(
      item.price,
      item.discount_percentage
    );

    return sum + finalPrice * item.quantity;
  }, 0);

  const shipping =
    items.length > 0
      ? shippingMethods.find(
          (method) => method.id === shippingMethod
        )?.price ?? 0
      : 0;

  const total = subtotal + shipping;

  // Total product quantities
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <main
      dir="rtl"
      className="
        mx-auto min-h-dvh
        w-full max-w-screen-2xl
        px-3 py-5
        sm:px-5 sm:py-7
        lg:px-8
      "
    >
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-lg font-bold text-[#172554] sm:text-xl">
            سبد خرید
          </h1>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            {totalItems.toLocaleString("fa-IR")} کالا در سبد خرید
          </p>
        </div>

        <Link
          to="/"
          className="
            flex items-center gap-1
            text-xs font-medium
            text-[#2457D6]
            transition hover:text-[#173B8F]
            sm:text-sm
          "
        >
          <ArrowRight size={16} />
          ادامه خرید
        </Link>

      </div>

      {/* MAIN CART LAYOUT */}
      <div
        className="
          grid grid-cols-1
          items-start gap-5
          lg:grid-cols-[minmax(0,1fr)_340px]
          lg:gap-7
        "
      >

        {/* =====================================
            MAIN CART SECTION
            Right side on desktop
            First section on mobile
        ====================================== */}

        <section className="min-w-0 space-y-4">

          {/* CART ITEMS */}
          {items.length === 0 ? (

            /* EMPTY CART */
            <Card className="
              flex min-h-[350px]
              flex-col items-center justify-center
              gap-4 rounded-xl
              border-zinc-200 bg-white
              px-5 py-12 text-center
            ">
              <div className="
                flex h-20 w-20 items-center
                justify-center rounded-full
                bg-[#EFF6FF]
              ">
                <ShoppingBag
                  size={36}
                  className="text-[#2457D6]"
                />
              </div>

              <h2 className="text-lg font-bold text-[#172554]">
                سبد خرید شما خالی است
              </h2>

              <p className="text-sm text-zinc-500">
                هنوز محصولی به سبد خرید اضافه نکرده‌اید.
              </p>

              <Button
                 className="
                  mt-2 rounded-lg
                  bg-[#2457D6] text-white
                  hover:bg-[#173B8F]
                "
              >
                <Link to="/">
                  مشاهده محصولات
                </Link>
              </Button>
            </Card>

          ) : (

            /* PRODUCT CARDS */
            items.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discount_percentage
              );

              const itemTotal = discountedPrice * item.quantity;

              return (
                <Card
                  key={item.productId}
                  className="
                    overflow-hidden
                    rounded-xl
                    border border-zinc-200
                    bg-white shadow-none
                    transition-colors
                    hover:border-[#DBEAFE]
                  "
                >
                  <CardContent className="p-0">

                    <div
                      className="
                        grid
                        grid-cols-[88px_minmax(0,1fr)]
                        gap-3 p-3
                        sm:grid-cols-[120px_minmax(0,1fr)]
                        sm:gap-5 sm:p-5
                        lg:grid-cols-[150px_minmax(0,1fr)_210px]
                        lg:items-center lg:gap-6 lg:p-6
                      "
                    >

                      {/* PRODUCT IMAGE */}
                      <div className="
                        flex h-28 w-[88px]
                        shrink-0 items-center
                        justify-center
                        overflow-hidden rounded-lg
                        bg-[#F8FAFC] p-2
                        sm:h-32 sm:w-[120px]
                        lg:h-36 lg:w-[150px]
                      ">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="
                        flex min-w-0 flex-col
                        justify-center gap-3
                        py-1
                      ">

                        <h3 className="
                          line-clamp-2
                          text-sm font-semibold
                          leading-6 text-[#172554]
                          sm:text-base
                        ">
                          {item.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                          <Package size={14} className="text-[#2457D6]" />
                          <span>محصول انتخاب‌شده</span>
                        </div>

                        {/* Discount */}
                        {item.discount_percentage > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="
                              rounded-full
                              bg-red-50 px-2.5 py-1
                              text-[11px] font-semibold
                              text-red-600
                            ">
                              {Number(item.discount_percentage).toLocaleString("fa-IR")}% تخفیف
                            </span>
                          </div>
                        )}

                      </div>

                      {/* PRICE + QUANTITY + REMOVE */}
                      <div className="
                        col-span-2
                        flex flex-wrap items-center
                        justify-between gap-3
                        border-t border-zinc-100
                        pt-3
                        lg:col-span-1
                        lg:flex-col lg:items-stretch
                        lg:justify-center lg:gap-5
                        lg:border-r lg:border-t-0
                        lg:border-zinc-100
                        lg:pr-6 lg:pt-0
                      ">

                        {/* Quantity */}
                        <div className="flex items-center">
                          <CartQuantitybtn
                            productId={item.productId}
                            quantity={item.quantity}
                          />
                        </div>

                        {/* Price */}
                        <div className="text-left lg:text-right">
                          <p className="
                            text-base font-bold
                            text-[#172554]
                            tabular-nums sm:text-lg
                          ">
                            {formatPrice(itemTotal)}
                          </p>

                          {item.discount_percentage > 0 && (
                            <p className="
                              mt-1 text-xs
                              text-zinc-400
                              line-through tabular-nums
                            ">
                              {formatPrice(
                                item.price * item.quantity
                              )}
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="
                            inline-flex items-center gap-1.5
                            text-xs font-semibold
                            text-[#64748B]
                            transition-colors
                            hover:text-red-600
                          "
                        >
                          <Trash2 size={15} />
                          حذف از سبد خرید
                        </button>

                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}

        </section>


        {/* =====================================
            ORDER SUMMARY
            Left side on desktop
            Below products on mobile
        ====================================== */}

        <aside className="
          w-full min-w-0
          lg:sticky lg:top-24
        ">

          <Card className="
            overflow-hidden
            rounded-xl
            border border-zinc-200
            bg-white shadow-none
          ">

            <CardHeader className="pb-3 sm:p-6">
              <CardTitle className="text-base font-bold text-[#172554] sm:text-lg">
                اطلاعات پرداخت
              </CardTitle>

              <CardDescription className="text-xs leading-6 text-zinc-500">
                تمامی قیمت‌ها به دلار محاسبه شده‌اند.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              {/* PRODUCT SUBTOTAL */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">
                  قیمت کالاها ({totalItems.toLocaleString("fa-IR")})
                </span>

                <span className="font-medium text-[#172554] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* SHIPPING */}
              <div className="space-y-3">

                <Label className="text-sm font-medium text-[#172554]">
                  نحوه ارسال
                </Label>

                <Select
                  value={shippingMethod}
                  onValueChange={(value) => {
  if (value !== null) {
    setShippingMethod(value);
  }
}}
                  disabled={items.length === 0}
                >
                  <SelectTrigger className="
                    h-11 w-full
                    border border-[#DBEAFE]
                    bg-white text-sm
                    text-[#172554]
                    focus:ring-2
                    focus:ring-[#DBEAFE]
                  ">
                    <SelectValue placeholder="انتخاب روش ارسال" />
                  </SelectTrigger>

                  <SelectContent className="
                    border border-zinc-200
                    bg-white text-[#172554]
                    shadow-lg
                  ">
                    {shippingMethods.map((method) => (
                      <SelectItem
                        key={method.id}
                        value={method.id}
                        className="focus:bg-[#EFF6FF]"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">
                            {method.name}
                          </span>

                          <span className="text-xs text-zinc-500">
                            {method.estimatedDays}
                          </span>

                          <span className="text-xs font-semibold text-[#2457D6]">
                            {formatPrice(method.price)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SHIPPING COST */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">
                  هزینه ارسال
                </span>

                <span className="font-medium text-[#172554] tabular-nums">
                  {items.length > 0
                    ? formatPrice(shipping)
                    : formatPrice(0)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="
                flex items-center justify-between
                border-t border-dashed
                border-zinc-200 pt-5
              ">
                <span className="text-sm font-semibold text-[#172554]">
                  جمع کل سفارش
                </span>

                <span className="
                  text-lg font-bold
                  text-[#2457D6]
                  tabular-nums
                ">
                  {formatPrice(total)}
                </span>
              </div>

              {/* SHIPPING INFORMATION */}
              <div className="
                flex items-start gap-3
                rounded-lg
                bg-[#EFF6FF]
                p-3
                text-xs leading-6
                text-[#173B8F]
              ">
                <Info size={18} className="mt-1 shrink-0 text-[#2457D6]" />

                <p>
                  هزینه نهایی ارسال بر اساس زمان و روش انتخاب‌شده محاسبه می‌شود.
                </p>
              </div>

              {/* FEATURES */}
              <div className="
                space-y-3
                border-t border-zinc-100
                pt-4
              ">
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Package size={16} className="text-[#2457D6]" />
                  <span>بسته‌بندی مناسب محصولات</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Shield size={16} className="text-[#2457D6]" />
                  <span>پرداخت امن</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Truck size={16} className="text-[#2457D6]" />
                  <span>ارسال سفارش به آدرس شما</span>
                </div>
              </div>

              {/* CHECKOUT */}
              <Button
                className="
                  h-12 w-full
                  rounded-lg
                  bg-[#2457D6]
                  text-sm font-bold text-white
                  transition-colors duration-200
                  hover:bg-[#173B8F]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                disabled={items.length === 0}
              >
                <CreditCard size={18} className="ml-2" />
                ثبت سفارش
              </Button>

            </CardContent>
          </Card>

        </aside>

      </div>
    </main>
  );
}
