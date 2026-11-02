import FastDelivery from "../../../assets/FastDelivery.webp";
import Warranty from "../../../assets/Warranty.webp";
import Support from "../../../assets/Support.webp";

const benefits = [
  {
    title: "ارسال در کوتاه‌ترین زمان",
    description:
      "با امکان ارسال اکسپرس، سفارش خود را در کمتر از ۳ ساعت تحویل بگیرید.",
    image: FastDelivery,
    alt: "Fast delivery",
  },
  {
    title: "پشتیبانی در ۷ روز هفته",
    description:
      "کارشناس‌های اسنپ‌شاپ ۷ روز هفته آماده پاسخ‌گویی به سوالات شما هستند.",
    image: Support,
    alt: "Customer support",
  },
  {
    title: "بازگشت کالا تا ۷ روز",
    description:
      "در صورت وجود مشکل در سفارش، می‌توانید تا ۷ روز آن را مرجوع کنید.",
    image: Warranty,
    alt: "Product warranty",
  },
];

export default function Benefit() {
  return (
    <section className=" hidden sm:block  bg-white p-8 shadow-xl flex rounded ">
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="flex  items-center gap-4 border-b border-zinc-100 pb-6 last:border-b-0 last:pb-0 md:border-b-0 md:border-l md:pb-0 md:pl-6 md:last:border-l-0"
        >
          <div className="flex min-w-20 h-20 w-20 shrink-0 items-center justify-center">
            <img
              src={benefit.image}
              alt={benefit.alt}
              className="h-full bg-gray-200 p-2 rounded mr-3 w-full object-contain"
            />
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold text-zinc-900">
              {benefit.title}
            </h2>

            <p className="text-xs leading-6 text-zinc-500">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}