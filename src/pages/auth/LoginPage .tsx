import { useState, type FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { supabase } from "@/lib/supabase";

type LoginLocationState = {
  from?: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { startDemoSession, isLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const locationState =
    location.state as LoginLocationState | null;

  const requestedPath = locationState?.from;

  // Only allow local application paths as redirect destinations.
  const redirectTo =
    requestedPath?.startsWith("/") &&
    !requestedPath.startsWith("//")
      ? requestedPath
      : "/profile";

  function handleDemoLogin() {
    if (isLoading || isSubmitting) return;

    startDemoSession();

    navigate(redirectTo, { replace: true });
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    if (isLoading || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error("ورود به حساب انجام نشد.");
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "ورود با خطا مواجه شد. دوباره تلاش کنید."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="
        mx-auto mt-10
        w-[calc(100%-2rem)]
        max-w-md
        rounded-[12px]
        border border-zinc-200
        bg-white p-6 shadow-sm
      "
    >
      <Link to="/">
        <ChevronRight size={20} />
      </Link>

      {/* Heading */}
      <div className="mb-6 text-right">
        <h1 className="text-2xl font-bold text-zinc-900">
          ورود
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          وارد حساب کاربری خود شوید
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            ایمیل
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
            required
            className="
              w-full rounded-[12px]
              border border-zinc-300
              px-4 py-3 text-left
              outline-none transition
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-100
            "
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            رمز عبور
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            autoComplete="current-password"
            required
            className="
              w-full rounded-[12px]
              border border-zinc-300
              px-4 py-3 text-left
              outline-none transition
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-100
            "
          />
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <button
            type="button"
            disabled
            title="بازیابی رمز عبور هنوز پیاده‌سازی نشده است"
            className="
              cursor-not-allowed
              text-sm font-medium
              text-[#2457D6]
              opacity-60
            "
          >
            فراموشی رمز عبور؟
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {errorMessage}
          </p>
        )}

        {/* Real login */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="
            w-full rounded-[12px]
            bg-[#2457D6] py-3
            font-bold text-white
            transition hover:bg-[#173B8F]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>

        {/* Demo login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isLoading || isSubmitting}
          className="
            w-full rounded-[12px]
            border border-[#2457D6]
            py-3 font-bold text-[#2457D6]
            transition hover:bg-[#EFF6FF]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isLoading
            ? "Loading..."
            : "ورود به عنوان کاربر آزمایشی"}
        </button>

        {/* Register */}
        <div className="text-center text-sm text-zinc-500">
          حساب کاربری ندارید؟{" "}

          <Link
            to="/auth/register"
            state={{ from: redirectTo }}
            className="font-bold text-[#2457D6] hover:text-[#173B8F]"
          >
            ثبت‌نام کنید
          </Link>
        </div>
      </form>
    </div>
  );
}