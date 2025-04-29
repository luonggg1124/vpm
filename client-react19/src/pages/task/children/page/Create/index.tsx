import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Spinner from "@/components/page/spriner";
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatus, taskStatusString } from "@/api/interfaces/ITask";
import useTask from "@/api/hook/useTask";
import { PATH_PROJECT } from "@/constants/path/project";
import { IProject } from "@/api/interfaces/IProject";
import NotFound from "@/pages/notfound";

const CreateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: projectData, isLoading: loadingProject } = useQueryConfig(
    [PATH_PROJECT.QUERY_KEY, PATH_PROJECT.QUERY_KEY + id + `create-task`],
    PATH_PROJECT.FIND.ROUTE + `/${id}`
  );
  const handleBack = () => {
    navigate(-1);
  };
  const { data: usersData } = useQueryConfig(
    [PATH_USER.ALL.QUERY_KEY + `?${PATH_USER.ALL.Filter([1])}-create`],
    PATH_USER.ALL.ROUTE + `?${PATH_USER.ALL.Filter([1])}`
  );
  const { loading, createTask } = useTask();
  const users: IUser[] = (usersData as any)?.data?.data || [];
  const form = useForm({
    defaultValues: {
      name: "",
      uuid: "",
      feature: "",
      priority: "",
      project_id: id,
      designated_personnel_id: "",
      status: "",
      ended_at: formatDate(new Date().getTime()),
      description: "",
    },
  });

  const options = users.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));
  const onSubmit = async (value: any) => {
    if (new Date(value?.started_at) >= new Date(value?.ended_at)) {
      form.setError("ended_at", {
        message: "Ngày kết thúc dự án phải lớn hơn ngày bắt đầu",
      });
      return;
    }
    const error = await createTask(value);

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

      if (error?.errors?.ended_at) {
        form.setError("ended_at", {
          message: error?.errors?.ended_at,
        });
      }

      if (error?.errors?.priority) {
        form.setError("priority", {
          message: error?.errors?.priority,
        });
      }
    }
  };
  const project: IProject = (projectData as any)?.data?.data || null;
  if (project) {
    if (project?.is_lock) {
      return <div>Dự án đang bị khóa</div>;
    }
  } else {
    return <NotFound />;
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8 p-4"
      >
        <div className=" col-span-2 flex items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          className="text-white bg-[#53B69A] hover:bg-[#53B69A] cursor-pointer"
          size="icon"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-center flex-1 font-semibold text-2xl">
          Thêm mới nhiệm vụ
        </h3>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Label>Tiêu đề</Label>
          <Input
            {...form.register("name", {
              required: "Hãy nhập tiêu đề",
            })}
            placeholder="Tiêu đề"
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.name
              ? form.formState.errors.name.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Mã nhiệm vụ</Label>
          <Input
            {...form.register("uuid", {
              required: "Hãy nhập mã nhiệm vụ",
            })}
            placeholder="Mã nhiệm vụ"
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.uuid
              ? form.formState.errors.uuid.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tên tính năng </Label>
          <Input
            {...form.register("feature", {
              required: "Hãy nhập tên tính năng",
            })}
            placeholder="Tên tính năng"
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.feature
              ? form.formState.errors.feature.message
              : ""}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Label>Nội dung</Label>
          <Textarea
            {...form.register("description", {
              required: "Hãy mô tả về nhiệm vụ",
            })}
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.description
              ? form.formState.errors.description.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Độ ưu tiên</Label>
          <Controller
            control={form.control}
            name="priority"
            rules={{
              required: "Hãy chọn độ ưu tiên",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ưu tiên</SelectLabel>
                    <SelectItem value="HIGH">Cao</SelectItem>
                    <SelectItem value="MEDIUM">Trung bình</SelectItem>
                    <SelectItem value="LOW">Thấp</SelectItem>
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
          <Label>Chỉ định cho</Label>
          <Controller
            control={form.control}
            name="designated_personnel_id"
            rules={{
              required: "Hãy chỉ định cho một người",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chỉ định cho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ưu tiên</SelectLabel>
                    {options.map((item, index) => (
                      <SelectItem value={item.value} key={index}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.designated_personnel_id
              ? form.formState.errors.designated_personnel_id.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Label>Thời gian kết thúc</Label>
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
                  <span>Ngày bắt đầu</span>
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
              ? "Hãy chọn ngày bắt đầu cho dự án"
              : form.formState.errors?.name
              ? form.formState.errors?.ended_at?.message
              : ""}
          </p>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Label>Trạng thái</Label>
          <Controller
            control={form.control}
            name="status"
            rules={{
              required: "Hãy chọn trạng thái",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    {Object.values(TaskStatus).map((item) => (
                      <SelectItem value={item}>
                        {taskStatusString(item)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <p className="font-thin text-red-600">
            {form.formState.errors.status
              ? form.formState.errors.status.message
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
          {loading.createTask ? (
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
              Tạo
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default CreateTask;
