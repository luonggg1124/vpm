import React, { JSX } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import ProjectQuantity from "./components/ProjectQuantity";
import TasksByPerformer from "./components/TasksByPerformer";
import TaskQuantity from "./components/TaskQuantity";
import StatisticTable from "./components/Table";

const Dashboard: React.FC = () => {
  const items: { title: string; component: JSX.Element }[] = [
    {
      title: "Thống kê theo số lượng dự án",
      component: <ProjectQuantity />,
    },
    {
      title: "Số lượng task theo người thực hiện",
      component: <TasksByPerformer />,
    },
    {
      title: "Thống kê theo số lượng dự án",
      component: <TaskQuantity />,
    },
    {
      title: "",
      component: <StatisticTable />,
    },
  ];
  return (
    <div className="my-2 flex flex-col gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {" "}
              Tổng quan <title>Tổng quan</title>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="font-medium text-xl">Tổng quan</h2>
      <div className="grid grid-cols-2 gap-2 ">
        {items.map((item, index) => (
          <div key={index} className="col-span-1 overflow-hidden h-[518px] border-1 rounded-md  flex flex-col ">
            {item.title ? <h3 className="font-medium text-md px-4 py-1">{item.title}</h3> : ""}
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
