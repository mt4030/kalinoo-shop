
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import MobileBottomNav from "@/components/shared/Header/mobilenav";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Outlet,useLocation } from "react-router-dom";


export default function CustomerLayout(){
 const location = useLocation()

  const isProductPage = location.pathname.startsWith("/product/")


return(
       

    <div className="flex min-h-screen flex-col ">
   <ScrollToTop />
        <Header/>
    <Outlet/>


<Footer/>
      {!isProductPage && <MobileBottomNav />}
   </div>
)

}



