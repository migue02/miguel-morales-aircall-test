const USER = 'user';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

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

export const setUser = (username: string) => {
    return localStorage.setItem(USER, username);
}

export const getUser = () => {
    return localStorage.getItem(USER);
}