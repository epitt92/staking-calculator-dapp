export interface ISpreadSheetProps {
  columns: number;
  searchValue : string;
}

export interface ISaveResponse {
  status: 'IN_PROGRESS' | 'DONE';
  id?: string;
  done_at?: string;
}

export interface IStatusResponse {
  status: 'DONE' | 'IN_PROGRESS';
  done_at: string;
}

export interface ICellData {
  value: string;
  evalExp: string;
  error: boolean;
}

export interface IAxiosError {
  response?: {
    status: number;
  };
}

export type ParsedToken = number | string;







