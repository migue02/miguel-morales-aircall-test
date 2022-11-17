import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Login from '../pages/Login';
import CallDetail from '../pages/CallDetail';
import { UserProvider } from '../contexts/UserContext';
import { CallsProvider } from '../contexts/CallsContext';

const Navigation = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <CallsProvider>
                    <Routes>
                        <Route path="/" element={<Calls />} />
                        <Route path="/:id" element={<CallDetail />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </CallsProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default Navigation;
