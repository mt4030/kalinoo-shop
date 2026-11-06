import { Link } from "react-router-dom"
import { LogIn, ShoppingCart } from "lucide-react"

import SearchInput from "@/features/search/components/Search"

type HeaderTopProps = {
  logo: string
}

export default function HeaderTop({ logo }: HeaderTopProps) {
  return (
    <div className="mb-5 flex justify-between">


 
      <div className="flex items-center gap-2 sm:gap-3">
  {/* Shopping Cart */}
  <Link
    to="/checkout/cart"
    aria-label="رفتن به سبد خرید"
    className="
      relative flex h-10 w-10 sm:h-11 sm:w-11
      shrink-0 items-center justify-center
      rounded-[12px] border border-[#DBEAFE]
      bg-[#EFF6FF] text-[#2457D6]
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
    <ShoppingCart size={20} strokeWidth={2} />
  </Link>

  {/* Login / Register */}
  <Link
    to="/auth/login"
    className="
      flex h-10 sm:h-11
      items-center justify-center gap-2
      whitespace-nowrap
      rounded-[12px] border border-[#2457D6]
      bg-[#2457D6] px-3 sm:px-4
      text-sm font-medium text-white
      transition-colors duration-200
      hover:border-[#173B8F]
      hover:bg-[#173B8F]
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#2457D6]
      focus-visible:ring-offset-2
    "
  >
    <LogIn size={18} />
    <span>ورود | عضویت</span>
  </Link>
</div>
     
      <div className="flex gap-5">
        <SearchInput />
<Link to={'/'} className="flex flex-col justify-center"> 
        <img
          src={logo}
          alt="ShopFlow"
          className="w-25"
        /></Link>
      </div>

    </div>
  )
}