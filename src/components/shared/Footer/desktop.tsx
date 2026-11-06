import snapplogo from "../../../assets/snapp-box-logo.svg";


export default function Desktopfotter(){

return(
     <section className="mx-auto hidden  max-w-7xl grid-cols-1 gap-12 px-8 pb-12 sm:grid md:grid-cols-2 lg:grid-cols-4">
  

        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            با کالینو شاپ
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-[#2457D6]">
              در کالینو شاپ فروشنده شوید
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              تماس با کالینو شاپ
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              درباره کالینو شاپ
            </li>
          </ul>
        </div>

   
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            خدمات مشتری
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-[#2457D6]">
              پرسش‌های متداول
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              روش‌های مرجوعی کالا در کالینو شاپ
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              قوانین و شرایط استفاده
            </li>
          </ul>
        </div>

   
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            راهنمای خرید از کالینو شاپ
          </h3>

          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-[#2457D6]">
              ثبت سفارش
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              رویه‌های ارسال سفارش
            </li>
          </ul>
        </div>

 
        <div>
          <h3 className="mb-5 text-lg font-bold text-zinc-900">
            تماس با ما
          </h3>

          <div className="space-y-4 text-sm leading-7 text-zinc-600">
            <p className="font-medium text-zinc-800">
              هر روز از ۹ صبح تا ۱۲ بامداد پاسخگوی شما هستیم.
            </p>

            <p className="font-semibold text-[#2457D6]">
              راهنمایی و پشتیبانی
            </p>

            <p>
              آدرس ایمیل:
              <span className="mr-1 text-[#2457D6]">
                info@kalinooshop.ir
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
              تمامی سفارش‌های اکسپرس، توسط کالینوباکس به شما تحویل داده می‌شود.
            </p>
          </div>
        </div>

      </section>

  
     
)

}

