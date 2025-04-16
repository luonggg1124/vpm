import { TaskStatus, taskStatusString } from "@/api/interfaces/ITask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const FILTER_TASK_KEY = {
  name: "task_name",
  uuid: "task_uuid",
  status: "task_status",
};
const Filter = () => {
  const [filter, setFilter] = useState({
    name: "",
    uuid: "",
    status: "",
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const onSearch = () => {
    if (Boolean(filter.name)) {
      params.set(FILTER_TASK_KEY.name, filter.name);
    } else {
      params.delete(FILTER_TASK_KEY.name);
    }
    if (Boolean(filter.uuid)) {
      params.set(FILTER_TASK_KEY.uuid, filter.uuid);
    } else {
      params.delete(FILTER_TASK_KEY.uuid);
    }

    if (Boolean(filter.status)) {
      params.set(FILTER_TASK_KEY.status, filter.status);
    } else {
      params.delete(FILTER_TASK_KEY.status);
    }
    params.delete("page");
    navigate(`?${params.toString()}`, { replace: true });
  };
  const onClear = () => {
    Object.values(FILTER_TASK_KEY).forEach((key) => params.delete(key));
    setFilter({
      name: "",
      uuid: "",
      status: "",
    });
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div>
        <Input
          value={filter.name}
          onChange={(e: any) => setFilter({ ...filter, name: e.target.value })}
          placeholder="Tiêu đề"
          className="w-[202px]"
        />
      </div>
      <div>
        <Input
          value={filter.uuid}
          onChange={(e: any) => setFilter({ ...filter, uuid: e.target.value })}
          placeholder="Mã"
          className="w-[202px]"
        />
      </div>
      <div>
        <Select
          value={filter.status}
          onValueChange={(v) => setFilter({ ...filter, status: v })}
        >
          <SelectTrigger className="w-[202px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TaskStatus).map((status, index) => (
              <SelectItem key={index} value={status}>
                {taskStatusString(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={onSearch}
          className="flex cursor-pointer hover:bg-[#53B69A] hover:text-white items-center gap-2 "
        >
          <Search /> Tìm kiếm
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={onClear}
          className="flex cursor-pointer hover:bg-[#53B69A] hover:text-white items-center gap-2 "
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
