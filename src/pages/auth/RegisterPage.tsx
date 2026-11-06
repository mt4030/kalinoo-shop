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
<div className="
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
">
       
   
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
       
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            نام
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام خود را وارد کنید"
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
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-left outline-none transition focus:border-[#DBEAFE] focus:ring-2 focus:ring-[#DBEAFE]"
          />
        </div>

      
        <label className="flex cursor-pointer items-start gap-3 text-right">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#2457D6] "
          />

          <span className="text-sm leading-6 text-zinc-600">
            با{" "}
            <span className="font-medium text-[#2457D6] ">
              قوانین و شرایط
            </span>{" "}
            و{" "}
            <span className="font-medium text-[#2457D6] ">
              سیاست حفظ حریم خصوصی
            </span>{" "}
            موافقم
          </span>
        </label>

       
        <button
          type="button"
          className="w-full rounded-[12px] bg-[#2457D6] py-3 font-bold text-white transition hover:bg-[#173B8F]"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  )
}