import { useState } from "react";
import ChangeStatus from "./components/change-status";
import Delete from "./components/delete";
import { IProject, ProjectStatus } from "@/api/interfaces/IProject";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Lock from "./components/lock";
import { Skeleton } from "@/components/ui/skeleton";
import { sortByDateAsc } from "@/utils/datetime";
import { Eye, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SendForReview from "./components/send-for-review";
import dayjs from "dayjs";


type Props = {
  project: IProject[];
  loading?: boolean;
  sortByDate?: string;
  action?: {
    lock?: boolean;
    changeStatus?: boolean;
    delete?: boolean;
    watch?: boolean;
    sendForReview?: boolean;
  };
  changeStatus?: {
    statuses?: ProjectStatus[];
    lock?: boolean;
    type?: "approve" | "change_status";
  };
};
const ProjectTable = ({
  project,
  loading = false,
  sortByDate = "started_at",
  action = {
    lock: true,
    changeStatus: true,
    delete: true,
    watch: true,
    sendForReview: false,
  },
  changeStatus = {
    statuses: Object.values(ProjectStatus),
    lock: false,
    type: "change_status",
  },
}: Props) => {
  if (Boolean(sortByDate)) {
    project = sortByDateAsc(project, sortByDate);
  }
  const [selectedRows, setSelectedRows] = useState<IProject[]>([]);

  // Handle individual row selection
  const handleRowSelect = (e: boolean, projectAdded: IProject) => {
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
    if (selectedRows.length === project.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...project]);
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
          <Delete label="Xóa" project={selectedRows} />
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
                  checked={selectedRows.length === project.length}
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
                  </TableRow>
                ))
              : project.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          checked={Boolean(
                            selectedRows.find((item) => item.id === row.id)
                          )}
                          onCheckedChange={(e: boolean) =>
                            handleRowSelect(e, row)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center  whitespace-normal  w-[167px] max-w-[167px] break-words">
                        <Link
                          to={`/projects/${row.id}`}
                          className="hover:underline cursor-pointer"
                        >
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {row.uuid}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {dayjs(row.started_at).format("D/M/YYYY")}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center whitespace-normal  w-[167px] max-w-[167px] break-words">
                        {dayjs(row.ended_at).format("D/M/YYYY")}
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 text-center">
                        {row.personnel_count}
                      </TableCell>
                      <TableCell className=" text-[12px] border-l-1">
                        <div className="flex items-center gap-2">
                          <p>Hoàn thành : {row.tasks_done_count}</p>
                          <p>Đang xử lý : {row.tasks_pending_count}</p>
                          <p>Quá hạn : {row.tasks_overdue_count}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-[12px] border-l-1 w-[167px] max-w-[167px] ">
                        <ChangeStatus
                          type={changeStatus.type}
                          statuses={changeStatus.statuses}
                          lock={changeStatus.lock}
                          project={row}
                        />
                      </TableCell>
                      <TableCell className="border-l-1 flex items-center gap-2 justify-center">
                        {" "}
                        {action.changeStatus ? (
                          <Link to={`/projects/update/${row.id}`}>
                            <Button
                              variant="outline"
                              className="cursor-pointer text-center hover:bg-gray-200 text-gray-700"
                            >
                              <Pen />
                            </Button>
                          </Link>
                        ) : (
                          ""
                        )}
                        {action.lock ? <Lock project={row} /> : ""}
                        {action.delete ? <Delete project={[row]} /> : ""}
                        {action.watch ? (
                          <Link to={`/projects/${row.id}`}>
                            <Button
                              variant="outline"
                              className="cursor-pointer size-9 text-center hover:bg-gray-200  text-gray-700"
                            >
                              <Eye />
                            </Button>
                          </Link>
                        ) : (
                          ""
                        )}
                        {action.sendForReview ? (
                          <SendForReview project={row} />
                        ) : (
                          ""
                        )}
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

export default ProjectTable;
