/**
 * @jest-environment jsdom
 */

import { test } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Login from '.';
import {
    LoginMockData,
    mockedPassword,
    mockedUsername,
    mockFetch,
    render,
    spyOnSetItemLocalStorage,
} from '../../test-utils';

const renderLogin = () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', {
        name: /login/i,
    });

    return { usernameInput, passwordInput, loginButton };
};

describe('<Login />', function () {
    test('Login button is enabled when username and password are filled', () => {
        const { usernameInput, passwordInput, loginButton } = renderLogin();

        expect(loginButton).toBeDisabled();

        userEvents.type(usernameInput, mockedUsername);
        userEvents.type(passwordInput, mockedPassword);

        expect(loginButton).toBeEnabled();
    });

    test('Login button is loading when is clicked', async () => {
        const { usernameInput, passwordInput, loginButton } = renderLogin();

        userEvents.type(usernameInput, mockedUsername);
        userEvents.type(passwordInput, mockedPassword);

        expect(screen.getByText(/login/i)).toBeInTheDocument();

        userEvents.click(loginButton);

        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });

    test('Local storage is clear and filled when user is logged in', async () => {
        spyOnSetItemLocalStorage();
        const { usernameInput, passwordInput, loginButton } = renderLogin();

        userEvents.type(usernameInput, mockedUsername);
        userEvents.type(passwordInput, mockedPassword);

        mockFetch(LoginMockData);
        userEvents.click(loginButton);
        await waitFor(() => {
            expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
        });
        expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    });
});
