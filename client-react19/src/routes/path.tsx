

import CreateProject from "@/pages/project/children/page/Create";
import MainLayout from "../layout/main";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import Project from "../pages/project";
import ProjectsApprove from "../pages/project/children/page/Approve";
import ListProjects from "../pages/project/children/page/List";
import Detail from "@/pages/project/children/page/Detail";
import UpdateProject from "@/pages/project/children/page/Update";
import Personnel from "@/pages/personnel";

import Task from "@/pages/task";
import ListTask from "@/pages/task/children/page/List";
import CreateTask from "@/pages/task/children/page/Create";
import ListPersonnel from "@/pages/personnel/children/page/List";
import CreatePersonnel from "@/pages/personnel/children/page/Create";
import UpdateTask from "@/pages/task/children/page/Update";


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
          {
            path: "update/:id",
            element: <UpdateProject   />,
          },
          {
            path: ":id/task/create",
            element: <CreateTask   />,
          },
          {
            path: ":id/task/update/:taskId",
            element: <UpdateTask   />,
          },
        ],
      },
      {
        path: "/personnel",
        element: <Personnel/>,
        children: [
          {
            path: "",
            element: <ListPersonnel/>
          },
          {
            path: "create",
            element: <CreatePersonnel/>
          },
        ]
      },
      {
        path: "/tasks",
        element: <Task/>,
        children: [
          {
            path: "",
            element: <ListTask/>
          },
          
        ]
      }
    ],
  },
];

export default path;
