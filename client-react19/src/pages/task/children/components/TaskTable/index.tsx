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
import Delete from "./components/delete";
import { ITask } from "@/api/interfaces/ITask";


type Props = {
  tasks: ITask[];
  loading?: boolean;
  sortByDate?: string;
  action?: {
    lock?: boolean;
    changeStatus?: boolean;
    delete?: boolean;
    watch?: boolean;
    sendForReview?: boolean;
  };
};
const TaskTable = ({
  tasks,
  loading = false,
  sortByDate = "started_at",
  action = {
    lock: true,
    changeStatus: true,
    delete: true,
    watch: true,
    sendForReview: false,
  },
}: Props) => {
  if (Boolean(sortByDate)) {
    tasks = sortByDateAsc(tasks, sortByDate);
  }
  const [selectedRows, setSelectedRows] = useState<ITask[]>([]);

  // Handle individual row selection
  const handleRowSelect = (e: boolean, projectAdded: ITask) => {
    if (e) {
      const alreadyHave = selectedRows.find(
        (item) => item.id === projectAdded.id
      );
      if (!Boolean(alreadyHave)) {
        setSelectedRows([...selectedRows, projectAdded]);
      }
    } else {
      setSelectedRows(selectedRows.filter((pro) => pro.id !== projectAdded.id));
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === tasks.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...tasks]);
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
          <Delete label="Xóa" task={selectedRows} />
        ) : (
          ""
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] border-l-1">
                <Checkbox
                  checked={selectedRows.length === tasks.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                STT
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Dự án
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Mã dự án
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Ngày bắt đầu
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Ngày kết thúc
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Dự án
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Số lượng tham gia
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Thống kê
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Trạng thái
              </TableHead>
              <TableHead className="border-l-1 text-center text-[13px]">
                Hành động
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
                    <TableCell>
                      <Skeleton className="h-7 " />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 " />
                    </TableCell>
                  </TableRow>
                ))
              : tasks.map((row, index) => {
                  return (
                    <div></div>
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;
