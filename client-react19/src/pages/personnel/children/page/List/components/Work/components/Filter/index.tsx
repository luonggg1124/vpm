
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const FILTER_PERSONNEL_KEY = {
  email: "personnel_email",
  name: "personnel_name",
  project_name: "project_name",
};
const Filter = () => {
  const [filter, setFilter] = useState({
    email: "",
    name: "",
    project_name: "",
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const onSearch = () => {
    if (Boolean(filter.name)) {
      params.set(FILTER_PERSONNEL_KEY.name, filter.name);
    } else {
      params.delete(FILTER_PERSONNEL_KEY.name);
    }
    if (Boolean(filter.email)) {
      params.set(FILTER_PERSONNEL_KEY.email, filter.email);
    } else {
      params.delete(FILTER_PERSONNEL_KEY.email);
    }

    if (Boolean(filter.project_name)) {
      params.set(FILTER_PERSONNEL_KEY.project_name, filter.project_name);
    } else {
      params.delete(FILTER_PERSONNEL_KEY.project_name);
    }
    params.delete("page");
    navigate(`?${params.toString()}`, { replace: true });
  };
  const onClear = () => {
    Object.values(FILTER_PERSONNEL_KEY).forEach((key) => params.delete(key));
    setFilter({
        email: "",
        name: "",
        project_name: "",
    });
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div>
        <Input
          value={filter.name}
          onChange={(e: any) => setFilter({ ...filter, name: e.target.value })}
          placeholder="Họ và tên"
          className="w-[202px]"
        />
      </div>
      <div>
        <Input
          value={filter.email}
          onChange={(e: any) => setFilter({ ...filter, email: e.target.value })}
          placeholder="Tài khoản"
          className="w-[202px]"
        />
      </div>
      <div>
        <Input
          value={filter.project_name}
          onChange={(e: any) => setFilter({ ...filter, project_name: e.target.value })}
          placeholder="Tên dự án"
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
