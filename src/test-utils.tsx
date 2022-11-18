import { render, RenderOptions } from '@testing-library/react';
import { Tractor } from '@aircall/tractor';
import { Call } from './api/types';
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
