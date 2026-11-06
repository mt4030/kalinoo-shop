import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";
import { Link } from "react-router-dom";
type CartQuantityControlProps = {
  productId: number;
  quantity: number;
};

export default function CartQuantityControl({
  productId,
  quantity,
}: CartQuantityControlProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  function handleDecrease() {
    if (quantity === 1) {
      removeItem(productId);
      return;
    }

    updateQuantity(productId, quantity - 1);
  }

  function handleIncrease() {
    updateQuantity(productId, quantity + 1);
  }

  return (
    <div className="flex  items-center gap-3">
<Link
  to="/checkout/cart"
  aria-label="رفتن به سبد خرید"
  className="
    flex h-12 w-12 shrink-0 items-center justify-center
    rounded-[12px]
    border border-[#DBEAFE]
    bg-[#EFF6FF]
    text-[#2457D6]
    transition-colors duration-200
    hover:border-[#2457D6]
    hover:bg-[#DBEAFE]
    hover:text-[#173B8F]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#2457D6]
    focus-visible:ring-offset-2
  "
>
    <ShoppingCart size={21} />
  </Link>
   
    <div className="flex w-full  items-center justify-between rounded-[8px] border border-blue-200 bg-white p-2">
      
  <button
        type="button"
        onClick={handleDecrease}
        aria-label={quantity === 1 ? "حذف محصول" : "کاهش تعداد"}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition  hover:text-red-600"
      >
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>
      
      <span className="text-lg font-bold text-zinc-800">
        {quantity}
      </span>

    
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="افزایش تعداد"
        className="flex h-9 w-9 items-center justify-center text-gray-700 hover:text-gray-900  transition "
      >
        <Plus size={18} />
      </button>
    </div> 
   
    </div>
  );
}