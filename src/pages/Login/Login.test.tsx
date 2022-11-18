/**
 * @jest-environment jsdom
 */

import { test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Login from '.';
import { render } from '../../test-utils';

const mockedUsername = 'miguel@mail.com';
const mockedPassword = 'miguel123';

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
    test('Login button is enabled when username and password are filled', async () => {
        const { usernameInput, passwordInput, loginButton } = renderLogin();

        expect(loginButton).toBeDisabled();

        userEvents.type(usernameInput, mockedUsername);
        userEvents.type(passwordInput, mockedPassword);

        expect(loginButton).toBeEnabled();
    });

    test('Login button is loading is clicked', async () => {
        const { usernameInput, passwordInput, loginButton } = renderLogin();

        userEvents.type(usernameInput, mockedUsername);
        userEvents.type(passwordInput, mockedPassword);

        expect(screen.getByText(/login/i)).toBeInTheDocument();

        userEvents.click(loginButton);

        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });
});
