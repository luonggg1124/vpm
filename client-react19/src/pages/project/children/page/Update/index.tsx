import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Controller, FormProvider, useForm } from "react-hook-form";

import useQueryConfig from "@/api/hook/useQueryConfig";
import { PATH_USER } from "@/constants/path/user";
import { IUser } from "@/api/interfaces/IUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils/datetime";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import useProject from "@/api/hook/useProject";
import Spinner from "@/components/page/spriner";
import {
  IProject,
  ProjectPriority,
  ProjectStatus,
  projectStatusString,
} from "@/api/interfaces/IProject";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_PROJECT } from "@/constants/path/project";
import NotFound from "@/pages/notfound";

type FormValues = {
  name: string;
  uuid: string;
  pm: string[];
  pa_id: string;
  priority: string;
  status: ProjectStatus;
  started_at: string;
  ended_at: string;
  personnel: string[];
  description: string;
};
const UpdateProject = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const {
    data: projectData,
    isLoading: loadingProject,
    isSuccess: successProject,
  } = useQueryConfig(
    [PATH_PROJECT.QUERY_KEY,PATH_PROJECT.FIND.QUERY_KEY + id+ "?include=pm,pa,personnel-update"] ,
    PATH_PROJECT.FIND.ROUTE + `/${id}?include=pm,pa,personnel`
  );
  const project: IProject = (projectData as any)?.data?.data;
  
  const { data: usersData } = useQueryConfig(
    [
      PATH_USER.ALL.QUERY_KEY +
        `?${PATH_USER.ALL.Filter([
          project?.pa?.id || 1,
          ...(project?.pm?.map((item) => item.id) ?? []),
        ])}-update`,
    ],
    PATH_USER.ALL.ROUTE +
      `?${PATH_USER.ALL.Filter([
        project?.pa?.id || 1,
        ...(project?.pm?.map((item) => item.id) ?? []),
      ])}`
  );
  const { loading, updateProject } = useProject();
  const users: IUser[] = (usersData as any)?.data?.data || [];

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      uuid: "",
      pm: [] as string[],
      pa_id: "",
      priority: "",
      status: ProjectStatus.Waiting,
      started_at: formatDate(new Date().getTime()),
      ended_at: formatDate(new Date().getTime()),
      personnel: [] as string[],
      description: "",
    },
  });

  const [personnel, setPersonnel] = useState<string[]>([]);
  const [pm, setPm] = useState<string[]>([]);
  const options = users.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));
  const selectPersonnel = (value: string[]) => {
    setPersonnel(value);
    form.setValue("personnel", value);
  };
  const selectPm = (value: string[]) => {
    setPm(value);
    form.setValue("pm", value);
  };
  useEffect(() => {
    if (project && successProject) {
      setTimeout(() => {
        form.reset({
          name: project?.name,
          uuid: project?.uuid,
          pm: project?.pm?.map((item) => String(item.id)),
          pa_id: project?.pa?.id ? String(project?.pa?.id) : "",
          priority: project.priority,
          status: project?.status,
          started_at: project?.started_at,
          ended_at: project?.ended_at,
          personnel: project?.personnel.map((item) => String(item.id)),
          description: project?.description,
        });
        setPm(project?.pm?.map((item) => String(item.id)) as string[]);
        setPersonnel(project?.personnel.map((item) => String(item.id)));
      }, 1000);
    }
  }, [project, successProject]);
  const onSubmit = async (value: any) => {
    if (new Date(value?.started_at) >= new Date(value?.ended_at)) {
      form.setError("ended_at", {
        message: "Ngày kết thúc dự án phải lớn hơn ngày bắt đầu",
      });
      return;
    }
    const error = await updateProject(id, value);

    if (error?.errors) {
      if (error?.errors?.name) {
        form.setError("name", {
          message: error?.errors?.name,
        });
      }
      if (error?.errors?.uuid) {
        form.setError("uuid", {
          message: error?.errors?.uuid,
        });
      }
      if (error?.errors?.started_at) {
        form.setError("started_at", {
          message: error?.errors?.started_at,
        });
      }
      if (error?.errors?.ended_at) {
        form.setError("ended_at", {
          message: error?.errors?.ended_at,
        });
      }
      if (error?.errors?.started_at) {
        form.setError("started_at", {
          message: error?.errors?.started_at,
        });
      }
     
      if (error?.errors?.pa_id) {
        form.setError("pa_id", {
          message: error?.errors?.pa_id,
        });
      }
      if (error?.errors?.priority) {
        form.setError("priority", {
          message: error?.errors?.priority,
        });
      }
      if (error?.errors?.personnel) {
        if (Array.isArray(error?.errors?.personnel)) {
          form.setError("personnel", { message: error?.errors?.personnel[0] });
        } else {
          form.setError("personnel", {
            message: error?.errors?.personnel,
          });
        }
      }
    }
  };

  if (!loadingProject && !project) {
    return <NotFound />;
  }
  if (loadingProject) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8 p-4"
      >
        <h3 className="text-center col-span-2 font-semibold text-2xl">
          Cập nhật {project?.name}
        </h3>
        <div className="flex flex-col gap-2">
          <Label>Tên dự án</Label>
          <Input
            {...form.register("name", {
              required: "Hãy nhập tên dự án",
            })}
            placeholder="Tên dự án"
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.name
              ? form.formState.errors.name.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Mã dự án</Label>
          <Input
            {...form.register("uuid", {
              required: "Hãy nhập mã dự án",
            })}
            placeholder="Mã dự án"
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.uuid
              ? form.formState.errors.uuid.message
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Người quản lí</Label>
            <MultiSelectCombobox
              value={pm}
              onSelect={(v) => selectPm(v)}
              options={options}
              placeholder="Chọn thành viên"
            />
            <p className="font-thin text-red-600">
              {form.watch("pm")?.length === 0
                ? "Hãy chọn quản lí nhân sự cho dự án"
                : ""}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Quản trị dự án</Label>
            <Controller
              control={form.control}
              name="pa_id"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Chọn người quản trị--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Người quản trị dự án</SelectLabel>
                      {options.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="font-thin text-red-600">
              {form.formState.errors.pa_id
                ? form.formState.errors.pa_id.message
                : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Độ ưu tiên</Label>
          <Controller
            control={form.control}
            name="priority"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ưu tiên</SelectLabel>
                    <SelectItem value={ProjectPriority.High}>Cao</SelectItem>
                    <SelectItem value={ProjectPriority.Medium}>
                      Trung bình
                    </SelectItem>
                    <SelectItem value={ProjectPriority.Low}>Thấp</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <p className="font-thin text-red-600">
            {form.formState.errors.priority
              ? form.formState.errors.priority.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " flex w-full justify-between  text-left font-normal",
                  !form.watch("started_at") && "text-muted-foreground"
                )}
              >
                {form.watch("started_at") ? (
                  formatDate(new Date(form.watch("started_at")).getTime())
                ) : (
                  <span>Ngày bắt đầu</span>
                )}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  form.watch("started_at")
                    ? new Date(form.watch("started_at"))
                    : undefined
                }
                onSelect={(v) => {
                  form.setValue(
                    "started_at",
                    v?.getTime() ? formatDate(v?.getTime()) : ""
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="font-thin text-red-600">
            {!form.watch("started_at")
              ? "Hãy chọn ngày bắt đầu cho dự án"
              : form.formState.errors?.name
              ? form.formState.errors?.started_at?.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " flex w-full justify-between  text-left font-normal",
                  !form.watch("ended_at") && "text-muted-foreground"
                )}
              >
                {form.watch("ended_at") ? (
                  formatDate(new Date(form.watch("ended_at")).getTime())
                ) : (
                  <span>Ngày kết thúc</span>
                )}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  form.watch("ended_at")
                    ? new Date(form.watch("ended_at"))
                    : undefined
                }
                onSelect={(v) => {
                  form.setValue(
                    "ended_at",
                    v?.getTime() ? formatDate(v?.getTime()) : ""
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="font-thin text-red-600">
            {!form.watch("ended_at")
              ? "Hãy chọn ngày kết thúc cho dự án"
              : form.formState.errors?.ended_at
              ? form.formState.errors?.ended_at?.message
              : ""}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Label>Thành viên tham gia</Label>
          <MultiSelectCombobox
            value={personnel}
            onSelect={(v) => selectPersonnel(v)}
            options={options}
            placeholder="Chọn thành viên"
          />
          <p className="font-thin text-red-600">
            {form.watch("personnel").length === 0
              ? "Hãy chọn nhân sự cho dự án"
              : ""}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Label>Mô tả</Label>
          <Textarea
            value={form.watch("description")}
            {...form.register("description")}
          />
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Label>Trạng thái</Label>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    {Object.values(ProjectStatus).map((item) => (
                      <SelectItem value={item}>
                        {projectStatusString(item).value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <p className="font-thin text-red-600">
            {form.formState.errors.priority
              ? form.formState.errors.priority.message
              : ""}
          </p>
        </div>
        <div className="flex col-span-2 justify-end gap-4 items-center">
          <Button
            type="button"
            onClick={() => handleBack()}
            className="border-[#53B69A] text-[#53B69A] bg-white border  hover:border-[#53B69A] hover:text-[#53B69A] hover:bg-white cursor-pointer"
          >
            Hủy bỏ
          </Button>
          {loading.updateProject ? (
            <Button
              type="button"
              className="bg-[#53B69A] text-white  hover:bg-[#53B69A] hover:text-white cursor-pointer"
            >
              <Spinner />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#53B69A] text-white  hover:bg-[#53B69A] hover:text-white cursor-pointer"
            >
              Cập nhật
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default UpdateProject;
