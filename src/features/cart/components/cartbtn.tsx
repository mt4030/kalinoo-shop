import { Minus, Plus,  Trash2 } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";

type CartQuantityControlProps = {
  productId: number;
  quantity: number;
};

export default function CartQuantitybtn({
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