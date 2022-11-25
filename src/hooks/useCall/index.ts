import { useState, useEffect } from 'react';
import { addNoteToCall, getCall } from '../../api';
import { Call } from '../../api/types';
import useHandleError from '../useHandleError';

export default function useCall(id: string) {
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
        };
        if (id) {
            void fetchCall(id);
        }
    }, [id, handleError]);

    const addNote = async (content: string): Promise<boolean> => {
        setLoading(true);
        try {
            const call = await addNoteToCall(id, content);
            setCall(call);
            return true;
        } catch (error) {
            handleError(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return [call, addNote, loading] as [
        Call,
        (content: string) => Promise<boolean>,
        boolean
    ];
}
