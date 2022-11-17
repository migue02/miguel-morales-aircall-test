import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { getCalls } from '../../api';
import { ERROR_NOT_LOGGED_CODE, PAGE_SIZE } from '../../api/constants';
import { Call } from '../../api/types';
import { ICallsProvider, CallType } from './types';

export const [useCallsContext, CallsContext] = createCtx<CallType>();

export const CallsProvider: FC<ICallsProvider> = ({ children }) => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [currentPage, setCurentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchCalls = async () => {
            try {
                const result = await getCalls(
                    (currentPage - 1) * pageSize,
                    pageSize
                );
                setTotalCount(result.totalCount);
                setCalls(result.nodes);
                setLoading(false);
            } catch (error: unknown) {
                setLoading(false);
                if (
                    error instanceof Error &&
                    error?.cause === ERROR_NOT_LOGGED_CODE
                )
                    navigate('/login');
            }
        };
        void fetchCalls();
    }, [navigate, currentPage, pageSize]);

    const changePage = (newPageNumber: number) => {
        setCurentPage(newPageNumber);
    };

    const chagePageSize = (newPageSize: number) => {
        setPageSize(newPageSize);
    };

    return (
        <CallsContext.Provider
            value={{
                calls,
                currentPage,
                pageSize,
                totalCount,
                loading,
                changePage: useCallback(
                    (newPageNumber) => changePage(newPageNumber),
                    []
                ),
                chagePageSize: useCallback(
                    (newPageSize) => chagePageSize(newPageSize),
                    []
                ),
            }}
        >
            {children}
        </CallsContext.Provider>
    );
};
