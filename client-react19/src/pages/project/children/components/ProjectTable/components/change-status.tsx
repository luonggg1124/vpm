import { CalendarIcon } from "lucide-react";
import {
  IProject,
  ProjectStatus,
  projectStatusString,
} from "@/api/interfaces/IProject";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/datetime";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useProject from "@/api/hook/useProject";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";

type Props = {
  project: IProject;
  statuses?: ProjectStatus[];
  lock?: boolean;
  type?: "approve" | "change_status";
};
const ChangeStatus = ({
  project,
  statuses = Object.values(ProjectStatus),
  lock = false,
  type = "change_status",
}: Props) => {
  const [projectData, setProjectData] = useState({
    pa_id: project.pa?.id,
    status: project.status,
    ended_at: project.ended_at,
    description: "",
  });
  const statusArray: ProjectStatus[] = Object.values(ProjectStatus).filter(
    (item) => statuses?.includes(item)
  );

  const users =
    project?.pm?.map((item) => {
      return {
        value: String(item.id),
        label: String(item.name),
      };
    }) ?? [];
  const [open, setOpen] = useState<boolean>(false);
  const { loading, updateStatus } = useProject();
  const submit = async (type: "ok"| "refuse" = "ok") => {
    setOpen(true);
    await updateStatus(project.id, type === 'ok' ? {...projectData,status: ProjectStatus.Developing} : {...projectData,status: ProjectStatus.Refuse});
    setOpen(false);
  };
  const { value: status, color } = projectStatusString(project.status);

  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {lock === true ? (
        <p
          className={
            color +
            " font-semibold text-center border p-2 rounded-lg w-full cursor-pointer"
          }
        >
          {status}
        </p>
      ) : (
        <AlertDialogTrigger className="size-9" asChild>
          <p
            className={
              color +
              " font-semibold text-center border p-2 rounded-lg w-full cursor-pointer"
            }
          >
            {status}
          </p>
        </AlertDialogTrigger>
      )}

      {type === "approve" ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm">Phê duyệt</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Phê duyệt dự án {project?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Hủy
            </AlertDialogCancel>
           {
            project.status === ProjectStatus.Refuse ? "":  <Button
            type="button"
            onClick={() =>submit('refuse')}
            className="hover:bg-[#c97070] bg-[#c97070] cursor-pointer"
          >
            Từ chối
          </Button>
           }
            <Button
              type="button"
              onClick={() =>submit()}
              className="hover:bg-[#53B69A] bg-[#53B69A] cursor-pointer"
            >
              Duyệt
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đổi trạng thái chung</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Dự án : {project?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-500 font-semibold">Quản lí dự án</h3>
            <MultiSelectCombobox
              disabled
              onSelect={() => console.log(1)}
              value={users.map((item) => String(item.value))}
              options={users}
            />
            <div className="flex flex-col gap-4 ">
              <h3 className="text-gray-500 font-semibold">
                Trạng thái thực hiện
              </h3>
              <RadioGroup defaultValue="comfortable">
                {statusArray.map((item, index) => {
                  const { value } = projectStatusString(item);
                  return (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        className="cursor-pointer"
                        onClick={() =>
                          setProjectData({ ...projectData, status: item })
                        }
                        checked={projectData.status === item}
                        value={item}
                      />
                      <Label>{value}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2 ">
              <h3 className="text-gray-500 font-semibold">
                Thời gian kết thúc dự án
              </h3>
              <div className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-full justify-between text-left font-normal",
                        !project.ended_at && "text-muted-foreground"
                      )}
                    >
                      {project.ended_at ? (
                        formatDate(new Date(project.ended_at).getTime())
                      ) : (
                        <span>Ngày kết thúc</span>
                      )}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(projectData.ended_at) as Date}
                      onSelect={(e) =>
                        setProjectData({
                          ...projectData,
                          ended_at: e
                            ? formatDate(new Date(e).getTime())
                            : projectData.ended_at,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2 ">
                <h3 className="text-gray-500 font-semibold">Ghi chú</h3>
                <Textarea
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                setProjectData({
                  pa_id: project.pa?.id,
                  status: project.status,
                  ended_at: project.ended_at,
                  description: "",
                })
              }
              className="cursor-pointer"
            >
              Hủy
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={() =>submit()}
              className="hover:bg-[#53B69A] cursor-pointer"
            >
              Cập nhật
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
export default ChangeStatus;
