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
      <Detail project={project} />
      <PersonnelTable />
    </div>
  );
};

export default Project;
