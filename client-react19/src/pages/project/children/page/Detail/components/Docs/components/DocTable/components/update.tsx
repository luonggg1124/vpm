import { IDocs } from "@/api/interfaces/IDocs";
import {  TaskStatus, taskStatusString } from "@/api/interfaces/ITask";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Pen } from "lucide-react";
import { useState } from "react";

type Props = {
  docs: IDocs;
};
const UpdateAction = ({ docs }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="size-9" asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-center hover:bg-gray-200 text-gray-700"
        >
          <Pen />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đổi trạng thái chung</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Tiêu đề : {docs?.title}
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
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UpdateAction;
