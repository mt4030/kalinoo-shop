import { Link } from "react-router-dom"
import { LogIn, ShoppingCart } from "lucide-react"

import SearchInput from "@/features/search/components/Search"

type HeaderTopProps = {
  logo: string
}

export default function HeaderTop({ logo }: HeaderTopProps) {
  return (
    <div className="mb-5 flex justify-between">


 
      <div className="flex items-center gap-5">
        <Link
          to="/checkout/cart"
          className="border p-2 transition duration-200 hover:bg-gray-400 hover:text-white"
        >
          <ShoppingCart size={20} />
        </Link>

        <Link
          to="/auth/login"
          className="flex items-center gap-2 rounded-b-sm border p-2 transition duration-200 hover:bg-gray-400 hover:text-white"
        >
          ورود | عضویت
          <LogIn size={20} />
        </Link>
      </div>

     
      <div className="flex gap-5">
        <SearchInput />
<Link to={'/'}> 
        <img
          src={logo}
          alt="ShopFlow"
          className="w-20"
        /></Link>
      </div>

    </div>
  )
}