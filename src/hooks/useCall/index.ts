import { useState, useEffect } from 'react';
import { getCall } from '../../api';
import { Call } from '../../api/types';

export default function useCall(id?: string) {
    const [call, setCall] = useState<Call>();
    const [loading, setLoading] = useState(false);

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
                const err = error instanceof Error ? error : new Error();
                throw err;
            }
        }
        if (id) {
            void fetchCall(id);
        }
    }, [id]);


    return [call, loading] as [Call, boolean];
}
