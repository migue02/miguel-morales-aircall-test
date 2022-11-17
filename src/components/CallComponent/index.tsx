import { Button, Flex, Spacer, Typography } from '@aircall/tractor';
import { FC } from 'react';
import { Call, CallType } from '../../api/types';
import { formatRelative } from 'date-fns';
import CallIcon from '../CallIcon';
import { formatTime } from '../../utils';

interface IProps {
    call: Call;
}

const CallComponent: FC<IProps> = ({ call }) => {
    const getBorderColor = (type: CallType) => {
        if (type === 'missed') {
            return 'red.base';
        } else if (type === 'answered') {
            return 'primary.base';
        } else {
            return 'yellow.base';
        }
    };

    const getBGColor = (type: CallType) => {
        if (type === 'missed') {
            return 'red.lighter';
        } else if (type === 'answered') {
            return 'primary.lighter';
        } else {
            return 'yellow.lighter';
        }
    };

    const getWidth = () => {
        return {
            _: '400px',
            md: '600px',
            xl: '800px',
        };
    };

    return (
        <Flex
            px="32px"
            py="16px"
            borderLeftWidth="5px"
            borderLeftStyle="solid"
            width={getWidth()}
            borderColor={getBorderColor(call.call_type)}
        >
            <Spacer space="s" direction="vertical" width={getWidth()}>
                <Flex>
                    <Spacer space="xs">
                        <CallIcon icon={call.call_type} />
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
                            >
                                Archive
                            </Button>
                            <Button size="small">Detail</Button>
                        </Spacer>
                    </Flex>
                </Flex>
            </Spacer>
        </Flex>
    );
};

export default CallComponent;
