import { GridColDef } from '@mui/x-data-grid'

export interface IPaginationState {
    pageSize: number;
    page: number;
}

export interface IDataGridState {
    rows: any[];
    columns: GridColDef[];
    total: number
    loading: boolean;
}

export interface IPagedRequestBase {
    totalItems: number;
}