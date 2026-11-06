import { useState } from "react"
import { navigation } from "./navigation"
import { Link } from "react-router-dom"

const CategoriesMenu = () => {
  const [activeCategory, setActiveCategory] = useState(
    navigation[0] ?? null
  )

  return (
    <div
      dir="rtl"
      className="absolute right-0 top-full z-50 xl:w-200 md:170 w-150 fade-in slide-in-from-top-2 duration-200 overflow-hidden rounded-b-xl border border-zinc-200 bg-white shadow-xl"
    >
      <div className="flex min-h-125">

        {/* Right: Categories */}
        <aside className="w-56 shrink-0 border-l border-zinc-200 bg-zinc-50 p-4">
          <ul className="space-y-1">
            {navigation.map((category) => (
              <li key={category.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveCategory(category)}
                  className={`block w-full rounded-lg px-4 py-3 text-right text-sm font-medium transition ${
                    activeCategory?.title === category.title
                      ? "bg-white text-[#173B8F] shadow-sm"
                      : "text-zinc-700 hover:bg-white hover:text-[#173B8F]"
                  }`}
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Left: Subcategories */}
        <section className="flex-1 p-6">
          {activeCategory ? (
            <>
              <h2 className="mb-6 border-b border-zinc-200 pb-4 text-lg font-bold text-zinc-900">
                {activeCategory.title}
              </h2>

              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {activeCategory.children?.map((item) => (
                  <div key={item.title}>
  {item.slug ? (
    <Link
      to={`/products/search?category=${item.slug}`}
      className="mb-3 block text-sm font-bold text-zinc-900 transition hover:text-[#173B8F]"
    >
      {item.title}
    </Link>
  ) : (
    <h3 className="mb-3 text-sm font-bold text-zinc-900">
      {item.title}
    </h3>
  )}

  <div className="space-y-2">
    {item.children?.map((child) => (
      <Link
        key={child.title}
        to={`/products/search?category=${child.slug}`}
        className="block text-sm text-zinc-500 transition hover:text-[#173B8F]"
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
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              یک دسته‌بندی را انتخاب کنید
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default CategoriesMenu