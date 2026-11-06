import { Link } from "react-router-dom"
import MegaMenu from "@/features/categories/components/MegaMenu"

export default function HeaderNav() {
  ///make a page for discount 10 higer discount
  return (
    <section className="mb-1 flex items-center justify-end gap-5">
  
      <Link
        to="/"
        className="text-gray-500 hover:text-[#173B8F] hover:underline hover:underline-offset-10">
        پیشنهاد ویژه
      </Link>

      <MegaMenu />

    </section>
  )
}