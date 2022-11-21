import { getAccessToken, getRefreshToken, updateTokens } from "../storage";
import { API_URL, ARCHIVE_ENDPOINT, CALLS_ENDPOINT, ERRORS, ERROR_NOT_LOGGED_CODE, LOGIN_ENDPOINT, ME_ENDPOINT, PAGE_SIZE, REFRESH_TOKEN_ENDPOINT } from "./constants";
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
    const shouldRefetchToken = response.status === ERROR_NOT_LOGGED_CODE;

    if (!response.ok) {
        await handleError(response);
    }

    if (shouldRefetchToken && !refresh) {
        const { access_token, refresh_token } = await refreshToken();

        updateTokens(access_token, refresh_token)

        return await request(url, method, parameters, refresh);
    }

    return await response.json() as Response;
}

const handleError = async (response: Response) => {
    if (response.status) {
        const jsonResponse = await response.json()

        if (response.status === ERROR_NOT_LOGGED_CODE && response.url.indexOf(REFRESH_TOKEN_ENDPOINT) > -1) {
            throw new Error(ERRORS[response.status].message, { cause: response.status });
        } else if (response.status !== ERROR_NOT_LOGGED_CODE) {
            throw new Error(jsonResponse.message || ERRORS[response.status].message, { cause: response.status });
        }
    }
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

export const getCalls = async (offset: number = 0, limit: number = PAGE_SIZE): Promise<ICallsResponse> => {
    return get<ICallsResponse>(`${API_URL}${CALLS_ENDPOINT}?offset=${offset}&limit=${limit}`);
}

export const getCall = async (id: string): Promise<Call> => {
    return get<Call>(`${API_URL}${CALLS_ENDPOINT}/${id}`);
}

export const archiveCall = async (id: string): Promise<Call> => {
    return put<Call>(`${API_URL}${CALLS_ENDPOINT}/${id}${ARCHIVE_ENDPOINT}`);
}
