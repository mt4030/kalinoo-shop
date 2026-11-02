
import { Button } from "../../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../@/components/ui/card";
import { Input } from "../../../../@/components/ui/input";
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
} from "lucide-react";

import { useState } from "react";

import CartQuantityControl from "./CartQuantityControl";
import { useCartStore } from "@/features/cart/store/cartStore";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export default function Cartb() {
  // Get cart data and actions from Zustand
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  // Local UI state: shipping selection doesn't belong in the cart store
  const [shippingMethod, setShippingMethod] = useState("standard");

  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "ارسال استاندارد",
      price: 5.99,
      estimatedDays: "3-5 روز",
      description: "ارسال رایگان بالای 200 دلار",
    },
    {
      id: "express",
      name: "ارسال اکسپرس",
      price: 12.99,
      estimatedDays: "1-2 روز",
      description: "اولویت ارسال همراه با اطلاعات",
    },
  ];

  // Calculate the actual discounted price of one product
  const getDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100);
  };

  // Calculate subtotal using Zustand cart items
  const subtotal = items.reduce((sum, item) => {
    const finalPrice = getDiscountedPrice(
      item.price,
      item.discount_percentage
    );

    return sum + finalPrice * item.quantity;
  }, 0);

  const shipping =
    shippingMethods.find((method) => method.id === shippingMethod)?.price ?? 0;

  const total = subtotal + shipping;

  // Total number of individual products, including quantities
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سبد خرید</CardTitle>
              <CardDescription>
                Review your order details and shipping information
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 0">

              {/* Shipping Method */}
              <div className="space-y-2">
                <Label>نحوه ارسال</Label>

                <Select
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <SelectTrigger className="w-full max-w-none data-[size=default]:h-auto">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>

                  <SelectContent className="!h-auto">
                    {shippingMethods.map((method) => (
                      <SelectItem
                        key={method.id}
                        value={method.id}
                        className="!h-auto"
                      >
                        <div className="flex flex-col justify-between text-start">
                          <div className="font-medium">
                            {method.name}
                          </div>

                          <div className="text-muted-foreground text-sm">
                            {method.estimatedDays}
                          </div>

                          <div className="font-medium">
                            ${method.price.toFixed(2)}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <Label>کد تخفیف</Label>

                <div className="flex gap-2">
                  <Input placeholder="Enter promo code" />
                  <Button variant="outline">ثبت</Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>هزینه ارسال</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="text-primary h-4 w-4" />
                  <span>Free returns within 30 days</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Shield className="text-primary h-4 w-4" />
                  <span>Secure payment</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Truck className="text-primary h-4 w-4" />
                  <span>Fast delivery</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full"
                disabled={items.length === 0}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                ثبت سفارش
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Cart Section */}
        <div className="space-y-6 lg:col-span-2">

          <div>
            <h1 className="text-2xl font-semibold">
              سبد خرید
            </h1>

            <p className="text-muted-foreground">
              کالا {totalItems}
            </p>
          </div>

          {/* Empty Cart */}
          {items.length === 0 ? (
            <Card className="flex flex-col items-center justify-center gap-4 py-16">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />

              <h2 className="text-lg font-semibold">
                سبد خرید شما خالی است
              </h2>

              <p className="text-muted-foreground text-sm">
                هنوز محصولی به سبد خرید اضافه نکرده‌اید.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const discountedPrice = getDiscountedPrice(
                  item.price,
                  item.discount_percentage
                );

                return (
                  <Card
                    key={item.productId}
                    className="overflow-hidden p-0"
                  >
                    <CardContent className="p-0">
                      <div className="flex h-full flex-col md:flex-row">

                        {/* Product Image */}
                        <div className="relative h-48 w-full md:h-auto md:w-32">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover md:w-32"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 p-6 pb-3">

                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">
                                {item.title}
                              </h3>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.productId)}
                              aria-label="حذف محصول"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">

                            {/* Quantity Control */}
                            <div className="flex items-center gap-2">
                              <CartQuantityControl
                                productId={item.productId}
                                quantity={item.quantity}
                              />
                            </div>

                            {/* Product Price */}
                            <div className="text-right">
                              <div className="font-medium">
                                ${(discountedPrice * item.quantity).toFixed(2)}
                              </div>

                              {item.discount_percentage > 0 && (
                                <div className="text-muted-foreground text-sm line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
