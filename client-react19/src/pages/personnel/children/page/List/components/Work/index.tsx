import { PATH_USER } from "@/constants/path/user";
import Filter, { FILTER_PERSONNEL_KEY } from "./components/Filter";
import PersonnelTable from "./components/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPersonnel } from "@/api/interfaces/IUser";
import useQueryConfig from "@/api/hook/useQueryConfig";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronUp, Plus } from "lucide-react";
import Paginate from "@/components/page/paginate";
import { Button } from "@/components/ui/button";

const Work = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get("page") || 1;
  const [perPage, setPerPage] = useState<string>("10");
  const { data: usersData, isLoading: loading } = useQueryConfig(
    [
      PATH_USER.QUERY_KEY +
        `?${PATH_USER.PERSONNEL.Filter(
          params.get(FILTER_PERSONNEL_KEY.name) || "",
          params.get(FILTER_PERSONNEL_KEY.email) || "",
          params.get(FILTER_PERSONNEL_KEY.project_name) || ""
        )}&per_page=${perPage}&page=${page}-create`,
    ],
    PATH_USER.PERSONNEL.ROUTE +
      `?${PATH_USER.PERSONNEL.Filter(
        params.get(FILTER_PERSONNEL_KEY.name) || "",
        params.get(FILTER_PERSONNEL_KEY.email) || "",
        params.get(FILTER_PERSONNEL_KEY.project_name) || ""
      )}&per_page=${perPage}&page=${page}`
  );
  const users: IPersonnel[] = (usersData as any)?.data?.data || [];
  const pagination = (usersData as any)?.data?.pagination;

  const onChangePage = (page: number) => {
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4 my-4">
      <p>Tổng số chưa phân công : 14</p>
      <Filter />
      
      <PersonnelTable loading={loading} personnel={users} />
      <div className="border-t-2 border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
                    <SelectItem value={String(Number(index) + 5)}>
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

export default Work;
