
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
      slug: "beauty",
      img: beauty,
    },
    {
      name: "خانه و زندگی",
      slug: "home-living",
      img: furniture,
    },
    {
      name: "مواد غذایی",
      slug: "food-grocery",
      img: groceries,
    },
    {
      name: "ورزش",
      slug: "sports",
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
      <h2 className="text-right text-base font-bold pb-5">دسته‌بندی‌های کالینو شاپ</h2>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-8 px-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="group flex w-28 flex-col items-center gap-3"
          >
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100 p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500 group-hover:shadow-lg">
              <img
                src={category.img}
                alt={category.name}
                className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <p
              dir="rtl"
              className="text-center text-sm font-medium text-zinc-700 transition-colors duration-200 group-hover:text-purple-700"
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

