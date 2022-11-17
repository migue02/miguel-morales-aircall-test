import { Flex, Spacer, Typography } from '@aircall/tractor';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalls } from '../../api';
import { ERROR_NOT_LOGGED_CODE } from '../../api/constants';
import { Call } from '../../api/types';
import CallComponent from '../../components/CallComponent';

const Calls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCalls()
            .then((calls) => {
                setCalls(calls.nodes);
            })
            .catch((error: Error) => {
                if (error?.cause === ERROR_NOT_LOGGED_CODE) navigate('/login');
            });
    }, [navigate]);

    const goToDetail = (id: string) => {
        navigate(`/${id}`);
    };

    const archive = (id: string) => {};

    return (
        <Flex height="90%" flexDirection="column" mt="40px">
            <Typography variant="displayL" textAlign="center">
                Calls
            </Typography>
            <Flex
                overflowY="auto"
                height="100%"
                flexDirection="column"
                m="40px"
            >
                <Spacer
                    space="xs"
                    direction="vertical"
                    alignItems="center"
                    justifyContent="center"
                >
                    {calls.map((call, idx) => (
                        <CallComponent
                            key={idx}
                            call={call}
                            goToDetail={goToDetail}
                            archive={archive}
                        />
                    ))}
                </Spacer>
            </Flex>
        </Flex>
    );
};

export default Calls;
