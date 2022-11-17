import { ReactNode } from "react";
import { Call } from "../../api/types";

export type CallType = {
    calls: Call[];
    currentPage: number;
    changePage: (newPageSize: number) => void;
    pageSize: number;
    chagePageSize: (newPageNumber: number) => void;
    totalCount: number;
    loading: boolean;
};

export interface ICallProvider {
    children: ReactNode;
}