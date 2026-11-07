import { Heart } from "lucide-react";
import { useProductFavorite } from "@/features/favorites/hooks/useProductFavorite";

type ProductFavoriteButtonProps = {
  productId: number;
};

export default function ProductFavoriteButton({
  productId,
}: ProductFavoriteButtonProps) {
  const {
    isFavorite,
    toggleFavorite,
    isLoading,
    error,
  } = useProductFavorite(productId);

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={
        isFavorite
          ? "حذف از علاقه‌مندی‌ها"
          : "افزودن به علاقه‌مندی‌ها"
      }
      aria-pressed={isFavorite}
      title={error ? "خطا در دریافت علاقه‌مندی‌ها" : undefined}
      className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-xl border border-zinc-200 bg-white
        text-zinc-600 transition
        hover:border-red-200 hover:bg-red-50 hover:text-red-500
        disabled:cursor-wait disabled:opacity-50
      "
    >
      <Heart
        size={22}
        className={
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-current"
        }
      />
    </button>
  );
}