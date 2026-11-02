
import { Outlet } from "react-router-dom";
import Adminsidebar from "../components/adminsidebar";

export default function AdminLayout(){

return(
    <>
      <Adminsidebar/>
    <Outlet/>
    </>
  
)

}