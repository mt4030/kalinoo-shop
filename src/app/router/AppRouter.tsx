import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CustomerRoutes } from "../../routes/customerRoutes";
import { authRoutes } from "../../routes/authRoutes";
import { adminRoutes } from "../../routes/adminRoutes";
import { protectedRoutes } from "../../routes/protectedRoutes";

export default function AppRouter() {
  const router = createBrowserRouter([
    CustomerRoutes,
    authRoutes,
    adminRoutes,
    protectedRoutes
  ]);

  return <RouterProvider router={router} />;
}