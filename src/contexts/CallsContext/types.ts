import { ReactNode } from "react";
import { Call } from "../../api/types";

export type CallType = {
    calls: Call[];
    currentPage: number;
    changePage: (newPageSize: number) => void;
    pageSize: number;
    chagePageSize: (newPageNumber: number) => void;
    totalCount: number;
    loadingCalls: boolean;
    archiveCall: (id: string) => Promise<boolean>;
    getCall: (id: string) => Promise<Call>;
};

export interface ICallsProvider {
    children: ReactNode;
}