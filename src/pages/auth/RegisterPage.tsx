import { useState } from "react"
 import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          
   
<Link to={'/'}> 
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

      <form className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            نام
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام خود را وارد کنید"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-right outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

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
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Confirm password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            تکرار رمز عبور
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تکرار رمز عبور"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-3 text-right">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 accent-purple-600"
          />

          <span className="text-sm leading-6 text-zinc-600">
            با{" "}
            <span className="font-medium text-purple-600">
              قوانین و شرایط
            </span>{" "}
            و{" "}
            <span className="font-medium text-purple-600">
              سیاست حفظ حریم خصوصی
            </span>{" "}
            موافقم
          </span>
        </label>

        {/* Button */}
        <button
          type="button"
          className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-700"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  )
}