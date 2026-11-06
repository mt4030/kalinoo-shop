
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
} from "lucide-react";

export default function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main
      dir="rtl"
      className="
        flex min-h-dvh items-center justify-center
        bg-[#F8FAFC] px-4 py-10
      "
    >
      <div className="
        w-full max-w-lg
        rounded-[12px]  border border-[#DBEAFE]
        bg-white px-6 py-10
        text-center shadow-sm
        sm:px-10 sm:py-12
      ">

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center">

          {/* Background circles */}
          <div className="
            absolute inset-0 rounded-full
            bg-[#EFF6FF]
          " />

          <div className="
            absolute inset-3 rounded-full
            border border-[#DBEAFE]
          " />

          {/* Main icon */}
          <div className="
            relative flex h-20 w-20
            items-center justify-center
            rounded-[12px] bg-white
            text-[#2457D6]
            shadow-md shadow-blue-100
          ">
            <AlertTriangle size={42} strokeWidth={1.6} />
          </div>

          {/* Decorative elements */}
          <span className="
            absolute right-2 top-5
            h-3 w-3 rounded-full
            bg-[#60A5FA]
          " />

          <span className="
            absolute bottom-5 left-1
            h-2.5 w-2.5 rounded-full
            bg-[#DBEAFE]
          " />

          <span className="
            absolute bottom-1 right-8
            h-2 w-2 rounded-full
            bg-[#2457D6]
          " />
        </div>

        {/* Error Code */}
        <span className="
          inline-flex rounded-full
          bg-[#EFF6FF] px-4 py-1.5
          text-xs font-bold tracking-wider
          text-[#2457D6]
        ">
          ERROR 500
        </span>

        {/* Title */}
        <h1 className="
          mt-5 text-xl font-bold
          text-[#172554]
          sm:text-2xl
        ">
          اوه! مشکلی پیش آمده
        </h1>

        {/* Description */}
        <p className="
          mx-auto mt-4 max-w-sm
          text-sm leading-7
          text-zinc-500
        ">
          متأسفیم! هنگام بارگذاری صفحه مشکلی پیش آمده است.
          ممکن است این مشکل موقتی باشد.
          لطفاً دوباره تلاش کنید.
        </p>

        {/* Actions */}
        <div className="
          mt-8 flex flex-col gap-3
          sm:flex-row
        ">

          {/* Retry */}
          <button
            type="button"
            onClick={handleRetry}
            className="
              flex flex-1 items-center
              justify-center gap-2
              rounded-[12px] bg-[#2457D6]
              px-5 py-3
              text-sm font-semibold text-white
              transition-colors duration-200
              hover:bg-[#173B8F]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2457D6]
              focus-visible:ring-offset-2
            "
          >
            <RefreshCw size={17} />
            تلاش مجدد
          </button>

          {/* Home */}
          <Link
            to="/"
            className="
              flex flex-1 items-center
              justify-center gap-2
              rounded-[12px] border border-[#DBEAFE]
              bg-[#EFF6FF]
              px-5 py-3
              text-sm font-semibold text-[#2457D6]
              transition-colors duration-200
              hover:bg-[#DBEAFE]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2457D6]
              focus-visible:ring-offset-2
            "
          >
            <Home size={17} />
            بازگشت به صفحه اصلی
          </Link>

        </div>

        {/* Footer */}
        <div className="
          mt-9 border-t border-zinc-100
          pt-5
        ">
          <Link
            to="/"
            className="
              inline-flex items-center gap-1
              text-sm font-bold
              text-[#173B8F]
              transition-colors
              hover:text-[#2457D6]
            "
          >
            کالینو شاپ
            <ArrowLeft size={14} />
          </Link>

          <p className="mt-2 text-xs text-zinc-400">
            همراه شما برای یک خرید بهتر
          </p>
        </div>

      </div>
    </main>
  );
}
