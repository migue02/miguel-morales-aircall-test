import { Button, Flex, Spacer, Typography } from '@aircall/tractor';
import { FC } from 'react';
import { Call } from '../../api/types';
import { formatRelative } from 'date-fns';
import CallIcon from '../CallIcon';
import { formatTime } from '../../utils';

interface IProps {
    call: Call;
    width: {
        _: string;
        md: string;
        xl: string;
    };
    goToDetail?: (id: string) => void;
    archive: (id: string) => void;
}

const CallHeader: FC<IProps> = ({ call, goToDetail, archive, width }) => {
    return (
        <Spacer space="s" direction="vertical" width={width}>
            <Flex>
                <Spacer space="xs">
                    <CallIcon
                        icon={call.is_archived ? 'archive' : call.call_type}
                    />
                    <Typography variant="heading">
                        {call.direction === 'inbound' ? call.from : call.to}
                    </Typography>
                </Spacer>
                <Spacer space="xs" fluid justifyContent="flex-end">
                    <Typography ml="auto">
                        {formatTime(call.duration)}
                    </Typography>
                </Spacer>
            </Flex>
            <Flex alignItems="center" justifyContent="flex-end">
                <Typography variant="body2" flexGrow="1">
                    {formatRelative(new Date(call.created_at), new Date())}
                </Typography>
                <Flex alignItems="center">
                    <Spacer space="xs">
                        <Button
                            size="small"
                            variant="warning"
                            mode="outline"
                            onClick={() => archive(call.id)}
                        >
                            {call.is_archived ? 'Restore' : 'Archive'}
                        </Button>
                        {goToDetail && (
                            <Button
                                size="small"
                                onClick={() => goToDetail(call.id)}
                            >
                                Detail
                            </Button>
                        )}
                    </Spacer>
                </Flex>
            </Flex>
        </Spacer>
    );
};

export default CallHeader;
