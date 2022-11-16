import { useEffect } from 'react';
import { login } from '../../api';

const Login = () => {
    useEffect(() => {
        const a = login('test', 'test');

        a.then(console.log);
    }, []);

    return <div>Login</div>;
};

export default Login;
