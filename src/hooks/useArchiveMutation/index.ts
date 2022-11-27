import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveCall } from '../../api';
import { ICallsResponse } from '../../api/types';
import useHandleError from '../useHandleError';

export const useArchiveMutation = (currentPage: number, pageSize: number) => {
    const queryClient = useQueryClient();
    const [handleError] = useHandleError();
    const archiveMutation = useMutation((id: string) => archiveCall(id), {
        // When mutate is called:
        onMutate: async (id: any) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([
                'calls',
                (currentPage - 1) * pageSize,
                pageSize,
            ]);

            // Snapshot the previous calls
            const previousCalls = queryClient.getQueryData<ICallsResponse>([
                'calls',
                (currentPage - 1) * pageSize,
                pageSize,
            ]);

            // Optimistically update the calls array with the new is_archived value for the selected call
            if (previousCalls) {
                queryClient.setQueryData<ICallsResponse>(
                    ['calls', (currentPage - 1) * pageSize, pageSize],
                    {
                        ...previousCalls,
                        nodes: previousCalls.nodes.map((call) => {
                            if (call.id === id) {
                                call.is_archived = !call.is_archived;
                            }
                            return call;
                        }),
                    }
                );
            }

            return { previousCalls };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (error, variables, context) => {
            if (context?.previousCalls) {
                queryClient.setQueryData<ICallsResponse>(
                    ['calls', (currentPage - 1) * pageSize, pageSize],
                    context.previousCalls
                );
            }
            handleError(error);
        },
        // Always refetch after error or success:
        onSettled: (data) => {
            queryClient.invalidateQueries([
                'calls',
                (currentPage - 1) * pageSize,
                pageSize,
            ]);
            if (data?.id) {
                queryClient.invalidateQueries(['call', data.id]);
            }
        },
    });
    return archiveMutation;
};
