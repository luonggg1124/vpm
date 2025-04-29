import {
  IProject,
  projectPriorityString,
  projectStatusString,
} from "@/api/interfaces/IProject";
import dayjs from "dayjs";

type Props = {
  project: IProject;
};
const Detail = ({ project }: Props) => {
  return (
    <div>
      <h3 className="font-semibold text-lg">Chi tiết dự án</h3>
      <div className="grid grid-cols-2">
        <div className="p-4">
          <ul className="flex flex-col">
            <li>Mã dự án : {project?.uuid}</li>
            <li>Tên dự án: {project?.name}</li>
            <li>Quản trị dự án: {project?.pa?.name}</li>
            <li >Người quản lý: {project?.pm?.map((item) => item.name).join(', ')}</li>
            <li>
              Độ ưu tiên:{" "}
              {project?.priority
                ? projectPriorityString(project?.priority).value
                : ""}
            </li>
          </ul>
        </div>
        <div className="p-4">
          <ul className="flex flex-col">
            <li>
              Thời gian bắt đầu dự án:{" "}
              {dayjs(project?.started_at).format("D/M/YYYY")}
            </li>
            <li>
              Thời gian kết thúc dự án:{" "}
              {dayjs(project?.ended_at).format("D/M/YYYY")}
            </li>
            <li>
              Trạng thái chung:{" "}
              {project?.status
                ? projectStatusString(project?.status)?.value
                : ""}
            </li>
            <li>Mô tả: {project?.description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
