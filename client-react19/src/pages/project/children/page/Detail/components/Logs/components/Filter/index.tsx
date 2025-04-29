import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/datetime";
import { CalendarIcon, Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LOG_FILTER_KEY = {
  userName: "user_name",
  time: "time",
};
const Filter = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState({
    userName: "",
    time: "",
  });
  const onSearch = () => {
    if (Boolean(filter.userName)) {
      params.set(LOG_FILTER_KEY.userName, filter.userName);
    } else {
      params.delete(LOG_FILTER_KEY.userName);
    }
    if (Boolean(filter.time)) {
      params.set(LOG_FILTER_KEY.time, filter.time);
    } else {
      params.delete(LOG_FILTER_KEY.time);
    }
    params.delete('page');
    navigate(`?${params.toString()}`, { replace: true });
  };
  const onClear = () => {
    Object.values(LOG_FILTER_KEY).forEach((key) => params.delete(key));
    setFilter({
      userName: "",
      time: "",
    });
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 my-4">
      <div>
        <Input
          value={filter.userName}
          onChange={(e: any) =>
            setFilter({ ...filter, userName: e.target.value })
          }
          placeholder="Nguời cập nhật"
          className="w-[202px]"
        />
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " flex w-[202px] justify-between  text-left font-normal",
                !filter.time && "text-muted-foreground"
              )}
            >
              {filter.time ? (
                formatDate(new Date(filter.time).getTime())
              ) : (
                <span>Ngày bắt đầu</span>
              )}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(filter.time)}
              onSelect={(v) =>
                setFilter({
                  ...filter,
                  time: v ? formatDate(v?.getTime()) : "",
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
