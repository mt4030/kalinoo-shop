
import ProtectedRoute from "../guards/ProtectedRoute";
import CustomerLayout from "../layouts/CustomerLayout";
import ListPage from "../pages/account/lists";
import Orderpage from "../pages/account/order";
import Profile from "../pages/account/profile";
import ErrorPage from "../pages/ErrorPage";
import Payment from "../pages/customer/checkout/paymentPage";
import ShopingPage from "../pages/customer/checkout/shopingPage";

export const protectedRoutes ={
path:'/',element:<CustomerLayout/>,
errorElement:<ErrorPage/>,
children:[
{element:<ProtectedRoute/>,children:[
 {path: 'profile',element:<Profile/>},
    {path: 'order',element:<Orderpage/>},
    {path: 'list',element:<ListPage/>},
    {path: 'checkout/Payment',element:<Payment/>}
    ,{path: 'checkout/Shoping',element:<ShopingPage/>}
]},
   
 
]
        
    }