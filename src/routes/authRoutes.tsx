import AuthLayout from "@/app/layouts/AuthLayout"
import LoginPage  from "../pages/auth/LoginPage "
import RegisterPage from "../pages/auth/RegisterPage"

import ErrorPage from "../pages/ErrorPage"


export const authRoutes = 
    {
  path: "/auth",
  element: <AuthLayout />,
  errorElement:<ErrorPage/>,
  children: [
    {
      path: "login",
      element: <LoginPage  />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
}



