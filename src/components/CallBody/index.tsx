import { Divider, Flex, Spacer, Typography } from '@aircall/tractor';
import { FC } from 'react';
import { Call } from '../../api/types';
import CallNotes from '../CallNotes';

interface IProps {
    call: Call;
}

const CallBody: FC<IProps> = ({ call }) => {
    return (
        <Spacer space="s" direction="vertical" width="100%">
            <Flex>
                <Spacer space="xs" direction="vertical" width="100%">
                    {call.direction === 'outbound' && (
                        <Flex>
                            <Typography variant="body" flexGrow="1">
                                Call done from
                            </Typography>
                            <Typography variant="body2">{call.from}</Typography>
                        </Flex>
                    )}
                    <Flex>
                        <Typography variant="body" flexGrow="1">
                            Call done via
                        </Typography>
                        <Typography variant="body2">{call.via}</Typography>
                    </Flex>
                    {call.direction === 'inbound' && (
                        <Flex>
                            <Typography variant="body" flexGrow="1">
                                Call done to
                            </Typography>
                            <Typography variant="body2">{call.to}</Typography>
                        </Flex>
                    )}
                </Spacer>
            </Flex>
            {call.notes.length > 0 && (
                <Spacer space="s" width="100%" direction="vertical">
                    <Divider orientation="horizontal" />
                    <CallNotes notes={call.notes} />
                </Spacer>
            )}
        </Spacer>
    );
};

export default CallBody;
