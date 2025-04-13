import React from "react";
import useQueryConfig from "../../../../../api/hook/useQueryConfig";
import { PATH_PROJECT } from "../../../../../constants/path/project";


const QuantityProject: React.FC = () => {
   const { data: projectsQuantityData } = useQueryConfig(
      [PATH_PROJECT.ALL.QUERY_KEY,"_project_table"],
      PATH_PROJECT.QUANTITY.ROUTE
    );
    const projectQuantity = (projectsQuantityData as any)?.data || {
      sum: 0,
      waitings:0,
      refuse: 0
    }
  return (
    <div className="flex items-center gap-4 my-2 text-sm">
      <p>Tổng : {projectQuantity.sum}</p>
      <p>Chờ phê duyệt : {projectQuantity.waitings}</p>
      <p>Từ chối : {projectQuantity.refuse}</p>
    </div>
  );
};
export default QuantityProject;
