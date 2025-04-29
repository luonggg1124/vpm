import { ExternalLink } from "lucide-react";
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
import { IProject, ProjectStatus } from "../../../../../../api/interfaces/IProject";
import useProject from "@/api/hook/useProject";
import { useState } from "react";

type Props = {
    project?: IProject
}
const SendForReview = ({project}:Props) => {
  const {sendForReview} = useProject();
  const [open,setOpen] = useState<boolean>(false);
  const handleSubmit = async() => {
    setOpen(true);
    await sendForReview(project?.id);
    setOpen(false);
  }
  if(project?.status !== ProjectStatus.Refuse){
    return;
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogTrigger className="size-9" asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-center hover:bg-gray-200 text-gray-700"
        >
          <ExternalLink />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gửi duyệt lại</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn gửi duyệt dự án {project?.name} này không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSubmit()} className="hover:bg-[#53B69A] cursor-pointer">
            Gửi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SendForReview;
