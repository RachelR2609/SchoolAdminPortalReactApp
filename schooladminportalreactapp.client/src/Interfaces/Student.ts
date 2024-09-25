import { IBase } from "./Base";
import { IPagedRequestBase } from "./DataGrid";

export interface IStudent extends IBase {
    firstName: string;
    lastName: string;
    yearGroup: number;
    emergencyContact: string;
}

export interface IStudentPagedRequest extends IPagedRequestBase {
    data: IStudent[];
}
