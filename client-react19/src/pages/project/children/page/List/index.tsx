import React from "react";
import BreadCrumb from "./components/ui/bread-crumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import Initiation from "./components/Initiation";
import Project from "./components/Project";
import { FILTER_PROJECT_KEY } from "../../components/Filter";
import { useNavigate } from "react-router-dom";
const triggers = [
  {
    label: "Khởi tạo",
    value: "initiation",
  },
  {
    label: "Lưu trữ",
    value: "project",
  },
];
const ListProjects: React.FC = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const onClear = () => {
    Object.values(FILTER_PROJECT_KEY).forEach((key) => params.delete(key));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="my-2 flex flex-col gap-3">
      <BreadCrumb />
      <h2 className="font-medium text-xl">Dự án</h2>
      <Tabs defaultValue={triggers[0].value} className="w-full bg-none">
        <TabsList classDefault={false} className="flex gap-8">
          {triggers.map((item, index) => (
            <TabsTrigger
              onClick={onClear}
              key={index}
              classDefault={false}
              className={cn(
                "relative cursor-pointer font-semibold transition",
                "data-[state=active]:cursor-default",
                "data-[state=active]:text-[#53B69A]",
                "data-[state=active]:after:content-['']",
                "data-[state=active]:after:absolute data-[state=active]:after:left-1/2",
                "data-[state=active]:after:top-full data-[state=active]:after:-translate-x-1/2",
                "data-[state=active]:after:mt-1 data-[state=active]:after:h-1 data-[state=active]:after:w-16",
                "data-[state=active]:after:bg-[#53B69A]"
              )}
              value={item.value}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="project">
          <Project />
        </TabsContent>
        <TabsContent value="initiation">
          <Initiation />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default ListProjects;
