import { useRoutes } from "react-router-dom";
import path from "./path";
import AppLayout from "../layout/app";
import MainLayout from "@/layout/main";
import NotFound from "@/pages/notfound";


const Routes = () => {
  const routes = useRoutes([
    
    {
      path: "",
      element: <AppLayout />,
      children: [...path],
    },
    {
      path: "/*",
      element: <MainLayout/>,
      children: [
        {
          path: "*",
          element: <NotFound/>
        }
      ]
    },
  ]);
  return routes;
};

export default Routes;
