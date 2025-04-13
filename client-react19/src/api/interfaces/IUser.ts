import { ITask } from "./ITask";

export interface IUser{
    id: number;
    email:string;
    name:string;
    started_at:string;
}

export interface IPersonnel {
    id: number;
    email:string;
    name:string;
    done_count:string;
    pending_count:string;
    overdue_count:string;
    pausing_count:string;
    sum_count:string;
    tasks?:ITask[];
}