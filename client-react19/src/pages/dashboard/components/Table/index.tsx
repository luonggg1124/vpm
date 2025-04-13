import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const tableData = [
  {
    id: 1,
    name: "Nguyen Thi A",
    account: "Anguyen",
    inProgress: 2,
    completed: 1,
    onTime: 14,
  },
  {
    id: 2,
    name: "Tran Van B",
    account: "Btranvan",
    inProgress: 1,
    completed: 2,
    onTime: 14,
  },
  {
    id: 3,
    name: "Nguyen Thi C",
    account: "Cnguyenthi",
    inProgress: 2,
    completed: 0,
    onTime: 14,
  },
  {
    id: 4,
    name: "Nguyen Van D",
    account: "Anguyenvan",
    inProgress: 0,
    completed: 14,
    onTime: 14,
  },
  {
    id: 5,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 6,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 7,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 8,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 9,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 10,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 11,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 12,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
  {
    id: 11,
    name: "Nguyen Thi E",
    account: "Enguyen",
    inProgress: 2,
    completed: 0,
    onTime: 0,
  },
];
const StatisticTable: React.FC = () => {
  return (
    <div className="">
      <Table className="h-[470px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>In Progress</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>On Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.account}</TableCell>
              <TableCell
                className={
                  row.inProgress === 0
                    ? "bg-pink-200 text-center"
                    : "text-center"
                }
              >
                {row.inProgress}
              </TableCell>
              <TableCell
                className={
                  row.completed === 0
                    ? "bg-pink-200 text-center"
                    : "text-center"
                }
              >
                {row.completed}
              </TableCell>
              <TableCell
                className={
                  row.onTime === 0 ? "bg-pink-200 text-center" : "text-center"
                }
              >
                {row.onTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default StatisticTable;
