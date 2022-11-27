import { useQuery } from '@tanstack/react-query';
import { getCall } from '../../api';
import { Call } from '../../api/types';
import useHandleError from '../useHandleError';

export default function useCall(id: string) {
    const [handleError] = useHandleError();
    const { data: call, isLoading: loading } = useQuery<Call, Error>({
        queryKey: ['call', id],
        queryFn: () => getCall(id),
        onError: (error) => handleError(error),
    });

    return [call, loading] as [Call, boolean];
}
