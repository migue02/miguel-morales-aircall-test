// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const mockedFn = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedFn,
}));

jest.mock('@aircall/tractor', () => ({
    ...(jest.requireActual('@aircall/tractor') as any),
    useToast: () => mockedFn,
}));
