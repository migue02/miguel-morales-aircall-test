import {
    Flex,
    Pagination,
    Skeleton,
    Spacer,
    Typography,
} from '@aircall/tractor';
import { useNavigate } from 'react-router-dom';
import CallComponent from '../../components/CallComponent';
import { useCallsContext } from '../../contexts/CallsContext';
import { getCallWidth } from '../../utils';

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
                    {!loadingCalls ? (
                        calls.map((call, idx) => (
                            <CallComponent
                                key={idx}
                                call={call}
                                goToDetail={goToDetail}
                                archive={archiveCall}
                            />
                        ))
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
