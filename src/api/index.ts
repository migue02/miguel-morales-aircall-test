import { getAccessToken, getRefreshToken, updateTokens } from "../storage";
import { API_URL, ARCHIVE_ENDPOINT, CALLS_ENDPOINT, ERROR_NOT_LOGGED_CODE, ERROR_NOT_LOGGED_MESSAGE, ERROR_REFRESH_TOKEN_CODE, ERROR_REFRESH_TOKEN_MESSAGE, LOGIN_ENDPOINT, ME_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from "./constants";
import { Call, IAuthResponse, ICallsResponse, User } from "./types";

const request = async <Parameters, Response>(
    url: string,
    method: 'GET' | 'POST' | 'PUT',
    parameters?: Parameters,
    refresh?: boolean,
): Promise<Response> => {
    const body = parameters && JSON.stringify(parameters);

    const params: RequestInit = {
        method,
        headers: getHeaders(refresh),
        body,
    };

    const response = await fetch(url, params);
    const shouldRefetchToken = response.status === 401;

    if (!response.ok && url.indexOf(REFRESH_TOKEN_ENDPOINT) > -1) {
        throw new Error(ERROR_NOT_LOGGED_MESSAGE, { cause: ERROR_NOT_LOGGED_CODE });
    }

    if (shouldRefetchToken && !refresh) {
        try {
            const { access_token, refresh_token } = await refreshToken();

            updateTokens(access_token, refresh_token)

            return await request(url, method, parameters, refresh);
        } catch (e) {
            throw new Error(ERROR_REFRESH_TOKEN_MESSAGE, { cause: ERROR_REFRESH_TOKEN_CODE });
        }
    }

    return await response.json() as Response;
}

const getHeaders = (refresh?: boolean) => {
    const authToken = refresh ? getRefreshToken() : getAccessToken();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (authToken) {
        headers.append('Authorization', `Bearer ${authToken}`);
    }

    return headers;
}

const get = async <Response>(url: string, refresh?: boolean): Promise<Response> => {
    return request<null, Response>(url, 'GET', undefined, refresh);
}

const put = async <Response>(url: string, refresh?: boolean): Promise<Response> => {
    return request<null, Response>(url, 'PUT', undefined, refresh);
}

const post = async <Parameters, Response>(url: string, body?: Parameters, refresh?: boolean): Promise<Response> => {
    return request<Parameters, Response>(url, 'POST', body, refresh);
}

export const refreshToken = async (refresh: boolean = true): Promise<IAuthResponse> => post<null, IAuthResponse>(`${API_URL}${REFRESH_TOKEN_ENDPOINT}`, null, refresh);

export const isLogged = async (): Promise<boolean> => {
    return get<boolean>(`${API_URL}${ME_ENDPOINT}`);
}

export const login = async (username: string, password: string): Promise<IAuthResponse> => {
    const response = await post<User, IAuthResponse>(`${API_URL}${LOGIN_ENDPOINT}`, { username, password });
    const { access_token, refresh_token } = response;
    updateTokens(access_token, refresh_token)

    return response;
}

export const getCalls = async (offset: number = 0, limit: number = 10): Promise<ICallsResponse> => {
    return get<ICallsResponse>(`${API_URL}${CALLS_ENDPOINT}?offset=${offset}&limit=${limit}`);
}

export const getCall = async (id: number): Promise<Call> => {
    return get<Call>(`${API_URL}${CALLS_ENDPOINT}/${id}`);
}

export const archiveCall = async (id: number): Promise<Call> => {
    return put<Call>(`${API_URL}${CALLS_ENDPOINT}/${id}${ARCHIVE_ENDPOINT}`);
}
