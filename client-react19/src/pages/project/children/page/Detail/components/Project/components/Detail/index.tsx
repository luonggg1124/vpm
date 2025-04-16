import {
  IProject,
  projectPriorityString,
  projectStatusString,
} from "@/api/interfaces/IProject";

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
            <li>Người quản lý: {project?.pm?.name}</li>
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
            <li>Thời gian bắt đầu dự án: {project?.started_at}</li>
            <li>Thời gian kết thúc dự án: {project?.ended_at}</li>
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
