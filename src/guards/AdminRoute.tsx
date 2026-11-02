import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const isLoggedIn = true; // temporary
  const isAdmin = true;    // temporary

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}