import { useState } from "react"

import { Link } from "react-router-dom"

import {
  MonitorSmartphone,
  Shirt,
  House,
  Sparkles,
  CarFront,
  Dumbbell,
  ShoppingBasket,
  Tags,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import { navigation } from "../navigation"

// Icon mapping for main categories
const categoryIcons: Record<string, LucideIcon> = {
  "الکترونیک": MonitorSmartphone,
  "مد و پوشاک": Shirt,
  "خانه و آشپزخانه": House,
  "زیبایی و مراقبت شخصی": Sparkles,
  "خودرو و وسایل نقلیه": CarFront,
  "ورزش و فضای باز": Dumbbell,
  "مواد غذایی و خواربار": ShoppingBasket,
}

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState(
    navigation[0] ?? null
  )

  return (
    <main dir="rtl" className="min-h-dvh bg-white">

      {/* Page Header */}
      <header className="border-b border-zinc-200 px-4 py-4 sm:px-6">
        <h1 className="text-lg font-bold text-[#172554] sm:text-xl">
          دسته‌بندی کالاها
        </h1>
      </header>

      {/* =====================================
          MOBILE VERSION
      ====================================== */}

      <div className="flex items-start md:hidden">

        {/* Right: Main Categories */}
        <aside className="
          w-32 shrink-0
          border-l border-zinc-200
          bg-[#F8FAFC]
          p-2
        ">
          <nav aria-label="دسته‌بندی محصولات">
            <ul className="space-y-1">
              {navigation.map((category) => {
                const isActive =
                  activeCategory?.title === category.title

                const Icon =
                  categoryIcons[category.title] ?? Tags

                return (
                  <li key={category.title}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`
                        flex min-h-12 w-full items-center gap-2
                        rounded-lg px-2 py-3
                        text-right text-[11px] font-medium
                        leading-5 transition-colors
                        ${
                          isActive
                            ? "border-r-[3px] border-[#2457D6] bg-[#EFF6FF] text-[#173B8F]"
                            : "text-zinc-700 hover:bg-[#EFF6FF] hover:text-[#173B8F]"
                        }
                      `}
                    >
                      <Icon
                        size={17}
                        className={`shrink-0 ${
                          isActive
                            ? "text-[#2457D6]"
                            : "text-zinc-500"
                        }`}
                      />

                      <span>{category.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Left: Selected Category Content */}
        <section className="min-w-0 flex-1 p-3">

          {activeCategory ? (
            <>
              <h2 className="
                mb-4 border-b border-zinc-200
                pb-3 text-base font-bold
                text-[#172554]
              ">
                {activeCategory.title}
              </h2>

              <div className="space-y-5">

                {activeCategory.children?.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-zinc-100 pb-4 last:border-0"
                  >

                    {item.slug ? (
                      <Link
                        to={`/products/search?category=${item.slug}`}
                        className="
                          mb-3 block text-sm font-bold
                          text-[#173B8F]
                          transition-colors hover:text-[#2457D6]
                        "
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <h3 className="mb-3 text-sm font-bold text-[#173B8F]">
                        {item.title}
                      </h3>
                    )}

                    <div className="grid grid-cols-1 gap-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          to={`/products/search?category=${child.slug}`}
                          className="
                            block rounded-lg
                            bg-zinc-50 px-3 py-2.5
                            text-xs text-zinc-600
                            transition-colors
                            hover:bg-[#EFF6FF]
                            hover:text-[#173B8F]
                          "
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>

                  </div>
                ))}

              </div>
            </>
          ) : (
            <div className="flex min-h-60 items-center justify-center text-sm text-zinc-400">
              دسته‌بندی‌ای وجود ندارد
            </div>
          )}

        </section>
      </div>


      {/* =====================================
          TABLET & DESKTOP VERSION
      ====================================== */}

      <div className="
        hidden md:block
        mx-auto max-w-6xl
        px-5 py-6
        lg:px-8 lg:py-8
      ">

        <div className="space-y-6 lg:space-y-8">

          {navigation.map((category) => {
            const Icon = categoryIcons[category.title] ?? Tags

            return (
              <section
                key={category.title}
                className="
                  overflow-hidden
                  rounded-xl
                  border border-[#DBEAFE]
                  bg-white
                  shadow-sm
                "
              >

                {/* Main Category Header */}
                <div className="
                  flex items-center gap-3
                  border-b border-[#DBEAFE]
                  bg-[#EFF6FF]
                  px-4 py-4
                  lg:px-6
                ">

                  <div className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-white
                    text-[#2457D6]
                  ">
                    <Icon size={23} strokeWidth={2} />
                  </div>

                  <h2 className="
                    text-base font-bold
                    text-[#172554]
                    lg:text-lg
                  ">
                    {category.title}
                  </h2>

                </div>

                {/* Subcategories */}
                <div className="
                  grid grid-cols-1
                  gap-5 p-4
                  sm:grid-cols-2
                  lg:grid-cols-3
                  lg:gap-6 lg:p-6
                ">

                  {category.children?.map((item) => (
                    <div
                      key={item.title}
                      className="
                        min-w-0 rounded-lg
                        border border-zinc-100
                        p-3 transition-colors
                        hover:border-[#DBEAFE]
                      "
                    >

                      {/* Subcategory Title */}
                      {item.slug ? (
                        <Link
                          to={`/products/search?category=${item.slug}`}
                          className="
                            mb-3 block
                            text-sm font-bold
                            text-[#173B8F]
                            transition-colors
                            hover:text-[#2457D6]
                            lg:text-base
                          "
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <h3 className="
                          mb-3 text-sm font-bold
                          text-[#173B8F]
                          lg:text-base
                        ">
                          {item.title}
                        </h3>
                      )}

                      {/* Child Categories */}
                      <div className="space-y-2">

                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            to={`/products/search?category=${child.slug}`}
                            className="
                              block text-xs
                              text-zinc-500
                              transition-colors
                              hover:text-[#2457D6]
                              lg:text-sm
                            "
                          >
                            {child.title}
                          </Link>
                        ))}

                      </div>

                    </div>
                  ))}

                </div>
              </section>
            )
          })}

        </div>
      </div>

    </main>
  )
}

export default CategoriesPage