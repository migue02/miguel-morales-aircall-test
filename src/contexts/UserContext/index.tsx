import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { isLogged, login, refreshToken } from '../../api';
import { IUserProvider, UserType } from './types';

export const [useUserContext, UserContext] = createCtx<UserType>();

export const UserProvider: FC<IUserProvider> = ({ children }) => {
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIsLogged = async () => {
            try {
                const logged = await isLogged();
                if (!logged) {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        void fetchIsLogged();
    }, [navigate]);

    const doLogin = async (
        username: string,
        password: string
    ): Promise<boolean> => {
        setLoading(true);
        try {
            await login(username, password);
            setUserName(username);
            return true;
        } catch (error) {
            setUserName('');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const isLoggedIn = async (): Promise<boolean> => {
        setLoading(true);
        try {
            return await isLogged();
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const doRefreshToken = async () => {
        setLoading(true);
        try {
            await refreshToken(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                username,
                loading,
                login: useCallback(
                    (username, password) => doLogin(username, password),
                    []
                ),
                isLoggedIn: useCallback(() => isLoggedIn(), []),
                refreshToken: useCallback(() => doRefreshToken(), []),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
