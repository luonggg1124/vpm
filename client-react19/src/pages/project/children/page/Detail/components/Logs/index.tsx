import useQueryConfig from "@/api/hook/useQueryConfig";
import Filter, { LOG_FILTER_KEY } from "./components/Filter";
import Section from "./components/Section";
import { PATH_LOG } from "@/constants/path/log";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronUp } from "lucide-react";
import { PaginationMeta } from "@/api/hook/usePaginate";
import Paginate from "@/components/page/paginate";
import { useState } from "react";

const Logs = () => {
  const {id} = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState<string>("10");
  const { data: logsData } = useQueryConfig(
    [
      PATH_LOG.QUERY_KEY,
      PATH_LOG.ALL.ROUTE +
        `?include=user&per_page=${perPage}&${PATH_LOG.ALL.Filter(
          params.get(LOG_FILTER_KEY.userName) || "",
          params.get(LOG_FILTER_KEY.time) || ""
        )}&page=${
        params.get("page") || 1
      }-logs&project_id=${id}`,
    ],
    PATH_LOG.ALL.ROUTE +
      `?include=user&per_page=${perPage}&${PATH_LOG.ALL.Filter(
        params.get(LOG_FILTER_KEY.userName) || "",
        params.get(LOG_FILTER_KEY.time) || ""
      )}&page=${
        params.get("page") || 1
      }&project_id=${id}`
  );
  const logs = (logsData as any)?.data?.data || [];
  const pagination: PaginationMeta =
    (logsData as any)?.data?.pagination || null;
  const onChangePage = (page: number) => {
    params.set("page", String(page));

    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      <Section logs={logs} />
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

export default Logs;
