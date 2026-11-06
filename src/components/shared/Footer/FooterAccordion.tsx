import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../@/components/ui/accordion"

export default function FooterAccordion() {
  return (
    <Accordion  className="w-full">
      <AccordionItem value="about" className="border-b-zinc-300">
        <AccordionTrigger>
          با کالینو شاپ
        </AccordionTrigger>

        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="customer-service" className="border-b-zinc-300">
        <AccordionTrigger>
          خدمات مشتری
        </AccordionTrigger>

        <AccordionContent>
          <ul className="space-y-4 text-sm text-zinc-600">
            <li className="cursor-pointer transition hover:text-[#2457D6]">
              پرسش‌های متداول
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]0">
              روش‌های مرجوعی کالا در کالینو شاپ
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              قوانین و شرایط استفاده
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shopping-guide" >
        <AccordionTrigger className='' >
          راهنمای خرید از کالینو شاپ
        </AccordionTrigger >

        <AccordionContent >
          <ul className="space-y-4 text-sm text-zinc-600 ">
            <li className="cursor-pointer transition hover:text-[#2457D6]">
              ثبت سفارش
            </li>

            <li className="cursor-pointer transition hover:text-[#2457D6]">
              رویه‌های ارسال سفارش
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}