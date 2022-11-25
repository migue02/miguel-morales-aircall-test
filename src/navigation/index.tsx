import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Login from '../pages/Login';
import CallDetail from '../pages/CallDetail';
import { UserProvider } from '../contexts/UserContext';
import { CallsProvider } from '../contexts/CallsContext';
import { CALL_DETAIL, HOME, LOGIN } from './constansts';

const Navigation = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route
                        path={HOME}
                        element={
                            <CallsProvider>
                                <Calls />
                            </CallsProvider>
                        }
                    />
                    <Route path={CALL_DETAIL} element={<CallDetail />} />
                    <Route path={LOGIN} element={<Login />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};

export default Navigation;
