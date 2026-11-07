
import ProtectedRoute from "../guards/ProtectedRoute";
import Profile from "../pages/account/profile";
import ErrorPage from "../pages/ErrorPage";
import Payment from "../pages/customer/checkout/paymentPage";
import ShopingPage from "../pages/customer/checkout/shopingPage";
import CustomerLayout from "@/app/layouts/CustomerLayout";

export const protectedRoutes ={
path:'/',element:<CustomerLayout/>,
errorElement:<ErrorPage/>,
children:[
{element:<ProtectedRoute/>,children:[
 {path: 'profile',element:<Profile/>},
    {path: 'checkout/Payment',element:<Payment/>}
    ,{path: 'checkout/Shoping',element:<ShopingPage/>}
]},
   
 
]
        
    }