import Benefit from "./benefit";
import Desktopfotter from "./desktop";
import Mobilefooter from "./mobile";


export default function Footer() {
  return (
    <footer dir="rtl" className=" md:mt-32  bg-gray-200  " >
<div className="mx-auto  max-w-7xl   px-8 pb-12 mt-5 ">
      <Benefit />
</div>
      <Desktopfotter/>
      <Mobilefooter/>

     
      <div className="border-t border-zinc-200 py-5 text-center text-xs text-zinc-500">
        تمامی حقوق این وب‌سایت محفوظ است.
      </div>
    </footer>
  );
}

