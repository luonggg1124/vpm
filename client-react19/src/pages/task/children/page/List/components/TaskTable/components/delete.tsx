import useTask from "@/api/hook/useTask";
import { ITask } from "@/api/interfaces/ITask";
import Spinner from "@/components/page/spriner";
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
import { Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
type Props = {
  task: ITask;
};
const DeleteAction = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, deleteTask } = useTask();
  const handleDelete = async (id: any) => {
    setOpen(true);
    await deleteTask(id);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="size-9" asChild>
        <Button
          variant="outline"
          className={`cursor-pointer text-center hover:bg-gray-200`}
        >
          <Trash2 />
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
                  Bạn có chắc chắn muốn xóa task đã chọn?
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
          {loading.delete ? (
            <Button className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer">
              {" "}
              <Spinner />
            </Button>
          ) : (
            <Button onClick={() => handleDelete(task.id)} className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer">
              {" "}
              Xóa
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
