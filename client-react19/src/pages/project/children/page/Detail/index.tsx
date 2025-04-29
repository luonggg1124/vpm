import useQueryConfig from "@/api/hook/useQueryConfig";

import { Button } from "@/components/ui/button";

import { PATH_PROJECT } from "@/constants/path/project";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BreadCrumb from "./components/ui/bread-crumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Project from "./components/Project";
import NotFound from "@/pages/notfound";
import { IProject } from "@/api/interfaces/IProject";
import { Skeleton } from "@/components/ui/skeleton";
import Tasks from "./components/Tasks";
import Docs from "./components/Docs";
import Logs from "./components/Logs";

const triggers = [
  {
    label: "Chi tiết",
    value: "project",
  },
  {
    label: "Nhiệm vụ",
    value: "tasks",
  },
  {
    label: "Tài liệu",
    value: "docs",
  },
  {
    label: "Hoạt động",
    value: "logs",
  },
];
const Detail = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const { data: projectData, isLoading } = useQueryConfig(
    [PATH_PROJECT.FIND.QUERY_KEY + id] + "?include=pm,pa",
    PATH_PROJECT.FIND.ROUTE + `/${id}?include=pm,pa`
  );
  const project: IProject = (projectData as any)?.data?.data;
  if (!isLoading && !project) {
    return <NotFound />;
  }
  const [params, setParams] = useSearchParams();
  return (
    <div className="my-2 flex flex-col gap-3">
      <BreadCrumb />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleBack}
          className="text-white bg-[#53B69A] hover:bg-[#53B69A] cursor-pointer"
          size="icon"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>{" "}
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <h2 className="font-medium text-xl">{project?.name}</h2>
        )}
      </div>
      <Tabs
        defaultValue={triggers[0].value}
        value={params.get("item") || "project"}
        className="w-full bg-none"
      >
        <TabsList classDefault={false} className="flex gap-8">
          {triggers.map((item, index) => (
            <TabsTrigger
              key={index}
              classDefault={false}
              onClick={() => {
                params.set("item", item.value);
                navigate(`?${params.toString()}`, {
                  replace: true,
                });
              }}
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
          <Project loading={isLoading} project={project} />
        </TabsContent>
        <TabsContent value="tasks">
          <Tasks />
        </TabsContent>
        <TabsContent value="docs">
          <Docs />
        </TabsContent>
        <TabsContent value="logs">
          <Logs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Detail;
