import {
    Button,
    Flex,
    Icon,
    Spacer,
    SpinnerOutlined,
    Typography,
} from '@aircall/tractor';
import { FC, useState } from 'react';
import { Call } from '../../api/types';
import CallIcon from '../CallIcon';
import { formatDate, formatTime } from '../../utils';

interface IProps {
    call: Call;
    goToDetail?: (id: string) => void;
    archive?: (id: string) => void;
}

const CallHeader: FC<IProps> = ({ call, goToDetail, archive }) => {
    const [loadingArchive, setLoadingArchive] = useState(false);
    const onArchive = async () => {
        if (archive) {
            setLoadingArchive(true);
            try {
                await archive(call.id);
            } finally {
                setLoadingArchive(false);
            }
        }
    };

    return (
        <Spacer space="s" direction="vertical" width="100%">
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
                    {formatDate(call.created_at)}
                </Typography>
                <Flex alignItems="center">
                    <Spacer space="xs">
                        {archive && (
                            <Button
                                size="small"
                                variant="warning"
                                mode="outline"
                                onClick={onArchive}
                                readOnly={loadingArchive}
                            >
                                {loadingArchive ? (
                                    <Icon component={SpinnerOutlined} spin />
                                ) : call.is_archived ? (
                                    'Restore'
                                ) : (
                                    'Archive'
                                )}
                            </Button>
                        )}
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
