import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../components/ui/popover";
import { Button } from "../../../../../components/ui/button";
import { cn } from "../../../../../lib/utils";
import { CalendarIcon, Search, X } from "lucide-react";
import { Calendar } from "../../../../../components/ui/calendar";
import { formatDate } from "../../../../../utils/datetime";
import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { useNavigate } from "react-router-dom";
import {
  ProjectStatus,
  projectStatusString,
} from "../../../../../api/interfaces/IProject";
const params = new URLSearchParams(window.location.search);
export const FILTER_PROJECT_KEY = {
  name: "project_name",
  uuid: "project_uuid",
  startDate: "project_startDate",
  endDate: "project_endDate",
  status: "project_status",
};

export const getFilterValues = () => {
  const name = params.get(FILTER_PROJECT_KEY.name) || "";
  const uuid = params.get(FILTER_PROJECT_KEY.uuid) || "";
  const startDate = params.get(FILTER_PROJECT_KEY.startDate) || "";
  const endDate = params.get(FILTER_PROJECT_KEY.endDate) || "";
  const status = params.get(FILTER_PROJECT_KEY.status) || "";
  return {
    name,
    uuid,
    startDate,
    endDate,
    status,
  };
};


export type FilterProps = {
  name: string;
  uuid: string;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus | string;
};
const Filter = ({type = 'initiation'}:{type:'initiation'|'project'}) => {
  let statuses = [
    ProjectStatus.Close,
    ProjectStatus.Developing,
    ProjectStatus.Pausing,
  ];
  if(type === 'project'){
    statuses =[
      ProjectStatus.Failed,
      ProjectStatus.Refuse,
      ProjectStatus.Waiting,
      ProjectStatus.Done,
    ]; 
  }
  const navigate = useNavigate();
  const values = getFilterValues();

  const [filter, setFilter] = React.useState<FilterProps>({
    name: values.name,
    uuid: values.uuid,
    startDate: values.startDate ? new Date(values.startDate) : undefined,
    endDate: values.endDate ? new Date(values.endDate) : undefined,
    status: values.status,
  });

  const onSearch = () => {
    if (Boolean(filter.name)) {
      params.set(FILTER_PROJECT_KEY.name, filter.name);
    } else {
      params.delete(FILTER_PROJECT_KEY.name);
    }
    if (Boolean(filter.uuid)) {
      params.set(FILTER_PROJECT_KEY.uuid, filter.uuid);
    } else {
      params.delete(FILTER_PROJECT_KEY.uuid);
    }
    if (Boolean(filter.startDate)) {
      params.set(
        FILTER_PROJECT_KEY.startDate,
        filter.startDate ? formatDate(new Date(filter.startDate).getTime()) : ""
      );
    } else {
      params.delete(FILTER_PROJECT_KEY.startDate);
    }
    if (Boolean(filter.endDate)) {
      params.set(
        FILTER_PROJECT_KEY.endDate,
        filter.endDate ? formatDate(new Date(filter.endDate).getTime()) : ""
      );
    } else {
      params.delete(FILTER_PROJECT_KEY.endDate);
    }
    if (Boolean(filter.status)) {
      params.set(
        FILTER_PROJECT_KEY.status,
        filter.status
      );
    } else {
      params.delete(FILTER_PROJECT_KEY.status);
    }
    params.delete('page');
    navigate(`?${params.toString()}`, { replace: true });
  };
  const onClear = () => {
    Object.values(FILTER_PROJECT_KEY).forEach((key) => params.delete(key));
    setFilter({
      name: "",
      uuid: "",
      startDate: undefined,
      endDate: undefined,
      status: "",
    });
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " flex w-[202px] justify-between  text-left font-normal",
                !filter.startDate && "text-muted-foreground"
              )}
            >
              {filter.startDate ? (
                formatDate(new Date(filter.startDate).getTime())
              ) : (
                <span>Ngày bắt đầu</span>
              )}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filter.startDate}
              onSelect={(v) => setFilter({ ...filter, startDate: v })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "flex w-[202px] justify-between text-left font-normal",
                !filter.endDate && "text-muted-foreground"
              )}
            >
              {filter.endDate ? (
                formatDate(new Date(filter.endDate).getTime())
              ) : (
                <span>Ngày kết thúc</span>
              )}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filter.endDate}
              onSelect={(v) =>
                setFilter({
                  ...filter,
                  endDate: v,
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Input
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          placeholder="Tên dự án"
          className="w-[202px]"
        />
      </div>
      <div>
        <Input
          value={filter.uuid}
          onChange={(e) => setFilter({ ...filter, uuid: e.target.value })}
          placeholder="Mã dự án"
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
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status}>
                {projectStatusString(status).value}
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
