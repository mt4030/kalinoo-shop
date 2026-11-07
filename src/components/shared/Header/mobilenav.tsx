import {
  Store,
  Menu,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthProvider";

export default function MobileBottomNav() {
  const { session, isLoading } = useAuth();

  const isLoggedIn =
    session.mode === "authenticated" ||
    session.mode === "demo";

  return (
    <nav
      dir="rtl"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white sm:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">

        {/* فروشگاه */}
        <Link
          to="/"
          className="flex min-w-16 flex-col items-center gap-1 text-zinc-600 transition hover:text-purple-600"
        >
          <Store size={22} />
          <span className="text-xs font-medium">
            فروشگاه
          </span>
        </Link>

        {/* دسته بندی */}
        <Link
          to="/categories"
          className="flex min-w-16 flex-col items-center gap-1 text-zinc-600 transition hover:text-purple-600"
        >
          <Menu size={22} />
          <span className="text-xs font-medium">
            دسته بندی
          </span>
        </Link>

        {/* سبد خرید */}
        <Link
          to="/checkout/cart"
          className="relative flex min-w-16 flex-col items-center gap-1 text-zinc-600 transition hover:text-purple-600"
        >
          <ShoppingCart size={22} />
          <span className="text-xs font-medium">
            سبد خرید
          </span>
        </Link>

        {/* ورود و عضویت / حساب کاربری */}
        {isLoading ? (
          <div
            className="flex min-w-16 flex-col items-center gap-1 text-zinc-400"
            aria-label="در حال بررسی حساب کاربری"
          >
            <UserRound size={22} />
            <span className="text-xs font-medium">
              ...
            </span>
          </div>
        ) : (
          <Link
            to={isLoggedIn ? "/profile" : "/auth/login"}
            className="flex min-w-16 flex-col items-center gap-1 text-zinc-600 transition hover:text-purple-600"
          >
            <UserRound size={22} />

            <span className="whitespace-nowrap text-xs font-medium">
              {isLoggedIn ? "حساب کاربری" : "ورود و عضویت"}
            </span>
          </Link>
        )}

      </div>
    </nav>
  );
}