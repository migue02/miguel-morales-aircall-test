import { ReactNode } from 'react';
import { Call, CallType } from '../../api/types';

export type CallsDictionary = { [key: string]: Call[] };

export type CallsType = {
    calls: CallsDictionary;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    loadingCalls: boolean;
    changePage: (newPageSize: number) => void;
    chagePageSize: (newPageNumber: number) => void;
    archiveCall: (id: string) => void;
    setFilter: React.Dispatch<React.SetStateAction<CallType | undefined>>;
};

export interface ICallsProvider {
    children: ReactNode;
}
