import { ArrowRight, Heart, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"



export default function ProductTopBar() {
  const navigate = useNavigate()
const isLoggedIn=true
  const handleBack = () => {
    navigate(-1)
  }

  const handleWishlist = () => {
    if (isLoggedIn) {
    
      console.log("Add to wishlist")
      return
    }

    navigate("/login")
  }

  return (
    <div className="fixed sm:hidden left-0 right-0 top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
         <div className="flex items-center gap-2">
         
          {/* Cart */}
          <button
            type="button"
            onClick={() => navigate("/checkout/cart")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100"
            aria-label="سبد خرید"
          >
            <ShoppingCart size={22} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100"
            aria-label="علاقه‌مندی‌ها"
          >
            <Heart size={22} />
          </button>

        </div>
        {/* Back */}
         <p>جزئیات کالا </p>
        <button
          type="button"
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100"
          aria-label="بازگشت"
        >
          <ArrowRight size={22} />
        </button>

        {/* Actions */}
       
      </div>
    </div>
  )
}