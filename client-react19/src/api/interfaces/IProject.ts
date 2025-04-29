import { ITask } from "./ITask";
import { IUser } from "./IUser";

export enum ProjectStatus {
  Waiting = "WAITING",
  Refuse = "REFUSE",
  Developing = "DEVELOPING",
  Pausing = "PAUSING",
  Done = "DONE",
  Failed = "FAILED",
  Close = "CLOSE",
}
export enum ProjectPriority {
  High = "HIGH",
  Medium = "MEDIUM",
  Low = "LOW",
}
export interface IProject {
  id: number;
  uuid: string;
  name: string;
  started_at: string;
  ended_at: string;
  status: ProjectStatus;
  pm?: IUser[];
  pa?: IUser;
  is_lock: boolean;
  personnel_count: number;
  tasks: ITask[];
  description: string;
  tasks_done_count?: number;
  tasks_pending_count?: number;
  tasks_overdue_count?: number;
  priority: ProjectPriority;
  personnel: IUser[];
  sum_task_count?:number;
  done_task_count?:number;
  pending_task_count?:number;
  pausing_task_count?:number;
  overdue_task_count?:number;
}
export function projectPriorityString(priority: ProjectPriority) {
  switch (priority) {
    case ProjectPriority.High:
      return {
        value: "Cao",
      };
    case ProjectPriority.Medium:
      return {
        value: "Trung bình",
      };
    case ProjectPriority.Low:
      return {
        value: "Thấp",
      };
  }
}
export function projectStatusString(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.Done:
      return {
        value: "Hoàn thành",
        color: "text-white bg-green-600  ",
      };
    case ProjectStatus.Refuse:
      return {
        value: "Từ chối duyệt",
        color: "text-gray-600 border-gray-600 ",
      };
    case ProjectStatus.Developing:
      return {
        value: "Đang thực hiện",
        color: "bg-[#1F8EDD] text-white ",
      };
    case ProjectStatus.Failed:
      return {
        value: "Thất bại",
        color: "text-gray-600 border-gray-600 bg-white ",
      };
    case ProjectStatus.Pausing:
      return {
        value: "Tạm dừng",
        color: "bg-yellow-600 text-white ",
      };
    case ProjectStatus.Waiting:
      return {
        value: "Đang chờ duyệt",
        color: "text-red-800 border-red-800 ",
      };
    case ProjectStatus.Close:
      return {
        value: "Đóng",
        color: "bg-gray-500 white ",
      };
  }
}

export interface ProjectLogMeta {
  action: "UPDATE_STATUS" | "COMPLETE_TASK";
  project_name: string;
  old_status?: ProjectStatus;
  new_status?: ProjectStatus;
}
export interface ProjectLog {
  user: IUser;
  description: string;
  meta: ProjectLogMeta;
}
