import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShoppingBag,
  UserRound,
  Eye,
} from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { supabase } from "@/lib/supabase";

import { useFavoritesStore } from "@/features/favorites/store/favoritesStore";
import { useRecentlyViewedStore } from "@/features/history/store/recentlyViewedStore";

// --------------------------------------------------
// Types
// --------------------------------------------------

type CustomerProfile = {
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  role: string;
};

type ProfileProduct = {
  id: number;
  title: string;
  thumbnail: string | null;
  price: number | null;
  discount_percentage: number | null;
};

type CustomerAddress = {
  id: number;
  phone: string;
  full_address: string;
  is_default: boolean;
  created_at: string;
};

// --------------------------------------------------
// Fetch product details using database product IDs
// --------------------------------------------------

async function getProductsByIds(
  productIds: number[]
): Promise<ProfileProduct[]> {
  const uniqueIds = [...new Set(productIds)];

  if (uniqueIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, title, thumbnail, price, discount_percentage")
    .in("id", uniqueIds);

  if (error) {
    throw error;
  }

  // Supabase .in() does not guarantee the requested order.
  // Restore the order from the supplied product IDs.
  const productMap = new Map(
    (data ?? []).map((product) => [
      Number(product.id),
      product,
    ])
  );

  return uniqueIds
    .map((id) => productMap.get(id))
    .filter(
      (product): product is ProfileProduct =>
        product !== undefined
    );
}

// --------------------------------------------------
// Format product price
// --------------------------------------------------

function formatPrice(
  price: number | null,
  discount: number | null
) {
  if (price === null) {
    return "قیمت نامشخص";
  }

  const discountPercentage = Number(discount ?? 0);

  const finalPrice =
    price * (1 - discountPercentage / 100);

  return `${Math.round(finalPrice).toLocaleString("fa-IR")} تومان`;
}

// --------------------------------------------------
// Reusable section heading
// --------------------------------------------------

function SectionHeading({
  title,
  icon,
  action,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[#2457D6]">{icon}</span>

        <h2 className="text-base font-bold text-[#172554] sm:text-lg">
          {title}
        </h2>
      </div>

      {action}
    </div>
  );
}

// --------------------------------------------------
// Statistics card
// --------------------------------------------------

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2457D6]">
          {icon}
        </div>

        <span className="text-xs text-[#94A3B8]">
          آمار حساب
        </span>
      </div>

      <p className="text-2xl font-bold text-[#172554]">
        {value}
      </p>

      <p className="mt-1 text-sm font-medium text-[#334155]">
        {title}
      </p>

      <p className="mt-2 text-xs text-[#94A3B8]">
        {description}
      </p>
    </div>
  );
}

// --------------------------------------------------
// Product card
// --------------------------------------------------

