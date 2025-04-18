import { IProject, ProjectLogMeta } from "./IProject";
import { IUser } from "./IUser";

export interface ILog{
    id: number;
    project?:IProject
    user?:IUser;
    meta: ProjectLogMeta;
    description?: string;
    created_at:string;
}