import React, { useState } from "react";

import Paginate from "@/components/page/paginate";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlignLeft, ChevronUp, Plus } from "lucide-react";
import QuantityProject from "@/pages/project/children/components/ProjectQuantity";
import Filter, {
  FILTER_PROJECT_KEY,
} from "@/pages/project/children/components/Filter";
import ProjectTable from "@/pages/project/children/components/ProjectTable";
import useQueryConfig from "@/api/hook/useQueryConfig";
import { PATH_PROJECT } from "@/constants/path/project";
import { IProject } from "@/api/interfaces/IProject";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { PaginationMeta } from "@/api/hook/usePaginate";
import { getLocalStorage } from "@/utils/local-storage";
import { USER_INFO } from "@/constants/auth";
import { useLocalStorageState } from "@/api/hook/useLocalStorageState";

const Project: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [perPage, setPerPage] = useState<string>("10");
  const { data: projectsData, isFetching } = useQueryConfig(
    [
      PATH_PROJECT.QUERY_KEY,
      PATH_PROJECT.PROJECTS.QUERY_KEY +
        `?paginate=true_project_table&include=pm&per_page=${perPage}&page=${
          params.get("page") || 1
        }&${PATH_PROJECT.PROJECTS.Filter(
          params.get(FILTER_PROJECT_KEY.name) || "",
          params.get(FILTER_PROJECT_KEY.uuid) || "",
          params.get(FILTER_PROJECT_KEY.status) || "",
          params.get(FILTER_PROJECT_KEY.startDate) || "",
          params.get(FILTER_PROJECT_KEY.endDate) || ""
        )}`,
    ],
    PATH_PROJECT.PROJECTS.ROUTE +
      `?paginate=true&include=pm&per_page=${perPage}&page=${
        params.get("page") || 1
      }&${PATH_PROJECT.PROJECTS.Filter(
        params.get(FILTER_PROJECT_KEY.name) || "",
        params.get(FILTER_PROJECT_KEY.uuid) || "",
        params.get(FILTER_PROJECT_KEY.status) || "",
        params.get(FILTER_PROJECT_KEY.startDate) || "",
        params.get(FILTER_PROJECT_KEY.endDate) || ""
      )}`
  );

  const project: IProject[] = (projectsData as any)?.data?.data || [];
  const pagination: PaginationMeta =
    (projectsData as any)?.data?.pagination || null;

  const [sort, setSort] = useState<"started_at" | "ended_at" | "" | string>("");
  const { state: userRole } = useLocalStorageState(USER_INFO.ROLE, "");
  const onChangePage = (page: number) => {
    params.set("page", String(page));

    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <QuantityProject />
      <Filter type="project" />
     

      <div className="w-1000px">
        <ProjectTable
          project={project}
          loading={isFetching}
          sortByDate={sort}
          changeStatus={{
            statuses: [],
            lock: true,
          }}
          action={{
            lock: userRole === "ADMIN" || userRole === "PM",
            changeStatus: userRole === "ADMIN" || userRole === "PM",
            delete: userRole === "ADMIN",
            watch: true,
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
          <p className="text-sm border p-2 rounded-lg">
            Tổng số bản ghi : {pagination?.total_item}
          </p>
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

export default Project;
