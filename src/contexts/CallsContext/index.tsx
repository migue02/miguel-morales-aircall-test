import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { createCtx } from '..';
import { CHANNEL, UPDATE_CALL_EVENT } from '../../services/constants';
import { getPusher } from '../../services/Pusher';
import { useUserContext } from '../UserContext';
import { getAccessToken } from '../../storage';
import { getCalls } from '../../api';
import { PAGE_SIZE } from '../../api/constants';
import { Call, ICallsResponse } from '../../api/types';
import { ICallsProvider, CallType, CallsDictionary } from './types';
import { format } from 'date-fns';
import useHandleError from '../../hooks/useHandleError';
import { useArchiveMutation } from '../../hooks/useArchiveMutation';

export const [useCallsContext, CallsContext] = createCtx<CallType>();

export const CallsProvider: FC<ICallsProvider> = ({ children }) => {
    const queryClient = useQueryClient();
    const [currentPage, setCurentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const { loggedIn } = useUserContext();
    const [handleError] = useHandleError();
    const archiveMutation = useArchiveMutation(currentPage, pageSize);

    const { data: dataQuery, isLoading: loadingCalls } = useQuery<
        ICallsResponse,
        Error
    >({
        queryKey: ['calls', (currentPage - 1) * pageSize, pageSize],
        queryFn: () => getCalls((currentPage - 1) * pageSize, pageSize),
        onError: (error) => handleError(error),
    });

    const { calls = {}, totalCount = 0 } = useMemo(() => {
        if (dataQuery && !loadingCalls) {
            const groupCalls: CallsDictionary = dataQuery.nodes.reduce(
                (groupCalls: CallsDictionary, call: Call) => {
                    const date = format(new Date(call.created_at), 'yyyy-M-dd');
                    if (!groupCalls[date]) {
                        groupCalls[date] = [];
                    }
                    groupCalls[date].push(call);
                    return groupCalls;
                },
                {}
            );
            return { calls: groupCalls, totalCount: dataQuery.totalCount };
        }
        return {};
    }, [dataQuery, loadingCalls]);

    const archive = useCallback(
        (id: string) => {
            archiveMutation.mutate(id);
        },
        [archiveMutation]
    );

    useEffect(() => {
        if (loggedIn) {
            const channel = getPusher(getAccessToken()).subscribe(CHANNEL);
            channel.bind(UPDATE_CALL_EVENT, (data: Call) => {
                if (data) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'calls',
                            (currentPage - 1) * pageSize,
                            pageSize,
                        ],
                    });
                }
            });
            return () => getPusher().unsubscribe(CHANNEL);
        }
    }, [loggedIn, queryClient, currentPage, pageSize]);

    const changePage = useCallback((newPageNumber: number) => {
        setCurentPage(newPageNumber);
    }, []);

    const chagePageSize = useCallback((newPageSize: number) => {
        setPageSize(newPageSize);
    }, []);

    return (
        <CallsContext.Provider
            value={{
                calls,
                totalCount,
                currentPage,
                pageSize,
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
