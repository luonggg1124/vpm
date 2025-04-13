

import CreateProject from "@/pages/project/children/page/Create";
import MainLayout from "../layout/main";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import Project from "../pages/project";
import ProjectsApprove from "../pages/project/children/page/Approve";
import ListProjects from "../pages/project/children/page/List";
import Detail from "@/pages/project/children/page/Detail";

const path = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <Project />,
        children: [
          {
            path: "",
            element: <ListProjects />,
          },
          {
            path: "approve",
            element: <ProjectsApprove />,
          },
          {
            path: "create",
            element: <CreateProject />,
          },
          {
            path: ":id",
            element: <Detail   />,
          },
        ],
      },
    ],
  },
];

export default path;
