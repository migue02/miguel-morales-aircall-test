import { useToast } from '@aircall/tractor';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERRORS, ERROR_NOT_LOGGED_CODE } from '../../api/constants';
import { clearItems } from '../../storage';

export default function useHandleError() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleError = useCallback((error: unknown): void => {
        const displayError = (message: string) => {
            showToast({
                variant: 'error',
                dismissIn: 3000,
                message,
            });
        };

        if (error instanceof Error) {
            const code = error?.cause as number || 0;
            if (code === ERROR_NOT_LOGGED_CODE) {
                clearItems();
                navigate('/login');
            } else if (code && !!ERRORS[code] && error.message) {
                displayError(error.message);
            } else {
                throw error;
            }
        } else {
            throw error;
        }
    }, [navigate, showToast]);


    return [handleError] as [(error: unknown) => void];
}
