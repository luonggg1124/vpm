import { ILog } from "@/api/interfaces/ILog";
import { projectStatusString } from "@/api/interfaces/IProject";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeToNow } from "@/utils/datetime";

type Props = {
  log: ILog;
};
const Item = ({ log, ...props }: Props) => {
  if (log.meta.action === "UPDATE_STATUS") {
    return (
      <div {...props} className="flex items-start gap-4 relative">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/avatar.png" alt={log?.user?.name} />
          <AvatarFallback>{log?.user?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{log?.user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {timeToNow(log?.created_at)}
            </p>
          </div>
          <p className="text-sm">Đã cập nhật trạng thái của dự án <span className="font-semibold text-[#53B69A]">{log.meta.project_name}</span></p>
          <div className="text-sm mt-1 leading-snug flex items-center gap-2">
            <p className="font-semibold">
              {log.meta.old_status
                ? projectStatusString(log.meta.old_status).value
                : ""}
            </p>{" "}
            {"->"}{" "}
            <p className="font-semibold">
              {log.meta.new_status
                ? projectStatusString(log.meta.new_status).value
                : ""}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div {...props} className="flex items-start gap-4 relative">
      <Avatar className="w-10 h-10">
        <AvatarImage src="/avatar.png" alt={log?.user?.name} />
        <AvatarFallback>{log?.user?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium">{log?.user?.name}</p>
        <p className="text-xs text-muted-foreground">
          {timeToNow(log?.created_at)}
        </p>
        <div className="text-sm mt-1 leading-snug">{log?.meta?.action}</div>
      </div>
    </div>
  );
};

export default Item;
