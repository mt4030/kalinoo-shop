
import Adminsidebar from "@/features/admin/components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout(){

return(
    <>
      <Adminsidebar/>
    <Outlet/>
    </>
  
)

}