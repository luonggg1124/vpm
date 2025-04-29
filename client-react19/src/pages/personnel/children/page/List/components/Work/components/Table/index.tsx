import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import { Skeleton } from "@/components/ui/skeleton";
import { sortByDateAsc } from "@/utils/datetime";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Delete from "./components/delete";
import { IPersonnel } from "@/api/interfaces/IUser";

type Props = {
  personnel: IPersonnel[];
  loading?: boolean;
  sortByDate?: string;
};
const PersonnelTable = ({
  personnel,
  loading = false,
  sortByDate = "started_at",
}: Props) => {
  if (Boolean(sortByDate)) {
    personnel = sortByDateAsc(personnel, sortByDate);
  }
  const [selectedRows, setSelectedRows] = useState<IPersonnel[]>([]);

  // Handle individual row selection
  const handleRowSelect = (e: boolean, personnelAdded: IPersonnel) => {
    if (e) {
      const alreadyHave = selectedRows.find(
        (item) => item.id === personnelAdded.id
      );
      if (!Boolean(alreadyHave)) {
        setSelectedRows([...selectedRows, personnelAdded]);
      }
    } else {
      setSelectedRows(
        selectedRows.filter((pro) => pro.id !== personnelAdded.id)
      );
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === personnel.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...personnel]);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Đã chọn: {selectedRows.length}
        </p>
        {selectedRows.length > 0 ? (
          <p className="text-[#53B69A] font-semibold">Bỏ chọn</p>
        ) : (
          ""
        )}
        {selectedRows.length > 0 ? (
          <Delete label="Xóa" personnel={selectedRows} />
        ) : (
          ""
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox
                  checked={selectedRows.length === personnel.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                STT
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Tài khoản
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Họ tên
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Dự án đang tham gia
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
          {/* Table Body */}
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
                  </TableRow>
                ))
              : personnel.map((row, index) => {
                  const done_count = row.projects?.reduce(
                    (acc, item) => acc + Number(item?.done_task_count),
                    0
                  );
                  const pending_count = row.projects?.reduce(
                    (acc, item) => acc + Number(item?.pending_task_count),
                    0
                  );
                  const pausing_count = row.projects?.reduce(
                    (acc, item) => acc + Number(item?.pausing_task_count),
                    0
                  );
                  const overdue_count = row.projects?.reduce(
                    (acc, item) => acc + Number(item?.overdue_task_count),
                    0
                  );
                  const sum_count = row.projects?.reduce(
                    (acc, item) => acc + Number(item?.sum_task_count),
                    0
                  );
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="w-[50px] text-center">
                        <Checkbox
                          checked={Boolean(
                            selectedRows.find((item) => item.id === row.id)
                          )}
                          onCheckedChange={(e: boolean) =>
                            handleRowSelect(e, row)
                          }
                        />
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {row.email}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {row.name}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        <ul className="flex flex-col font-semibold text-[#37AC8B] gap-2">
                          {row.projects?.map((item,index) => <li key={index}>
                            <Link className="hover:underline" to={`/projects/${item.id}`}>{item.name}</Link>
                          </li>)}
                        </ul>
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {done_count}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {pending_count}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {pausing_count}
                      </TableCell>
                      <TableCell className="border-l-1 text-center text-[13px]">
                        {overdue_count}
                      </TableCell>
                      <TableCell className="border-l-1 border-r-1 text-center text-[13px]">
                        {sum_count}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PersonnelTable;
