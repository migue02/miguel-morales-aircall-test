import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { archiveCall, getCall, getCalls } from '../../api';
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

    const fetchCall = async (id: string): Promise<Call> => {
        try {
            return await getCall(id);
        } catch (error: unknown) {
            const err = error instanceof Error ? error : new Error();
            throw err;
        }
    };

    const archive = async (id: string): Promise<boolean> => {
        setLoading(true);
        try {
            const result = await archiveCall(id);

            setLoading(false);

            return !!result;
        } catch (e) {
            setLoading(false);

            return false;
        }
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
                archiveCall: useCallback((id) => archive(id), []),
                getCall: useCallback((id) => fetchCall(id), []),
            }}
        >
            {children}
        </CallsContext.Provider>
    );
};
