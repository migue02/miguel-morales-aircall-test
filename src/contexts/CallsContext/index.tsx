import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { CHANNEL, UPDATE_CALL_EVENT } from '../../services/constants';
import { getPusher } from '../../services/Pusher';
import { useUserContext } from '../UserContext';
import { getAccessToken } from '../../storage';
import { archiveCall, getCalls } from '../../api';
import { ERROR_NOT_LOGGED_CODE, PAGE_SIZE } from '../../api/constants';
import { Call } from '../../api/types';
import { ICallsProvider, CallType, CallsDictionary } from './types';
import { format } from 'date-fns';

export const [useCallsContext, CallsContext] = createCtx<CallType>();

export const CallsProvider: FC<ICallsProvider> = ({ children }) => {
    const [calls, setCalls] = useState<CallsDictionary>({});
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

                const groupCalls: CallsDictionary = result.nodes.reduce(
                    (groupCalls: CallsDictionary, call: Call) => {
                        const date = format(
                            new Date(call.created_at),
                            'yyyy-M-dd'
                        );
                        if (!groupCalls[date]) {
                            groupCalls[date] = [];
                        }
                        groupCalls[date].push(call);
                        return groupCalls;
                    },
                    {}
                );

                setTotalCount(result.totalCount);
                setCalls(groupCalls);
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
                    const date = format(new Date(data.created_at), 'yyyy-M-dd');

                    const groupCalls: CallsDictionary = Object.keys(
                        calls
                    ).reduce((groupCalls: CallsDictionary, key: string) => {
                        groupCalls[key] = calls[key];
                        if (date === key) {
                            groupCalls[date].map((call) => {
                                if (call.id === data.id) {
                                    call.is_archived = data.is_archived;
                                }
                                return call;
                            });
                        }
                        return groupCalls;
                    }, {});

                    setCalls(groupCalls);
                }
            });
            return () => getPusher().unsubscribe(CHANNEL);
        }
    }, [loggedIn, calls]);

    const changePage = (newPageNumber: number) => {
        setCurentPage(newPageNumber);
    };

    const chagePageSize = (newPageSize: number) => {
        setPageSize(newPageSize);
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
            }}
        >
            {children}
        </CallsContext.Provider>
    );
};
