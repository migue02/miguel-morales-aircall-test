import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Login from '../pages/Login';
import CallDetail from '../pages/CallDetail';
import { UserProvider } from '../contexts/UserContext';
import { CallProvider } from '../contexts/CallContext';

const Navigation = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <CallProvider>
                    <Routes>
                        <Route path="/" element={<Calls />} />
                        <Route path="/:id" element={<CallDetail />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </CallProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default Navigation;
