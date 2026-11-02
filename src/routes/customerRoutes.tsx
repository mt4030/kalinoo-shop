import CustomerLayout from "../layouts/CustomerLayout";
import HomePage from "../pages/customer/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Search from "../pages/customer/SearchPage";
import SubcategoryPage from "../pages/customer/SubcategoryPage";
import ProductPage from "../pages/customer/ProductPage";
import Cart from "../pages/customer/checkout/cart";



export const CustomerRoutes =
    {path:'/',
element:<CustomerLayout/>,
errorElement:<ErrorPage/>,
children:[
    {index: true,element:<HomePage/>},
    {path: 'products/search',element:<Search/>},
      {path:'/category/:categorySlug/:subcategorySlug',element:<SubcategoryPage/>},
    {path: 'product/:id',element:<ProductPage/>}
    ,{path: 'checkout/cart',element:<Cart/>},

]
        
    }

