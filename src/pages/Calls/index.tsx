import {
    Box,
    Divider,
    Flex,
    Pagination,
    Skeleton,
    Spacer,
    Typography,
} from '@aircall/tractor';
import { useMemo } from 'react';
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

    const orderedCalls = useMemo(() => {
        if (calls) {
            return Object.keys(calls).sort(
                (a, b) => new Date(b).getTime() - new Date(a).getTime()
            );
        }
    }, [calls]);

    const navigate = useNavigate();

    const goToDetail = (id: string) => {
        navigate(`/${id}`);
    };

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
                    {!loadingCalls && orderedCalls ? (
                        orderedCalls.map((date) => {
                            return (
                                <Box key={date}>
                                    <Typography variant="heading">
                                        {formatDate(date)}
                                    </Typography>
                                    <Box width="100%" pr={3} mt={10}>
                                        <Divider orientation="horizontal" />
                                    </Box>
                                    {calls[date].map((call) => (
                                        <Box key={call.id} mr={3}>
                                            <CallComponent
                                                call={call}
                                                goToDetail={goToDetail}
                                                archive={archiveCall}
                                            />
                                        </Box>
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
