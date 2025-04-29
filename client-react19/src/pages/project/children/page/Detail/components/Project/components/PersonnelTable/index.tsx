import useQueryConfig from "@/api/hook/useQueryConfig";
import { IProject } from "@/api/interfaces/IProject";
import { IPersonnel } from "@/api/interfaces/IUser";
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
import { PATH_PROJECT } from "@/constants/path/project";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PersonnelTable = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get("page") || 1;
  const [perPage, setPerPage] = useState<string>("10");
  const { data: usersData,isLoading:loading } = useQueryConfig(
    [PATH_PROJECT.QUERY_KEY + `?paginate=true&per_page=${perPage}&page=${page}-personnel-table`],
    PATH_PROJECT.PERSONNEL.ROUTE(id) + `?paginate=true&per_page=${perPage}&page=${page}`
  );

  
  const users: IPersonnel[] = (usersData as any)?.data?.data || [];
  console.log(usersData);
  const pagination = (usersData as any)?.data?.pagination;

  const onChangePage = (page: number) => {
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Danh sách thành viên tham gia</h3>
      <div className="rounded-md overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-center text-[13px]">STT</TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Tài khoản
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Họ tên
              </TableHead>

              <TableHead className="border-l-1 text-center text-[13px]">
                Hoàn thành
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Đang xử lý
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Tạm dừng
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Quá hạn
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Tổng
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
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
              : users.map((participant: IPersonnel, index: any) => (
                  <TableRow key={index}>
                    <TableCell className="text-center text-[13px]">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.email}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.name}
                    </TableCell>

                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.done_count}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.pending_count}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.pausing_count}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.overdue_count}
                    </TableCell>
                    <TableCell className="border-l-1 text-center text-[13px]">
                      {participant.sum_count}
                    </TableCell>
                  </TableRow>
                ))}
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
          <p className="text-sm border p-2 rounded-lg">Tổng số bản ghi : {pagination?.total_item}</p>
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
export default PersonnelTable;
