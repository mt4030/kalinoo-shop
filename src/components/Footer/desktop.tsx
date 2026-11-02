import snapplogo from "../../assets/snapp-box-logo.svg";


export default function Desktopfotter(){

return(
     <section className="mx-auto hidden  max-w-7xl grid-cols-1 gap-12 px-8 pb-12 sm:grid md:grid-cols-2 lg:grid-cols-4">
  
        {/* About */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            با اسنپ شاپ
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-purple-600">
              در اسنپ شاپ فروشنده شوید
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              تماس با اسنپ شاپ
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              درباره اسنپ شاپ
            </li>
          </ul>
        </div>

        {/* Customer service */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            خدمات مشتری
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-purple-600">
              پرسش‌های متداول
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              روش‌های مرجوعی کالا در اسنپ شاپ
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              قوانین و شرایط استفاده
            </li>
          </ul>
        </div>

        {/* Shopping guide */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            راهنمای خرید از اسنپ شاپ
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-purple-600">
              ثبت سفارش
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              رویه‌های ارسال سفارش
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            تماس با ما
          </h3>

          <div className="space-y-4 text-sm leading-7 text-zinc-600">
            <p className="font-medium text-zinc-800">
              هر روز از ۹ صبح تا ۱۲ بامداد پاسخگوی شما هستیم.
            </p>

            <p className="font-semibold text-purple-600">
              راهنمایی و پشتیبانی
            </p>

            <p>
              آدرس ایمیل:
              <span className="mr-1 text-purple-600">
                info@snappshop.ir
              </span>
            </p>
          </div>

          <div className="mt-6 flex items-center  gap-4 border-t border-zinc-200 pt-5">
            <img
              src={snapplogo}
              className="w-20 shrink-0 "
              alt="Snapp Box"
            />

            <p className="text-sm font-medium leading-6 text-zinc-600">
              تمامی سفارش‌های اکسپرس، توسط اسنپ‌باکس به شما تحویل داده می‌شود.
            </p>
          </div>
        </div>

      </section>

  
     
)

}

