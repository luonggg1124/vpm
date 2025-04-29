import { IProject } from "./IProject";

export interface IDocs {
    id:any;
    title: string;
    project: IProject;
    uuid: string;
    file: string;
    added_at:string;
}