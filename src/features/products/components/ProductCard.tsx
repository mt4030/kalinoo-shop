import { Link } from "react-router-dom";
import { Star } from "lucide-react";

type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number | string;
    discount_percentage: number | string;
    thumbnail: string;
    rating?: number | string | null;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const price = Number(product.price);
  const discount = Number(product.discount_percentage) || 0;

  const finalPrice = price * (1 - discount / 100);

  const rating = Number(product.rating);

  const hasRating =
    product.rating !== null &&
    product.rating !== undefined &&
    product.rating !== "" &&
    Number.isFinite(rating);

  return (
    <Link
      to={`/product/${product.id}`}
      className="
        flex h-90 w-full flex-col
        overflow-hidden rounded-xl
        border border-zinc-200
        bg-white shadow-sm
        transition-all duration-200
        hover:border-[#DBEAFE]
        hover:shadow-md
      "
    >
      {/* PRODUCT IMAGE */}
      <div className="
        flex h-50 shrink-0
        items-center justify-center
        bg-[#F8FAFC] p-4
      ">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">

        {/* TITLE AND RATING */}
        <div>
          <p className="
            line-clamp-2
            text-sm font-medium
            leading-5 text-[#172554]
            sm:text-base
          ">
            {product.title}
          </p>

          {/* RATING */}
          <div className="mt-2 flex items-center gap-1.5">

            {hasRating ? (
              <>
                <Star
                  size={15}
                  strokeWidth={1.8}
                  className="fill-[#F5B301] text-[#F5B301]"
                />

                <span className="
                  text-xs font-semibold
                  tabular-nums text-zinc-700
                ">
                  {rating.toLocaleString("fa-IR", {
                    maximumFractionDigits: 1,
                  })}
                </span>

                <span className="text-[11px] text-zinc-400">
                  از ۵
                </span>
              </>
            ) : (
              <span className="text-xs text-zinc-400">
                بدون امتیاز
              </span>
            )}

          </div>
        </div>

        {/* PRICE */}
        <div className="mt-3">

          {/* ORIGINAL PRICE AND DISCOUNT */}
          <div className="flex items-center gap-2">

            {discount > 0 && (
              <>
                <span className="
                  text-xs text-zinc-400
                  line-through tabular-nums
                ">
                  {price.toLocaleString("fa-IR")}
                </span>

                <span className="
                  flex items-center justify-center
                  rounded-full bg-[#DC2626]
                  px-2 py-1
                  text-[10px] font-semibold
                  text-white
                ">
                  {discount.toLocaleString("fa-IR")}% 
                </span>
              </>
            )}

          </div>

          {/* FINAL PRICE */}
          <div className="
            mt-2 flex items-center gap-2
            text-lg font-bold text-[#172554]
            sm:text-xl
          ">
            <span className="text-xs font-medium text-zinc-500">
              تومان
            </span>

            <span className="tabular-nums">
              {finalPrice.toLocaleString("fa-IR", {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;