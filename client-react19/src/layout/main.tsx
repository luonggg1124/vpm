import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import useAuth from "../api/hook/useAuth";
import Header from "./components/header";
import { Toaster } from "@/components/ui/sonner";


const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Header/>
      <main className="grid grid-cols-12 gap-2">
        <Sidebar className="col-span-2" />
        <div className="col-span-10 ">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};
export default MainLayout;
