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
import { IProject } from "../../../../../../api/interfaces/IProject";

type Props = {
    project?: IProject
}
const SendForReview = ({project}:Props) => {
  return (
    <AlertDialog>
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
          <AlertDialogAction className="hover:bg-[#53B69A] cursor-pointer">
            Gửi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SendForReview;
