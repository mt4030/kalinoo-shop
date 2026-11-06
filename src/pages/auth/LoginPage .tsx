
import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
export default function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  return (
<div className="
  mx-auto mt-10
  w-[calc(100%-2rem)]
  max-w-md
  rounded-[12px]
  border border-zinc-200
  bg-white p-6 shadow-sm
">           
   
<Link to={'/'}> 
<ChevronRight size={20} />
</Link>
      <div className="mb-6 text-right">
        <h1 className="text-2xl font-bold text-zinc-900">
          ورود
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          وارد حساب کاربری خود شوید
        </p>
      </div>

      <form className="space-y-5">
        {/* User */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            ایمیل یا نام کاربری
          </label>

          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="ایمیل یا نام کاربری"
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm font-medium text-[#2457D6] hover:text-[#173B8F]"
          >
            فراموشی رمز عبور؟
          </button>
        </div>

        {/* Login */}
        <button
          type="button"
          className="w-full rounded-[12px] bg-[#2457D6] py-3 font-bold text-white transition hover:bg-[#173B8F]"
        >
          ورود
        </button>

        {/* Register */}
        <div className="text-center text-sm text-zinc-500">
          حساب کاربری ندارید؟{" "}
          <Link
            to="/auth/register"
            className="font-bold text-[#2457D6] hover:text-[#173B8F]"
          >
            ثبت‌نام کنید
          </Link>
        </div>
      </form>
    </div>
  )
}

