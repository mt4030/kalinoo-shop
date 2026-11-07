import { Link } from "react-router-dom";

import {
  LogIn,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import SearchInput from "@/features/search/components/Search";
import { useAuth } from "@/features/auth/context/AuthProvider";

type HeaderTopProps = {
  logo: string;
};

export default function HeaderTop({ logo }: HeaderTopProps) {
  const { session, isLoading } = useAuth();

  const isLoggedIn =
    session.mode === "authenticated" ||
    session.mode === "demo";

  return (
    <div className="mb-5 flex justify-between">

      {/* Left side: Cart and authentication */}

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

        {/* Login / Account */}

        {isLoading ? (
          <div
            aria-label="در حال بررسی حساب کاربری"
            className="
              flex h-10 sm:h-11
              items-center justify-center gap-2
              whitespace-nowrap
              rounded-[12px] border border-[#DBEAFE]
              bg-[#EFF6FF] px-3 sm:px-4
              text-sm font-medium text-[#64748B]
            "
          >
            <UserRound size={18} />
            <span>...</span>
          </div>
        ) : (
          <Link
            to={isLoggedIn ? "/profile" : "/auth/login"}
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
            {isLoggedIn ? (
              <UserRound size={18} />
            ) : (
              <LogIn size={18} />
            )}

            <span>
              {isLoggedIn ? "حساب کاربری" : "ورود | عضویت"}
            </span>
          </Link>
        )}

      </div>

      {/* Right side: Search and logo */}

      <div className="flex gap-5">
        <SearchInput />

        <Link to="/" className="flex flex-col justify-center">
          <img
            src={logo}
            alt="ShopFlow"
            className="w-25"
          />
        </Link>
      </div>

    </div>
  );
}