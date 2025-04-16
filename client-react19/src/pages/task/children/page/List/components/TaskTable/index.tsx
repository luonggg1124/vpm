import useQueryConfig from "@/api/hook/useQueryConfig";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlignLeft, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FILTER_TASK_KEY } from "../Filter";
import { ITask, taskStatusString } from "@/api/interfaces/ITask";
import { PaginationMeta } from "@/api/hook/usePaginate";
import UpdateAction from "./components/update";
import DeleteAction from "./components/delete";
import { PATH_TASK } from "@/constants/path/task";

const TaskTable = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [perPage, setPerPage] = useState<string>("10");

  const { data: taskData, isFetching } = useQueryConfig(
    [
      PATH_TASK.QUERY_KEY,
      PATH_TASK.ALL.ROUTE +
        `?include=designated_personnel&paginate=true_tasks_table&per_page=${perPage}&page=${
          params.get("page") || 1
        }&${PATH_TASK.ALL.Filter(
          params.get(FILTER_TASK_KEY.name) || "",
          params.get(FILTER_TASK_KEY.uuid) || "",
          params.get(FILTER_TASK_KEY.status) || ""
        )}`,
    ],
    PATH_TASK.ALL.ROUTE +
      `?include=designated_personnel&paginate=true&per_page=${perPage}&page=${
        params.get("page") || 1
      }&${PATH_TASK.ALL.Filter(
        params.get(FILTER_TASK_KEY.name) || "",
        params.get(FILTER_TASK_KEY.uuid) || "",
        params.get(FILTER_TASK_KEY.status) || ""
      )}`
  );

  const tasks: ITask[] = (taskData as any)?.data?.data || [];
  const pagination: PaginationMeta =
    (taskData as any)?.data?.pagination || null;
  const [sort, setSort] = useState<"started_at" | "ended_at" | string>(
    "started_at"
  );
  console.log(tasks);
  
  const onChangePage = (page: number) => {
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Danh sách thành viên tham gia</h3>
        <div className="rounded-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-center text-[13px]">STT</TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Tiêu đề
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Nội dung
                </TableHead>

                <TableHead className="border-l-1 text-center text-[13px]">
                  Mã
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Trạng thái
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Tính năng
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Chỉ định
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Hoạt động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                    </TableRow>
                  ))
                : tasks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                        {item?.id}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {item?.name}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {item?.description}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {item?.uuid}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {taskStatusString(item?.status)} -{" "}
                        {item.status_changed_at}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {item?.feature}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                        {item?.designated_personnel.name} - {item.ended_at}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 ">
                        <div className="flex w-full h-full items-center gap-2">
                          <UpdateAction task={item} />
                          <DeleteAction task={item} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t-2 border-gray-200 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={(v) => setSort(v)}>
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
    </div>
  );
};
export default TaskTable;
