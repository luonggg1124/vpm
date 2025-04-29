import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../../components/ui/alert-dialog";
import { Button } from "../../../../../../components/ui/button";
import { IProject } from "../../../../../../api/interfaces/IProject";
import useProject from "@/api/hook/useProject";
import { useState } from "react";
import Spinner from "@/components/page/spriner";

type Props = {
  project: IProject;
};
const Lock = ({ project }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, lockProject } = useProject();
  const handleLock = async (id: number) => {
    setOpen(true);
    await lockProject(id);
    setOpen(false);
  };
 

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="size-9" asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-center hover:bg-gray-200  text-gray-700"
        >
          {Boolean(project.is_lock) ? <LockKeyholeOpen /> : <LockKeyhole />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Khóa dự án</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa dự án {project?.name} này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer border-[#F04438] hover:text-[#F04438] text-[#F04438]">
            Hủy bỏ
          </AlertDialogCancel>

          {loading.lockProject ? (
            <Button className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer">
              {" "}
              <Spinner />
            </Button>
          ) : (
            <Button
              onClick={() => handleLock(project.id)}
              className="hover:bg-[#F04438] bg-[#F04438] text-white cursor-pointer"
            >
              {" "}
              {project.is_lock ? "Mở Khóa" : "Khóa"} 
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Lock;
