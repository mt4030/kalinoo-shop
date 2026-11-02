import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../@/components/ui/accordion"

export default function FooterAccordion() {
  return (
    <Accordion  className="w-full">
      <AccordionItem value="about" className="border-b-zinc-300">
        <AccordionTrigger>
          با اسنپ شاپ
        </AccordionTrigger>

        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="customer-service" className="border-b-zinc-300">
        <AccordionTrigger>
          خدمات مشتری
        </AccordionTrigger>

        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shopping-guide" >
        <AccordionTrigger className='' >
          راهنمای خرید از اسنپ شاپ
        </AccordionTrigger >

        <AccordionContent >
          <ul className="space-y-4 text-sm text-zinc-600 ">
            <li className="cursor-pointer transition hover:text-purple-600">
              ثبت سفارش
            </li>

            <li className="cursor-pointer transition hover:text-purple-600">
              رویه‌های ارسال سفارش
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}