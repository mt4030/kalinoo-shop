import { Link } from "react-router-dom"
import MegaMenu from "@/features/Mega Menu/MegaMenu"

export default function HeaderNav() {
  return (
    <section className="mb-1 flex items-center justify-end gap-5">
      
      <Link
        to="/"
        className="text-gray-500 hover:text-purple-700 hover:underline hover:underline-offset-10"
      >
        پرفروش ها
      </Link>

      <Link
        to="/"
        className="text-gray-500 hover:text-purple-700 hover:underline hover:underline-offset-10"
      >
        پیشنهاد ویژه
      </Link>

      <MegaMenu />

    </section>
  )
}