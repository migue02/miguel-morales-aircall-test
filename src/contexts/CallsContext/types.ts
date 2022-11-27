import { ReactNode } from 'react';
import { Call } from '../../api/types';

export type CallsDictionary = { [key: string]: Call[] };

export type CallType = {
    calls: CallsDictionary;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    loadingCalls: boolean;
    changePage: (newPageSize: number) => void;
    chagePageSize: (newPageNumber: number) => void;
    archiveCall: (id: string) => void;
};

export interface ICallsProvider {
    children: ReactNode;
}
