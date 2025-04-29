import { IProject } from "./IProject";
import { IUser } from "./IUser";

export enum TaskStatus {
  Pending = "PENDING",
  Done = "DONE",
  Overdue = "OVERDUE",
  Pausing = "PAUSING",
}
export interface ITask {
  id: number;
  uuid: string;
  feature: string;
  name: string;
  status: TaskStatus;
  project?: IProject;
  priority: string;
  designated_personnel: IUser;
  designating_personnel:  IUser;
  ended_at?: string;
  description?: string;
  status_changed_at:string;
  created_at: string;
}

export function taskStatusString(status: TaskStatus) {
  switch (status) {
    case TaskStatus.Done:
      return "Hoàn thành";
    case TaskStatus.Pending:
      return "Đang xử lý";
    case TaskStatus.Overdue:
      return "Quá hạn";
    case TaskStatus.Pausing:
      return "Tạm dừng";
  }
}

export function taskStatusCount(tasks: ITask[]) {
  let pending: ITask[] = [];
  let done: ITask[] = [];
  let overdue: ITask[] = [];
  if (tasks.length > 0) {
    pending = tasks.filter((item) => item.status === TaskStatus.Pending);
    done = tasks.filter((item) => item.status === TaskStatus.Done);
    overdue = tasks.filter((item) => item.status === TaskStatus.Overdue);
  }
  return { pending, done, overdue };
}
