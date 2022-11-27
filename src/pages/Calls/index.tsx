import {
    Box,
    Divider,
    Dropdown,
    DropdownButton,
    Flex,
    Menu,
    MenuItem,
    Pagination,
    PreferencesOutlined,
    Skeleton,
    Spacer,
    Typography,
} from '@aircall/tractor';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CallType } from '../../api/types';
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
        setFilter,
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

    const filterCalls = (type?: CallType) => {
        setFilter(type);
    };

    return (
        <Flex height="90%" flexDirection="column" mt="40px">
            <Flex justifyContent="space-between">
                <Typography variant="displayL">Calls</Typography>
                <Dropdown
                    trigger={
                        <DropdownButton
                            mode="link"
                            variant="primary"
                            iconClose={<PreferencesOutlined />}
                        >
                            Filter
                        </DropdownButton>
                    }
                    position="bottom"
                    anchor="end"
                >
                    <Menu>
                        <MenuItem onClick={() => filterCalls('missed')}>
                            Missed
                        </MenuItem>
                        <MenuItem onClick={() => filterCalls('answered')}>
                            Answered
                        </MenuItem>
                        <MenuItem onClick={() => filterCalls('voicemail')}>
                            Voicemail
                        </MenuItem>
                        <MenuItem onClick={() => filterCalls()}>All</MenuItem>
                    </Menu>
                </Dropdown>
            </Flex>
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
