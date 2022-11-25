export const API_URL = 'https://frontend-test-api.aircall.dev';

export const CALLS_ENDPOINT = '/calls';

export const ME_ENDPOINT = '/me';
export const LOGIN_ENDPOINT = '/auth/login';
export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token-v2';

export const ARCHIVE_ENDPOINT = '/archive';
export const ADD_NOTE_ENDPOINT = '/note';

export const ERROR_NOT_BAD_REQUEST_CODE = 400;
export const ERROR_NOT_LOGGED_CODE = 401;
export const ERROR_NOT_NOT_FOUND_CODE = 404;

export const ERRORS: { [key: number]: { message: string } } = {
    400: {
        message: 'Bad request',
    },
    401: {
        message: 'User not logged, please login',
    },
    404: {
        message: 'Not Found',
    },
};

export const PAGE_SIZE = 10;
