import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCtx } from '..';
import { isLogged, login, refreshToken } from '../../api';
import { IUserProvider, UserType } from './types';

export const [useUserContext, UserContext] = createCtx<UserType>();

export const UserProvider: FC<IUserProvider> = ({ children }) => {
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIsLogged = async () => {
            try {
                const logged = await isLogged();
                setLoggedIn(logged);
                if (!logged) {
                    navigate('/login');
                }
            } catch (e) {
                setLoggedIn(false);
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
            setLoggedIn(true);
            return true;
        } catch (error) {
            setUserName('');
            setLoggedIn(false);
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
                loggedIn,
                loading,
                login: useCallback(
                    (username, password) => doLogin(username, password),
                    []
                ),
                refreshToken: useCallback(() => doRefreshToken(), []),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
