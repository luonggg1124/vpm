import { Trash2, TriangleAlert } from "lucide-react";
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
import useProject from "@/api/hook/useProject";
import Spinner from "@/components/page/spriner";
import { useState } from "react";
import { ITask } from "@/api/interfaces/ITask";

type Props = {
  task: ITask[];
  label?:string;
};
const Delete = ({ task,label = "" }: Props) => {
  const [open,setOpen] = useState<boolean>(false);
  const {loading,deleteProjects} = useProject();
  const handleDelete = async (ids:Array<ITask>) => {
    setOpen(false);
  }
 
  return (
    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogTrigger className="size-9"  asChild>
        <Button
          variant="outline"
          className={`cursor-pointer text-center hover:bg-gray-200${label ? " text-red-500 w-16" : " text-gray-700"} `}
        >
          <Trash2 /> {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa dự án</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#FEE4E2]">
                <div className="text-white p-2 bg-[#F04438] rounded-full">
                  <TriangleAlert />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold text-[#101828]">
                  {" "}
                  Bạn có chắc chắn muốn xóa {task.length} dự án đã chọn?
                </p>
                <p>
                  <span className="font-semibold text-[#101828]">Lưu ý</span>:
                  Xóa xong không thể khôi phục lại được
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer border-[#F04438] hover:text-[#F04438] text-[#F04438]">
            Hủy bỏ
          </AlertDialogCancel>
          {loading.deleteProject ? (
            <Button className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer">
              {" "}
              <Spinner />
            </Button>
          ) : (
            <Button
              onClick={() => handleDelete(task)}
              className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer"
            >
              {" "}
              Xóa
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
