import useQueryConfig from "@/api/hook/useQueryConfig";
import { PATH_PROJECT } from "@/constants/path/project";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter, { FILTER_PROJECT_KEY } from "../../components/Filter";
import { IProject, ProjectStatus } from "@/api/interfaces/IProject";
import { PaginationMeta } from "@/api/hook/usePaginate";
import QuantityProject from "../../components/ProjectQuantity";
import { AlignLeft, ChevronUp } from "lucide-react";
import ProjectTable from "../../components/ProjectTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Paginate from "@/components/page/paginate";
import BreadCrumb from "./components/ui/bread-crumb";
import { useLocalStorageState } from "@/api/hook/useLocalStorageState";
import { USER_INFO } from "@/constants/auth";

const ProjectsApprove: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [perPage, setPerPage] = useState<string>("10");
  const { state: creatorId } = useLocalStorageState(USER_INFO.ID, "");
  const { state: userRole } = useLocalStorageState(USER_INFO.ROLE, "");
  const { data: projectsData, isFetching } = useQueryConfig(
    [
      PATH_PROJECT.QUERY_KEY,
      PATH_PROJECT.APPROVE.QUERY_KEY +
        `?paginate=true_project_table&include=pa&per_page=${perPage}&page=${
          params.get("page") || 1
        }&${PATH_PROJECT.APPROVE.Filter(
          params.get(FILTER_PROJECT_KEY.name) || "",
          params.get(FILTER_PROJECT_KEY.uuid) || "",
          params.get(FILTER_PROJECT_KEY.status) || "",
          params.get(FILTER_PROJECT_KEY.startDate) || "",
          params.get(FILTER_PROJECT_KEY.endDate) || ""
        )}&creator_id=${userRole === "PM" ? creatorId : ""}`,
    ],
    PATH_PROJECT.APPROVE.ROUTE +
      `?paginate=true&include=pa&per_page=${perPage}&page=${
        params.get("page") || 1
      }&${PATH_PROJECT.APPROVE.Filter(
        params.get(FILTER_PROJECT_KEY.name) || "",
        params.get(FILTER_PROJECT_KEY.uuid) || "",
        params.get(FILTER_PROJECT_KEY.status) || "",
        params.get(FILTER_PROJECT_KEY.startDate) || "",
        params.get(FILTER_PROJECT_KEY.endDate) || ""
      )}&creator_id=${userRole === "PM" ? creatorId : ""}`
  );

  const project: IProject[] = (projectsData as any)?.data?.data || [];
  const pagination: PaginationMeta =
    (projectsData as any)?.data?.pagination || null;

  const [sort, setSort] = useState<"started_at" | "ended_at" | "" | string>("");

  const onChangePage = (page: number) => {
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreadCrumb />
      <QuantityProject
        display={{
          sum: false,
          waiting: true,
          refuse: true,
          developing: false,
          pausing: false,
          done: false,
          failed: false,
          close: false,
        }}
        
      />
      <Filter type="initiation" />

      <div className="w-1000px">
        <ProjectTable
          project={project}
          loading={isFetching}
          sortByDate={sort}
          action={{
            watch: true,
            changeStatus: true,
            delete: userRole==="ADMIN",
            sendForReview: userRole === "PM"
            
          }}
          changeStatus={{
            statuses: [
              ProjectStatus.Developing,
              ProjectStatus.Refuse,
              ProjectStatus.Waiting,
            ],
            type: "approve",
            lock: userRole !== "ADMIN",
          }}
        />
      </div>
      <div className="border-t-2 border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger arrowDisplay={false} className="w-[146px]">
              <AlignLeft /> <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sắp xếp theo</SelectLabel>
                <SelectItem value="started_at">Ngày bắt đầu</SelectItem>
                <SelectItem value="ended_at">Ngày kết thúc</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
          <Select value={perPage} onValueChange={setPerPage}>
            <SelectTrigger arrowDisplay={false} className="w-[146px]">
              <p>{perPage} / Trang</p>
              <ChevronUp />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Các bản ghi mỗi trang</SelectLabel>
                {Array.from({ length: 20 }).map((_, index) => {
                  return (
                    <SelectItem key={index} value={String(Number(index) + 5)}>
                      {Number(index) + 5} bản ghi
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </div>
        <div>
          {pagination && (
            <Paginate meta={pagination} onPageChange={onChangePage} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectsApprove;
