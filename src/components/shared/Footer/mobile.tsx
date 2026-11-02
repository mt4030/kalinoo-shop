import snapplogo from "../../../assets/snapp-box-logo.svg";
import FooterAccordion from "./FooterAccordion";

export default function Mobilefooter(){

return(
    <div className="px-8 sm:hidden">
        {/* Accordion */}
        <FooterAccordion />

        {/* Contact */}
        <div className="mt-8 pb-8">
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

          <div className="mt-6 flex items-center gap-4 border-t border-zinc-200 pt-5">
            <img
              src={snapplogo}
              className="w-20 shrink-0"
              alt="Snapp Box"
            />

            <p className="text-sm font-medium leading-6 text-zinc-600">
              تمامی سفارش‌های اکسپرس، توسط اسنپ‌باکس به شما تحویل داده می‌شود.
            </p>
          </div>
        </div>
      </div>
)

}

