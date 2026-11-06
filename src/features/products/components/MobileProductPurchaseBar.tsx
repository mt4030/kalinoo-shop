import CartQuantityControl from "@/features/cart/components/CartQuantityControl";
import type {
  MobileProductPurchaseBarBaseProps,
} from "@/types";
import { useCartStore } from "@/features/cart/store/cartStore";
type MobileProductPurchaseBarProps =
  MobileProductPurchaseBarBaseProps & {
    addItem: ReturnType<
      typeof useCartStore.getState
    >["addItem"];
  };


export default function MobileProductPurchaseBar({
  data,
  finalPrice,
  cartItem,
  productId,
  addItem,
}: MobileProductPurchaseBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-3 border-t border-zinc-200 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:hidden">

      <div className="flex flex-col gap-2">
        {data.discount_percentage > 0 && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-[#DC2626]">
              {data.discount_percentage}% تخفیف
            </span>

            <span className="text-sm text-zinc-400 line-through">
              {data.price.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold tracking-tight text-zinc-900">
            {Number(finalPrice).toLocaleString()}
          </span>

          <span className="text-xs font-medium text-zinc-500">
            تومان
          </span>
        </div>
      </div>

      {cartItem ? (
        <CartQuantityControl
          productId={productId}
          quantity={cartItem.quantity}
        />
      ) : (
        <button
          type="button"
          onClick={() => addItem(data)}
          className="w-full rounded-[12px] bg-[#2457D6] py-3 font-bold text-white transition hover:bg-[#173B8F]"
        >
          افزودن به سبد خرید
        </button>
      )}
    </div>
  );
}