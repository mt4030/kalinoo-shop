import type { NavigationCategory } from "@/types";

export const navigation: NavigationCategory[]  = [
  {
    title: "الکترونیک",
    slug: "electronics",
    children: [
      {
        title: "گوشی هوشمند",
        slug: "smartphones",
      },
      {
        title: "تبلت",
        slug: "tablets",
      },
      {
        title: "لپ‌تاپ",
        slug: "laptops",
      },
      {
        title: "لوازم جانبی موبایل",
        slug: "mobile-accessories",
      },
    ],
  },

  {
    title: "مد و پوشاک",
    slug: "fashion",
    children: [
      {
        title: "مردانه",
        children: [
          {
            title: "پیراهن مردانه",
            slug: "mens-shirts",
          },
          {
            title: "کفش مردانه",
            slug: "mens-shoes",
          },
          {
            title: "ساعت مردانه",
            slug: "mens-watches",
          },
        ],
      },

      {
        title: "زنانه",
        children: [
          {
            title: "لباس و پیراهن زنانه",
            slug: "womens-dresses",
          },
          {
            title: "کفش زنانه",
            slug: "womens-shoes",
          },
          {
            title: "کیف زنانه",
            slug: "womens-bags",
          },
          {
            title: "زیورآلات زنانه",
            slug: "womens-jewellery",
          },
          {
            title: "ساعت زنانه",
            slug: "womens-watches",
          },
        ],
      },

      {
        title: "لباس زنانه",
        slug: "tops",
      },
      {
        title: "عینک آفتابی",
        slug: "sunglasses",
      },
    ],
  },

  {
    title: "خانه و آشپزخانه",
    slug: "home-kitchen",
    children: [
      {
        title: "مبلمان",
        slug: "furniture",
      },
      {
        title: "دکوراسیون خانه",
        slug: "home-decoration",
      },
      {
        title: "لوازم آشپزخانه",
        slug: "kitchen-accessories",
      },
    ],
  },

  {
    title: "زیبایی و مراقبت شخصی",
    slug: "beauty-personal-care",
    children: [
      {
        title: "زیبایی و آرایشی",
        slug: "beauty",
      },
      {
        title: "مراقبت از پوست",
        slug: "skin-care",
      },
      {
        title: "عطر و ادکلن",
        slug: "fragrances",
      },
    ],
  },

  {
    title: "مواد غذایی و خواربار",
    slug: "groceries",
    children: [],
  },

  {
    title: "ورزش و فضای باز",
    slug: "sports-outdoors",
    children: [
      {
        title: "لوازم ورزشی",
        slug: "sports-accessories",
      },
    ],
  },

  {
    title: "خودرو و وسایل نقلیه",
    slug: "automotive",
    children: [
      {
        title: "خودرو",
        slug: "vehicle",
      },
      {
        title: "موتورسیکلت",
        slug: "motorcycle",
      },
    ],
  },
]