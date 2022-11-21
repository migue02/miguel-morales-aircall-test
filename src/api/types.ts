export type User = {
    id: string;
    username: string;
}

export type UserRequest = {
    username: string;
    password: string;
}

export type Note = {
    id: string;
    content: string;
}

export type CallType = 'missed' | 'answered' | 'voicemail';
export type CallDirection = 'inbound' | 'outbound';

export type Call = {
    id: string;
    duration: number;
    is_archived: boolean;
    from: string;
    to: string;
    direction: CallDirection;
    call_type: CallType;
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
