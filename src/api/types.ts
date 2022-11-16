export type User = {
    username: string;
    password: string;
}

export type Note = {
    id: string;
    content: string;
}

export type Call = {
    id: string;
    duration: number;
    is_archived: boolean;
    from: string;
    to: string;
    direction: string;
    call_type: string;
    via: string;
    created_at: string;
    notes: Note[];
}

export type RequestParamsType = {
    url: string;
    method: 'GET' | 'POST' | 'PUT';
    body?: BodyInit;
    refresh?: boolean;
}

export type ICallsResponse = {
    nodes: Call[];
    totalCount: number;
    hasNextPage: boolean;
}

export type IAuthResponse = {
    user: User;
    access_token: string;
    refresh_token: string;
}

export type IAllResponses = IAuthResponse | ICallsResponse;
