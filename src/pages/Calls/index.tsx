import {
    Box,
    Divider,
    Flex,
    Pagination,
    Skeleton,
    Spacer,
    Typography,
} from '@aircall/tractor';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CallComponent from '../../components/CallComponent';
import { useCallsContext } from '../../contexts/CallsContext';
import { formatDate, getCallWidth } from '../../utils';

const Calls = () => {
    const {
        loadingCalls,
        calls,
        currentPage,
        pageSize,
        totalCount,
        changePage,
        chagePageSize,
        archiveCall,
    } = useCallsContext();

    const [orderedCalls, setOrderedCalls] = useState<string[]>([]);
    const navigate = useNavigate();

    const goToDetail = (id: string) => {
        navigate(`/${id}`);
    };

    useEffect(() => {
        if (calls) {
            const callsDate = Object.keys(calls).sort(
                (a, b) => new Date(b).getTime() - new Date(a).getTime()
            );

            setOrderedCalls(callsDate);
        }
    }, [calls]);

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
                    {!loadingCalls ? (
                        orderedCalls.map((date) => {
                            return (
                                <Box key={date}>
                                    <Typography variant="subheading">
                                        {formatDate(date)}
                                    </Typography>
                                    <Spacer
                                        space="xs"
                                        width="100%"
                                        direction="vertical"
                                    >
                                        <Divider orientation="horizontal" />
                                    </Spacer>
                                    {calls[date].map((call) => (
                                        <CallComponent
                                            key={call.id}
                                            call={call}
                                            goToDetail={goToDetail}
                                            archive={archiveCall}
                                        />
                                    ))}
                                </Box>
                            );
                        })
                    ) : (
                        <Spacer
                            space="s"
                            direction="vertical"
                            justifyContent="center"
                        >
                            {Array.from(Array(10)).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    height="48px"
                                    width={getCallWidth()}
                                />
                            ))}
                        </Spacer>
                    )}
                </Spacer>
            </Flex>
            <Pagination
                activePage={currentPage}
                onPageChange={changePage}
                onPageSizeChange={chagePageSize}
                pageSize={pageSize}
                recordsTotalCount={totalCount}
            />
        </Flex>
    );
};

export default Calls;
