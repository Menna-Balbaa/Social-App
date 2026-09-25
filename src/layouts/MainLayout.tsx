import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="pb-18.5">
        <Navbar/>
      </div>
        <Outlet />
    
    </>
  )
}
