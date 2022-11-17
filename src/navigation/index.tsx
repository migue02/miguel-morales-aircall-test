import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Login from '../pages/Login';
import CallDetail from '../pages/CallDetail';
import { UserProvider } from '../contexts/UserContext';

const Navigation = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Calls />} />
                    <Route path="/:id" element={<CallDetail />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};

export default Navigation;
