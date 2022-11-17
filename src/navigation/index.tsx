import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Login from '../pages/Login';
import CallDetail from '../pages/CallDetail';
import { UserProvider } from '../contexts/UserContext';
import { CallsProvider } from '../contexts/CallsContext';
import { RealTimeProvider } from '../contexts/RealTimeContext';

const Navigation = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <RealTimeProvider>
                    <CallsProvider>
                        <Routes>
                            <Route path="/" element={<Calls />} />
                            <Route path="/:id" element={<CallDetail />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </CallsProvider>
                </RealTimeProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default Navigation;
