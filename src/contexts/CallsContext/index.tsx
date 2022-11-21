import { FC, useCallback, useEffect, useState } from 'react';
import { createCtx } from '..';
import { CHANNEL, UPDATE_CALL_EVENT } from '../../services/constants';
import { getPusher } from '../../services/Pusher';
import { useUserContext } from '../UserContext';
import { getAccessToken } from '../../storage';
import { archiveCall, getCalls } from '../../api';
import { PAGE_SIZE } from '../../api/constants';
import { Call } from '../../api/types';
import { ICallsProvider, CallType, CallsDictionary } from './types';
import { format } from 'date-fns';
import useHandleError from '../../hooks/useHandleError';

export const [useCallsContext, CallsContext] = createCtx<CallType>();

export const CallsProvider: FC<ICallsProvider> = ({ children }) => {
    const [calls, setCalls] = useState<CallsDictionary>({});
    const [currentPage, setCurentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalCount, setTotalCount] = useState(0);
    const [loadingCalls, setLoadingCalls] = useState(false);
    const { loggedIn } = useUserContext();
    const [handleError] = useHandleError();

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
                handleError(error);
            }
        };
        void fetchCalls();
    }, [currentPage, pageSize, handleError]);

    useEffect(() => {
        if (loggedIn) {
            const channel = getPusher(getAccessToken()).subscribe(CHANNEL);
            channel.bind(UPDATE_CALL_EVENT, (data: Call) => {
                if (data) {
                    const date = format(new Date(data.created_at), 'yyyy-M-dd');

                    setCalls({
                        ...calls,
                        [date]: calls[date].map((call) => {
                            if (call.id === data.id) {
                                call.is_archived = data.is_archived;
                            }
                            return call;
                        }),
                    });
                }
            });
            return () => getPusher().unsubscribe(CHANNEL);
        }
    }, [loggedIn, calls]);

    const changePage = useCallback((newPageNumber: number) => {
        setCurentPage(newPageNumber);
    }, []);

    const chagePageSize = useCallback((newPageSize: number) => {
        setPageSize(newPageSize);
    }, []);

    const archive = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                const result = await archiveCall(id);
                return !!result;
            } catch (e) {
                handleError(e);
                return false;
            }
        },
        [handleError]
    );

    return (
        <CallsContext.Provider
            value={{
                calls,
                currentPage,
                pageSize,
                totalCount,
                loadingCalls,
                changePage,
                chagePageSize,
                archiveCall: archive,
            }}
        >
            {children}
        </CallsContext.Provider>
    );
};
