
import { Outlet,useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "@/components/Header/mobilenav";
import ScrollToTop from "@/components/ScrollToTop";

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



