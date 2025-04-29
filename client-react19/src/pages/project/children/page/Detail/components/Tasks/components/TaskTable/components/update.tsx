import { ITask } from "@/api/interfaces/ITask";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Pen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  task: ITask;
};
const UpdateAction = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="size-9" asChild>
        <Button
          onClick={() =>
            navigate(`/projects/${task?.project?.id}/task/update/${task?.id}`)
          }
          variant="outline"
          className="cursor-pointer text-center hover:bg-gray-200 text-gray-700"
        >
          <Pen />
        </Button>
      </AlertDialogTrigger>
      {/* <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đổi trạng thái chung</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Tiêu đề : {task?.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 ">
            <h3 className="text-gray-500 font-semibold">
              Trạng thái thực hiện
            </h3>
            <RadioGroup defaultValue="comfortable">
              {Object.values(TaskStatus).map((item, index) => {
                const value = taskStatusString(item);
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem className="cursor-pointer" value={item} />
                    <Label>{value}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Hủy</AlertDialogCancel>
          <Button type="button" className="hover:bg-[#53B69A] cursor-pointer">
            Gửi
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent> */}
    </AlertDialog>
  );
};
export default UpdateAction;
