import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { CHANNEL, UPDATE_CALL_EVENT } from '../../services/constants';
import { getPusher } from '../../services/Pusher';
import { useUserContext } from '../UserContext';
import { getAccessToken } from '../../storage';
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
    const [loadingCalls, setLoadingCalls] = useState(false);
    const { loggedIn } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingCalls(true);
        const fetchCalls = async () => {
            try {
                const result = await getCalls(
                    (currentPage - 1) * pageSize,
                    pageSize
                );
                setTotalCount(result.totalCount);
                setCalls(result.nodes);
                setLoadingCalls(false);
            } catch (error: unknown) {
                setLoadingCalls(false);
                if (
                    error instanceof Error &&
                    error?.cause === ERROR_NOT_LOGGED_CODE
                )
                    navigate('/login');
            }
        };
        void fetchCalls();
    }, [navigate, currentPage, pageSize]);

    useEffect(() => {
        if (loggedIn) {
            const channel = getPusher(getAccessToken()).subscribe(CHANNEL);
            channel.bind(UPDATE_CALL_EVENT, (data: Call) => {
                if (data) {
                    console.log('data', data);
                    setCalls((prev) => {
                        return prev.map((call) => {
                            if (call.id === data.id) {
                                call.is_archived = data.is_archived;
                            }
                            return call;
                        });
                    });
                }
            });
            return () => getPusher().unsubscribe(CHANNEL);
        }
    }, [loggedIn]);

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
        try {
            const result = await archiveCall(id);
            return !!result;
        } catch (e) {
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
                loadingCalls,
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
