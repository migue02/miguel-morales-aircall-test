import { render, RenderOptions } from '@testing-library/react';
import { Tractor } from '@aircall/tractor';
import { Call, IAuthResponse } from './api/types';
import { FC, ReactElement } from 'react';
import { UserProvider } from './contexts/UserContext';
import { CallsProvider } from './contexts/CallsContext';
import { BrowserRouter } from 'react-router-dom';

export const MockedOutboundCall: Call = {
    id: '123',
    duration: 59566,
    is_archived: false,
    from: '+33171451698',
    to: '+33128210740',
    direction: 'outbound',
    call_type: 'missed',
    via: '+33120801106',
    created_at: '2022-11-18T06:52:17.368Z',
    notes: [],
};

export const MockedInboundCall: Call = {
    id: '123',
    duration: 59566,
    is_archived: false,
    from: '+33171451698',
    to: '+33128210740',
    direction: 'inbound',
    call_type: 'missed',
    via: '+33120801106',
    created_at: '2022-11-18T06:52:17.368Z',
    notes: [],
};

export const mockedUsername = 'miguel@mail.com';
export const mockedPassword = 'miguel123';

export const LoginMockData: IAuthResponse = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    user: { id: '123', username: mockedUsername },
};

export const mockFetch = <T,>(mockData: T) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    ) as jest.Mock;
};

export const mockFetchError = (error: unknown) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

export const spyOnSetItemLocalStorage = () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Tractor injectStyle>
            <BrowserRouter>
                <UserProvider>
                    <CallsProvider>{children}</CallsProvider>
                </UserProvider>
            </BrowserRouter>
        </Tractor>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
