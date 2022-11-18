import { useState, useEffect } from 'react';
import { getCall } from '../../api';
import { Call } from '../../api/types';
import useHandleError from '../useHandleError';

export default function useCall(id?: string) {
    const [call, setCall] = useState<Call>();
    const [loading, setLoading] = useState(false);
    const [handleError] = useHandleError();

    useEffect(() => {
        const fetchCall = async (id: string) => {
            setCall(undefined);
            setLoading(true);
            try {
                const newCall = await getCall(id);
                setCall(newCall);
                setLoading(false);

                return newCall;
            } catch (error: unknown) {
                setLoading(false);
                handleError(error);
            }
        }
        if (id) {
            void fetchCall(id);
        }
    }, [id, handleError]);


    return [call, loading] as [Call, boolean];
}
