import { useState, type FormEvent } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { supabase } from "@/lib/supabase";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { startDemoSession, isLoading } = useAuth();
  const navigate = useNavigate();

  function handleDemoLogin() {
    startDemoSession();
    navigate("/profile", { replace: true });
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    if (!agree) {
      setErrorMessage("لطفاً قوانین و شرایط را تأیید کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        navigate("/profile", { replace: true });
      } else {
        setSuccessMessage(
          "ثبت‌نام با موفقیت انجام شد. لطفاً ایمیل خود را برای تأیید حساب بررسی کنید."
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "ثبت‌نام با خطا مواجه شد."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="
        mx-auto my-4
        min-h-[calc(100dvh-2rem)]
        w-[calc(100%-2rem)]
        max-w-md
        rounded-[12px]
        border border-zinc-200
        bg-white
        p-4
        shadow-sm
        sm:my-10
        sm:min-h-0
        sm:p-6
      "
    >
      <Link to="/">
        <ChevronRight size={20} />
      </Link>

      <div className="mb-6 text-right">
        <h1 className="text-2xl font-bold text-zinc-900">
          ایجاد حساب
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          برای ثبت‌نام اطلاعات خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            نام
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام خود را وارد کنید"
            required
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-right outline-none transition focus:border-[#DBEAFE] focus:ring-2 focus:ring-[#DBEAFE]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            ایمیل
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            autoComplete="email"
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-[#DBEAFE] focus:ring-2 focus:ring-[#DBEAFE]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            رمز عبور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-[#DBEAFE] focus:ring-2 focus:ring-[#DBEAFE]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            تکرار رمز عبور
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تکرار رمز عبور"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-[#DBEAFE] focus:ring-2 focus:ring-[#DBEAFE]"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-right">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#2457D6]"
          />

          <span className="text-sm leading-6 text-zinc-600">
            با{" "}
            <span className="font-medium text-[#2457D6]">
              قوانین و شرایط
            </span>{" "}
            و{" "}
            <span className="font-medium text-[#2457D6]">
              سیاست حفظ حریم خصوصی
            </span>{" "}
            موافقم
          </span>
        </label>

        {errorMessage && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700" role="status">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full rounded-[12px] bg-[#2457D6] py-3 font-bold text-white transition hover:bg-[#173B8F] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isLoading || isSubmitting}
          className="w-full rounded-[12px] border border-[#2457D6] py-3 font-bold text-[#2457D6] transition hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Loading..."
            : "ورود به عنوان کاربر آزمایشی"}
        </button>
      </form>
    </div>
  );
}