function ProductCard({
  product,
  icon,
}: {
  product: ProfileProduct;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[#E2E8F0] p-3 transition hover:border-[#93C5FD]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EFF6FF] text-[#2457D6]">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          icon
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold text-[#172554]">
          {product.title}
        </p>

        <p className="mt-2 text-xs font-bold text-[#2457D6]">
          {formatPrice(
            product.price,
            product.discount_percentage
          )}
        </p>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Empty state
// --------------------------------------------------

function EmptyState({
  message,
  icon,
}: {
  message: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-lg bg-[#F8FAFC] p-5 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2457D6]">
        {icon}
      </div>

      <p className="text-sm text-[#64748B]">
        {message}
      </p>
    </div>
  );
}

// --------------------------------------------------
// Sidebar navigation
// --------------------------------------------------

const menuItems = [
  {
    label: "نمای کلی",
    href: "#overview",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "علاقه‌مندی‌ها",
    href: "#favorites",
    icon: <Heart size={18} />,
  },
  {
    label: "بازدیدهای اخیر",
    href: "#recently-viewed",
    icon: <Eye size={18} />,
  },
  {
    label: "آدرس‌های من",
    href: "#addresses",
    icon: <MapPin size={18} />,
  },
  {
    label: "اطلاعات حساب",
    href: "#account-info",
    icon: <Settings size={18} />,
  },
];

// --------------------------------------------------
// Profile page
// --------------------------------------------------

export default function Profile() {
  const { session, isLoading, signOut } = useAuth();

  const navigate = useNavigate();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const isDemo = session.mode === "demo";
  const isAuthenticated = session.mode === "authenticated";

  const userId = isAuthenticated
    ? session.user.id
    : null;

  // --------------------------------------------------
  // Demo Zustand stores
  // --------------------------------------------------

  const demoFavoriteIds = useFavoritesStore(
    (state) => state.productIds
  );

  const localHistoryIds = useRecentlyViewedStore(
    (state) => state.productIds
  );

  // --------------------------------------------------
  // Real customer profile
  // --------------------------------------------------

  const profileQuery = useQuery<CustomerProfile>({
    queryKey: ["customer-profile", userId],

    enabled: userId !== null,

    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, phone, role")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return data as CustomerProfile;
    },
  });

  // --------------------------------------------------
  // Fetch authenticated customer's favorite IDs
  // --------------------------------------------------

  const favoritesQuery = useQuery<number[]>({
    queryKey: ["profile-favorites", userId],

    enabled: userId !== null,

    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", userId)
        .order("id", { ascending: false });

      if (error) throw error;

      return (data ?? []).map((item) =>
        Number(item.product_id)
      );
    },
  });

  // --------------------------------------------------
  // Decide which favorite IDs to display
  // --------------------------------------------------

  const favoriteIds = isAuthenticated
    ? favoritesQuery.data ?? []
    : isDemo
      ? demoFavoriteIds
      : [];

  // --------------------------------------------------
  // Fetch favorite product details
  // --------------------------------------------------

  const favoriteProductsQuery = useQuery<ProfileProduct[]>({
    queryKey: [
      "profile-favorite-products",
      userId,
      favoriteIds,
    ],

    enabled: favoriteIds.length > 0,

    queryFn: () => getProductsByIds(favoriteIds),
  });

  // --------------------------------------------------
  // Fetch authenticated customer's history
  // --------------------------------------------------

  const historyQuery = useQuery<number[]>({
    queryKey: ["profile-recently-viewed", userId],

    enabled: userId !== null,

    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const { data, error } = await supabase
        .from("recently_viewed")
        .select("product_id")
        .eq("user_id", userId)
        .order("viewed_at", { ascending: false })
        .order("id", { ascending: false })
        .limit(10);

      if (error) throw error;

      return (data ?? []).map((item) =>
        Number(item.product_id)
      );
    },
  });

  // --------------------------------------------------
  // Decide which history IDs to display
  // --------------------------------------------------

  const historyIds = isAuthenticated
    ? historyQuery.data ?? []
    : localHistoryIds.slice(0, 10);

  // --------------------------------------------------
  // Fetch recently viewed product details
  // --------------------------------------------------

  const historyProductsQuery = useQuery<ProfileProduct[]>({
    queryKey: [
      "profile-history-products",
      userId,
      historyIds,
    ],

    enabled: historyIds.length > 0,

    queryFn: () => getProductsByIds(historyIds),
  });

  // --------------------------------------------------
  // Fetch real customer addresses
  // --------------------------------------------------

  const addressesQuery = useQuery<CustomerAddress[]>({
    queryKey: ["customer-addresses", userId],

    enabled: userId !== null,

    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const { data, error } = await supabase
        .from("addresses")
        .select("id, phone, full_address, is_default, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as CustomerAddress[];
    },
  });

  // --------------------------------------------------
  // Customer information
  // --------------------------------------------------

  const profile = profileQuery.data;

  const customerName =
    session.mode === "demo"
      ? session.user.fullName
      : session.mode === "authenticated"
        ? profile?.full_name ||
          session.user.email?.split("@")[0] ||
          "مشتری کالینو"
        : "مهمان";

  const customerEmail =
    session.mode === "guest"
      ? "هنوز وارد حساب نشده‌اید"
      : session.user.email || "ایمیل ثبت نشده";

  const customerPhone = isDemo
    ? "کاربر آزمایشی"
    : profile?.phone || "ثبت نشده";

  const accountType = isDemo
    ? "کاربر آزمایشی"
    : profile?.role === "admin"
      ? "مدیر"
      : "مشتری";

  const favoriteProducts =
    favoriteProductsQuery.data ?? [];

  const recentProducts =
    historyProductsQuery.data ?? [];

  const addresses = isAuthenticated
    ? addressesQuery.data ?? []
    : [];

  // --------------------------------------------------
  // Sign out
  // --------------------------------------------------

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      setSignOutError("");

      await signOut();

      navigate("/", { replace: true });
    } catch {
      setSignOutError(
        "خروج از حساب انجام نشد. دوباره تلاش کنید."
      );
    } finally {
      setIsSigningOut(false);
    }
  }

  // --------------------------------------------------
  // Initial authentication loading
  // --------------------------------------------------

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#F8FAFC]"
      >
        <p className="text-sm text-[#64748B]">
          در حال بارگذاری اطلاعات حساب...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Page
  // --------------------------------------------------

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] pb-10 text-[#172554]"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page heading */}

        <div
          id="overview"
          className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-2 text-sm text-[#64748B]">
              خانه / حساب کاربری
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              حساب کاربری من
            </h1>

            <p className="mt-2 text-sm text-[#64748B]">
              مدیریت اطلاعات شخصی و فعالیت‌های شما
            </p>
          </div>

          {isDemo && (
            <span className="flex w-fit items-center gap-1 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-[#2457D6]">
              <BadgeCheck size={15} />
              کاربر آزمایشی
            </span>
          )}

          {isAuthenticated && (
            <span className="flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <BadgeCheck size={15} />
              مشتری عضو شده
            </span>
          )}
        </div>

        {/* Session information */}

        {isDemo && (
          <div className="mb-6 rounded-xl border border-blue-100 bg-[#EFF6FF] p-4">
            <p className="text-sm font-semibold text-[#173B8F]">
              حساب آزمایشی
            </p>

            <p className="mt-1 text-xs leading-6 text-[#475569]">
              علاقه‌مندی‌ها و بازدیدهای اخیر این حساب در مرورگر شما ذخیره می‌شوند.
            </p>
          </div>
        )}

        {isAuthenticated && (
          <div className="mb-6 rounded-xl border border-blue-100 bg-[#EFF6FF] p-4">
            <p className="text-sm font-semibold text-[#173B8F]">
              اطلاعات حساب واقعی
            </p>

            <p className="mt-1 text-xs leading-6 text-[#475569]">
              اطلاعات شخصی، علاقه‌مندی‌ها، بازدیدهای اخیر و آدرس‌های شما از پایگاه داده دریافت می‌شوند.
            </p>
          </div>
        )}

        {/* Main layout */}

        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* Sidebar */}

          <aside className="h-fit rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-sm lg:sticky lg:top-24">

            {/* Customer identity */}

            <div className="mb-4 flex items-center gap-3 border-b border-[#E2E8F0] px-2 pb-4 pt-2">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE] text-[#2457D6]">
                {isAuthenticated && profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={customerName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={25} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  {customerName}
                </p>

                <p
                  dir="ltr"
                  className="mt-1 truncate text-right text-xs text-[#94A3B8]"
                >
                  {customerEmail}
                </p>
              </div>
            </div>

            {/* Navigation */}

            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    flex shrink-0 items-center gap-3
                    rounded-lg px-3 py-3
                    text-sm font-medium text-[#64748B]
                    transition hover:bg-[#EFF6FF]
                    hover:text-[#2457D6]
                  "
                >
                  {item.icon}

                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Sign out */}

            <div className="mt-4 border-t border-[#E2E8F0] pt-3">
              {signOutError && (
                <p className="mb-2 text-xs text-red-600">
                  {signOutError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="
                  flex w-full items-center gap-3
                  rounded-lg px-3 py-3
                  text-sm font-medium text-red-600
                  transition hover:bg-red-50
                  disabled:opacity-50
                "
              >
                <LogOut size={18} />

                {isSigningOut
                  ? "در حال خروج..."
                  : "خروج از حساب"}
              </button>
            </div>
          </aside>

          {/* Main content */}

          <div className="min-w-0 space-y-6">

            {/* Real statistics */}

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

              <StatCard
                title="علاقه‌مندی‌ها"
                value={favoriteIds.length.toLocaleString("fa-IR")}
                description="محصولات ذخیره‌شده"
                icon={<Heart size={21} />}
              />

              <StatCard
                title="بازدیدهای اخیر"
                value={historyIds.length.toLocaleString("fa-IR")}
                description="حداکثر ۱۰ محصول اخیر"
                icon={<Eye size={21} />}
              />

              <StatCard
                title="آدرس‌ها"
                value={
                  isAuthenticated
                    ? addresses.length.toLocaleString("fa-IR")
                    : "۰"
                }
                description="آدرس‌های ذخیره‌شده"
                icon={<MapPin size={21} />}
              />
            </section>

            {/* Account information */}

            <section
              id="account-info"
              className="scroll-mt-24 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6"
            >
              <SectionHeading
                title="اطلاعات حساب کاربری"
                icon={<UserRound size={20} />}
              />

              {profileQuery.isLoading && (
                <p className="mb-4 text-sm text-[#64748B]">
                  در حال دریافت اطلاعات پروفایل...
                </p>
              )}

              {profileQuery.error && (
                <p
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
                >
                  دریافت اطلاعات پروفایل ناموفق بود.
                  لطفاً صفحه را دوباره بارگذاری کنید.
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full name */}

                <div>
                  <p className="mb-2 text-xs text-[#94A3B8]">
                    نام و نام خانوادگی
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <UserRound
                      size={17}
                      className="text-[#64748B]"
                    />

                    {customerName}
                  </div>
                </div>

                {/* Email */}

                <div>
                  <p className="mb-2 text-xs text-[#94A3B8]">
                    ایمیل
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail
                      size={17}
                      className="text-[#64748B]"
                    />

                    <span dir="ltr">
                      {customerEmail}
                    </span>
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <p className="mb-2 text-xs text-[#94A3B8]">
                    شماره تلفن
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
                    <Phone size={17} />
                    {customerPhone}
                  </div>
                </div>

                {/* Account type */}

                <div>
                  <p className="mb-2 text-xs text-[#94A3B8]">
                    نوع حساب
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BadgeCheck
                      size={17}
                      className="text-[#2457D6]"
                    />

                    {accountType}
                  </div>
                </div>
              </div>
            </section>

            {/* Favorites */}

            <section
              id="favorites"
              className="scroll-mt-24 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6"
            >
              <SectionHeading
                title="علاقه‌مندی‌های من"
                icon={<Heart size={20} />}
                action={
                  <span className="text-xs text-[#94A3B8]">
                    {favoriteIds.length.toLocaleString("fa-IR")} محصول
                  </span>
                }
              />

              {favoritesQuery.isLoading ||
              favoriteProductsQuery.isLoading ? (
                <p className="py-8 text-center text-sm text-[#64748B]">
                  در حال دریافت علاقه‌مندی‌ها...
                </p>
              ) : favoritesQuery.error ||
                favoriteProductsQuery.error ? (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  دریافت علاقه‌مندی‌ها ناموفق بود.
                </p>
              ) : favoriteProducts.length === 0 ? (
                <EmptyState
                  message="هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید."
                  icon={<Heart size={24} />}
                />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {favoriteProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      icon={<Heart size={24} />}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Recently viewed */}

            <section
              id="recently-viewed"
              className="scroll-mt-24 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6"
            >
              <SectionHeading
                title="بازدیدهای اخیر"
                icon={<Clock3 size={20} />}
                action={
                  <span className="text-xs text-[#94A3B8]">
                    حداکثر ۱۰ محصول
                  </span>
                }
              />

              {historyQuery.isLoading ||
              historyProductsQuery.isLoading ? (
                <p className="py-8 text-center text-sm text-[#64748B]">
                  در حال دریافت تاریخچه بازدید...
                </p>
              ) : historyQuery.error ||
                historyProductsQuery.error ? (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  دریافت تاریخچه بازدید ناموفق بود.
                </p>
              ) : recentProducts.length === 0 ? (
                <EmptyState
                  message="هنوز محصولی را مشاهده نکرده‌اید."
                  icon={<Eye size={24} />}
                />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {recentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      icon={<ShoppingBag size={24} />}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Addresses */}

            <section
              id="addresses"
              className="scroll-mt-24 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6"
            >
              <SectionHeading
                title="آدرس‌های من"
                icon={<MapPin size={20} />}
                action={
                  <span className="text-xs text-[#94A3B8]">
                    {addresses.length.toLocaleString("fa-IR")} آدرس
                  </span>
                }
              />

              {!isAuthenticated ? (
                <EmptyState
                  message="برای مشاهده آدرس‌های ذخیره‌شده، وارد حساب واقعی خود شوید."
                  icon={<MapPin size={24} />}
                />
              ) : addressesQuery.isLoading ? (
                <p className="py-8 text-center text-sm text-[#64748B]">
                  در حال دریافت آدرس‌ها...
                </p>
              ) : addressesQuery.error ? (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  دریافت آدرس‌ها ناموفق بود.
                </p>
              ) : addresses.length === 0 ? (
                <EmptyState
                  message="هنوز آدرسی ثبت نکرده‌اید."
                  icon={<MapPin size={24} />}
                />
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={18}
                            className="text-[#2457D6]"
                          />

                          <span className="text-sm font-semibold">
                            آدرس {address.is_default ? "پیش‌فرض" : "ذخیره‌شده"}
                          </span>
                        </div>

                        {address.is_default && (
                          <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs text-[#2457D6]">
                            پیش‌فرض
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm leading-7 text-[#64748B]">
                        {address.full_address}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
                        <Phone size={14} />
                        <span dir="ltr">{address.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Continue shopping */}

            <div className="flex flex-col gap-3 rounded-xl bg-[#173B8F] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="font-bold">
                  به خرید خود ادامه دهید
                </h3>

                <p className="mt-2 text-sm text-blue-100">
                  محصولات جدید کالینو را مشاهده کنید.
                </p>
              </div>

              <Link
                to="/products/search"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg bg-white px-5 py-3
                  text-sm font-bold text-[#173B8F]
                  transition hover:bg-blue-50
                "
              >
                مشاهده محصولات
                <ArrowLeft size={17} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}