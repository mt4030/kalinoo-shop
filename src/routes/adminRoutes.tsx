import AdminRoute from "../guards/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";

export const adminRoutes = {

  path: "/admin",
  element:<AdminRoute/>,
children:[
    {element:<AdminLayout/>,
 children: [
    {
      index: true,
      element: <div>Admin Dashboard</div>,
    },
    {
      path: "products",
      element: <div>Admin Products</div>,
    },
    {
      path: "products/new",
      element: <div>New Product</div>,
    },
    {
      path: "products/:id/edit",
      element: <div>Edit Product</div>,
    },
    {
      path: "categories",
      element: <div>Admin Categories</div>,
    },
    {
      path: "orders",
      element: <div>Admin Orders</div>,
    },
    {
      path: "orders/:id",
      element: <div>Admin Order Details</div>,
    },
    {
      path: "users",
      element: <div>Admin Users</div>,
    },
    {
      path: "reviews",
      element: <div>Admin Reviews</div>,
    },
    {
      path: "inventory",
      element: <div>Admin Inventory</div>,
    },
  ],
    }
]
 
  
};

