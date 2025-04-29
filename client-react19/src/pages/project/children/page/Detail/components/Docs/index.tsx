import { Button } from "@/components/ui/button";
import Filter from "./components/Filter";
import DocTable from "./components/DocTable";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

const Docs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="m-4 flex flex-col gap-4">
      <Filter />
      <div className="flex justify-end px-4">
        <Button
          onClick={() => navigate(`/projects/${id}/task/create`)}
          variant="outline"
          type="button"
          className="flex cursor-pointer bg-[#53B69A] hover:bg-[#53B69A] text-white hover:text-white items-center gap-2 "
        >
          <Plus /> Thêm mới
        </Button>
      </div>
      <DocTable />
    </div>
  );
};
export default Docs;
