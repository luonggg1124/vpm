
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const FILTER_DOCS_KEY = {
  name: "task_name",
  uuid: "task_uuid",
  status: "task_status",
  designated_personnel: "designated_personnel",
  designating_personnel: "designating_personnel",
};
const Filter = () => {
  const [filter, setFilter] = useState({
    name: "",
    uuid: "",

  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const onSearch = () => {
    if (Boolean(filter.name)) {
      params.set(FILTER_DOCS_KEY.name, filter.name);
    } else {
      params.delete(FILTER_DOCS_KEY.name);
    }
    if (Boolean(filter.uuid)) {
      params.set(FILTER_DOCS_KEY.uuid, filter.uuid);
    } else {
      params.delete(FILTER_DOCS_KEY.uuid);
    }
    params.delete("page");
    navigate(`?${params.toString()}`, { replace: true });
  };
  const onClear = () => {
    Object.values(FILTER_DOCS_KEY).forEach((key) => params.delete(key));
    setFilter({
      name: "",
      uuid: "",
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
