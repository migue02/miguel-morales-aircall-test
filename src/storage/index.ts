import { User } from "../api/types";

const USER = 'user';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const clearItems = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER);
}

export const updateTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
}

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

export const setAccessToken = (accessToken: string) => {
    return localStorage.setItem(ACCESS_TOKEN, accessToken);
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
}

export const setRefreshToken = (refreshToken: string) => {
    return localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export const setUser = (user: User) => {
    return localStorage.setItem(USER, JSON.stringify(user));
}

export const getUser = (): User | null => {
    const stringUser = localStorage.getItem(USER);
    if (stringUser) {
        return JSON.parse(stringUser) as User;
    }
    return null;
}