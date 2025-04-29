import useQueryConfig from "@/api/hook/useQueryConfig";
import Paginate from "@/components/page/paginate";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
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
import { ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FILTER_TASK_KEY } from "../Filter";
import { ITask, taskStatusString } from "@/api/interfaces/ITask";
import { PaginationMeta } from "@/api/hook/usePaginate";
import UpdateAction from "./components/update";
import DeleteAction from "./components/delete";
import { PATH_TASK } from "@/constants/path/task";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

const TaskTable = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [perPage, setPerPage] = useState<string>("10");

  const { data: taskData, isFetching } = useQueryConfig(
    [
      PATH_TASK.QUERY_KEY,
      PATH_TASK.ALL.ROUTE +
        `?include=designated_personnel,designating_personnel&paginate=true_tasks_table&per_page=${perPage}&page=${
          params.get("page") || 1
        }&${PATH_TASK.ALL.Filter(
          params.get(FILTER_TASK_KEY.name) || "",
          params.get(FILTER_TASK_KEY.uuid) || "",
          params.get(FILTER_TASK_KEY.status) || "",
          params.get(FILTER_TASK_KEY.designated_personnel) || "",
          params.get(FILTER_TASK_KEY.designating_personnel) || ""
        )}`,
    ],
    PATH_TASK.ALL.ROUTE +
      `?include=designated_personnel,designating_personnel,project&paginate=true&per_page=${perPage}&page=${
        params.get("page") || 1
      }&${PATH_TASK.ALL.Filter(
        params.get(FILTER_TASK_KEY.name) || "",
        params.get(FILTER_TASK_KEY.uuid) || "",
        params.get(FILTER_TASK_KEY.status) || "",
        params.get(FILTER_TASK_KEY.designated_personnel) || "",
        params.get(FILTER_TASK_KEY.designating_personnel) || ""
      )}`
  );
  const tasks: ITask[] = (taskData as any)?.data?.data || [];
  const pagination: PaginationMeta =
    (taskData as any)?.data?.pagination || null;
  const onChangePage = (page: number) => {
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* <h3 className="text-lg font-semibold">Danh sách thành viên tham gia</h3> */}
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
                  Dự án
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Người chỉ định
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
                      <TableCell>
                        <Skeleton className="h-7 " />
                      </TableCell>
                    </TableRow>
                  ))
                : tasks.map((item, index) => {
                  console.log(item);
                  
                  return <TableRow key={index}>
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                    {index + 1}
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
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal break-words">
                    <span className="font-semibold">
                      {taskStatusString(item?.status)}
                    </span>{" "}
                    -{" "}
                    {dayjs(
                      item.status_changed_at ? item.status_changed_at : ""
                    ).format("D/M/YYYY")}
                  </TableCell>
                  
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                    {item?.feature}
                  </TableCell>
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                    {item?.project?.name}
                  </TableCell>
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                    <span className="font-semibold">
                      {item?.designating_personnel.name}
                    </span>{" "}
                    -{" "}
                    {dayjs(item.ended_at ? item.ended_at : "").format(
                      "D/M/YYYY"
                    )}
                  </TableCell>
                  <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                    <span className="font-semibold">
                      {item?.designated_personnel.name}
                    </span>{" "}
                    -{" "}
                    {dayjs(item.ended_at ? item.ended_at : "").format(
                      "D/M/YYYY"
                    )}
                  </TableCell>
                  <TableCell className="text-[12px] border-l-1 ">
                    <div className="flex w-full h-full items-center gap-2">
                      <UpdateAction task={item} />
                      <DeleteAction task={item} />
                      <Link to={`/projects`}>
                        <Button
                          variant="outline"
                          className="cursor-pointer size-9 text-center hover:bg-gray-200  text-gray-700"
                        >
                          <Eye />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
                })}
            </TableBody>
          </Table>
        </div>
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
    </div>
  );
};
export default TaskTable;
