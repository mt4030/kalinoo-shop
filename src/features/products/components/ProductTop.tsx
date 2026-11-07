import { ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProductFavoriteButton from "@/features/favorites/components/ProductFavoriteButton";

type ProductTopBarProps = {
  productId: number;
};

export default function ProductTopBar({
  productId,
}: ProductTopBarProps) {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200 bg-white sm:hidden">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">

        {/* Product actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            type="button"
            onClick={() => navigate("/checkout/cart")}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl text-zinc-700
              transition hover:bg-zinc-100
            "
            aria-label="سبد خرید"
          >
            <ShoppingCart size={22} />
          </button>

          {/* Favorites */}
          <ProductFavoriteButton productId={productId} />
        </div>

        {/* Page title */}
        <p className="text-sm font-medium text-zinc-800">
          جزئیات کالا
        </p>

        {/* Back */}
        <button
          type="button"
          onClick={handleBack}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl text-zinc-700
            transition hover:bg-zinc-100
          "
          aria-label="بازگشت"
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}