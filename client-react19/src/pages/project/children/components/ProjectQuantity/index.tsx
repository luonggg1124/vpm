import React from "react";
import useQueryConfig from "../../../../../api/hook/useQueryConfig";
import { PATH_PROJECT } from "../../../../../constants/path/project";

type Props = {
  display?: {
    sum?: boolean;
    waiting?: boolean;
    refuse?: boolean;
    developing?: boolean;
    pausing?: boolean;
    done?: boolean;
    failed?: boolean;
    close?: boolean;
  };
};
const QuantityProject = ({
  display = {
    sum: true,
    waiting: true,
    refuse: true,
    developing: true,
    pausing: true,
    done: true,
    failed: true,
    close: true,
  },
}: Props) => {
  const { data: projectsQuantityData } = useQueryConfig(
    [PATH_PROJECT.ALL.QUERY_KEY, "_project_table"],
    PATH_PROJECT.QUANTITY.ROUTE
  );
  const projectQuantity = (projectsQuantityData as any)?.data || {
    sum: 0,
    waitings: 0,
    refuse: 0,
    pausing: 0,
    done: 0,
    failed: 0,
    close: 0,
    developing: 0,
  };
  return (
    <div className="flex items-center gap-4 my-2 text-sm">
      {display.sum ? <p>Tổng : {projectQuantity.sum}</p> : ""}

      {display.waiting ? <p>Chờ phê duyệt : {projectQuantity.waitings}</p> : ""}
      {display.developing ? (
        <p>Đang tiến hành : {projectQuantity.developing}</p>
      ) : (
        ""
      )}
      {display.pausing ? <p>Tạm ngừng : {projectQuantity.pausing}</p> : ""}
      {display.refuse ? <p>Từ chối : {projectQuantity.refuse}</p> : ""}
      {display.done ? <p>Hoàn thành : {projectQuantity.done}</p> : ""}
      {display.failed ? <p>Thất bại : {projectQuantity.failed}</p> : ""}
      {display.close ? <p>Đóng : {projectQuantity.close}</p> : ""}
    </div>
  );
};
export default QuantityProject;
