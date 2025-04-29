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
import { PATH_PROJECT } from "@/constants/path/project";
import { AlignLeft, ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";


import { PaginationMeta } from "@/api/hook/usePaginate";

import dayjs from "dayjs";

import UpdateAction from "./components/update";
import DeleteAction from "./components/delete";
import { FILTER_DOCS_KEY } from "../Filter";
import { IDocs } from "@/api/interfaces/IDocs";
import { Button } from "@/components/ui/button";

const DocTable = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [perPage, setPerPage] = useState<string>("10");
  const { id } = useParams();
  const { data: projectsData, isFetching } = useQueryConfig(
    [
      PATH_PROJECT.QUERY_KEY,
      PATH_PROJECT.DOCS.QUERY_KEY +
        `?paginate=true_docs_table&per_page=${perPage}&page=${
          params.get("page") || 1
        }&${PATH_PROJECT.DOCS.Filter(
          params.get(FILTER_DOCS_KEY.name) || "",
          params.get(FILTER_DOCS_KEY.uuid) || ""
        )}`,
    ],
    PATH_PROJECT.DOCS.ROUTE(id) +
      `?paginate=true&per_page=${perPage}&page=${
        params.get("page") || 1
      }&${PATH_PROJECT.DOCS.Filter(
        params.get(FILTER_DOCS_KEY.name) || "",
        params.get(FILTER_DOCS_KEY.uuid) || ""
      )}`
  );

  const docs: IDocs[] = (projectsData as any)?.data?.data || [];

  const pagination: PaginationMeta =
    (projectsData as any)?.data?.pagination || null;
  const [sort, setSort] = useState<"started_at" | "ended_at" | string>(
    "started_at"
  );

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
                  Tiêu đề tài liệu
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Dự án
                </TableHead>

                <TableHead className="border-l-1 text-center text-[13px]">
                  Mã tài liệu
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Tệp đính kèm
                </TableHead>
                <TableHead className="border-l-1 text-center text-[13px]">
                  Ngày thêm
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
                    </TableRow>
                  ))
                : docs.map((item, index) => {
                    console.log(item);

                    return (
                      <TableRow key={index}>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                          {item?.title}
                        </TableCell>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                          {item?.project?.name}
                        </TableCell>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                          {item?.uuid}
                        </TableCell>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                         {item?.file}
                        </TableCell>
                        <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  break-words">
                          {dayjs(item.added_at).format('D/M')}
                        </TableCell>
                       
                       
                        <TableCell className="text-[12px] border-l-1 w-[167px] max-w-[167px]">
                          <div className="flex w-full h-full items-center gap-2">
                            <UpdateAction docs={item} />
                            <DeleteAction docs={item} />
                            <Link to={`/projects/`}>
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
                    );
                  })}
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
export default DocTable;
