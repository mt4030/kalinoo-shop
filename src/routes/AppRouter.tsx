import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CustomerRoutes } from "./customerRoutes";
import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";
import { protectedRoutes } from "./protectedRoutes";


export default function AppRouter() {
  const router = createBrowserRouter([
    CustomerRoutes,
    authRoutes,
    adminRoutes,
    protectedRoutes
  ]);

  return <RouterProvider router={router} />;
}