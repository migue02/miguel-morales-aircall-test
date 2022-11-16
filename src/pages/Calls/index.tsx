import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalls } from '../../api';
import { ERROR_NOT_LOGGED_CODE } from '../../api/constants';

const Calls = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const a = getCalls();

        a.then(console.log).catch((error: Error) => {
            if (error?.cause === ERROR_NOT_LOGGED_CODE) navigate('/login');
        });
    }, [navigate]);

    return <div>Calls</div>;
};

export default Calls;
