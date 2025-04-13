import { IProject } from "@/api/interfaces/IProject";
import Detail from "./components/Detail";
import PersonnelTable from "./components/PersonnelTable";

type Props = {
  project: IProject;
  loading: boolean;
};
const Project = ({ project }: Props) => {
  return (
    <div>
      {/* quantity */}
      <div className="flex items-center gap-2 my-2 text-sm">
        <p>Tổng : 1</p>
        <p>Chờ phê duyệt : 2</p>
        <p>Từ chối : 3</p>
        <p>Tổng : 1</p>
        <p>Chờ phê duyệt : 2</p>
        <p>Từ chối : 3</p>
      </div>

      <Detail project={project} />
      <PersonnelTable />
    </div>
  );
};

export default Project;
