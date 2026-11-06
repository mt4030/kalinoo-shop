import { Link } from "react-router-dom"

import car from "../../../assets/categories/car.jpg"
import cloth from "../../../assets/categories/cloth.jpg"
import furniture from "../../../assets/categories/furnicher.jpg"
import groceries from "../../../assets/categories/groceries.jpg"
import laptop from "../../../assets/categories/laptop.jpg"
import beauty from "../../../assets/categories/beauty.jpg"
import sports from "../../../assets/categories/sport.jpg"

const Category = () => {
  const categories = [
    {
      name: "کالای دیجیتال",
      slug: "electronics",
      img: laptop,
    },
    {
      name: "مد و پوشاک",
      slug: "fashion",
      img: cloth,
    },
    {
      name: "زیبایی و مراقبت شخصی",
      slug: "beauty-personal-care",
      img: beauty,
    },
    {
      name: "خانه و آشپزخانه",
      slug: "home-kitchen",
      img: furniture,
    },
    {
      name: "مواد غذایی و خواربار",
      slug: "groceries",
      img: groceries,
    },
    {
      name: "ورزش و فضای باز",
      slug: "sports-outdoors",
      img: sports,
    },
    {
      name: "خودرو",
      slug: "vehicle",
      img: car,
    },
  ]

  return (
    <section className="my-10 w-full">
      <h2 className="pb-5 text-right text-base font-bold text-[#172554]">
        دسته‌بندی‌های کالینو شاپ
      </h2>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-8 px-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/products/search?category=${category.slug}`}
            className="group flex w-28 flex-col items-center gap-3"
          >
            <div className="
              h-24 w-24 overflow-hidden
              rounded-full border-2 border-zinc-200
              bg-zinc-100 p-1
              transition-all duration-300
              group-hover:scale-105
              group-hover:border-[#2457D6]
              group-hover:shadow-lg
            ">
              <img
                src={category.img}
                alt={category.name}
                className="
                  h-full w-full rounded-full object-cover
                  transition-transform duration-300
                  group-hover:scale-110
                "
              />
            </div>

            <p
              dir="rtl"
              className="
                text-center text-sm font-medium
                text-zinc-700 transition-colors duration-200
                group-hover:text-[#2457D6]
              "
            >
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Category