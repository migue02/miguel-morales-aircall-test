import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calls from '../pages/Calls';
import Call from '../pages/Call';
import Login from '../pages/Login';

const Navigation = () => {
    return (
        <BrowserRouter>
            <div className="Container">
                <Routes>
                    <Route path="/" element={<Calls />} />
                    <Route path="/:id" element={<Call />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Navigation;
