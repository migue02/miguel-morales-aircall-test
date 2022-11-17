import { Button, Divider, Flex, Skeleton, Spacer } from '@aircall/tractor';
import { FC, useEffect, useState } from 'react';
import { Call } from '../../api/types';
import { getCallBorderColor, getCallWidth } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { ERROR_NOT_LOGGED_CODE } from '../../api/constants';
import CallHeader from '../../components/CallHeader';
import CallNotes from '../../components/CallNotes';
import { useCallsContext } from '../../contexts/CallsContext';

interface ICallDetail {
    id?: string;
}

const CallDetail: FC<ICallDetail> = ({ id }) => {
    const [call, setCall] = useState<Call>();
    const navigate = useNavigate();
    const { archiveCall, getCall } = useCallsContext();

    useEffect(() => {
        if (id) {
            const fetchCall = async () => {
                try {
                    const call = await getCall(id);
                    setCall(call);
                } catch (error: unknown) {
                    if (
                        error instanceof Error &&
                        error?.cause === ERROR_NOT_LOGGED_CODE
                    )
                        navigate('/login');
                }
            };
            void fetchCall();
        }
    }, [id, navigate, getCall]);

    const getHeight = () => 600;

    const goBack = () => {
        navigate(-1);
    };

    return !call ? (
        <Skeleton
            width={getCallWidth()}
            height={getHeight()}
            animation="shimmer"
        />
    ) : (
        <Flex
            px="32px"
            py="16px"
            width={getCallWidth()}
            height={getHeight()}
            flexDirection="column"
            borderColor={getCallBorderColor(call.call_type)}
        >
            <Spacer space="s" direction="vertical">
                <Button mode="link" onClick={() => goBack()}>
                    Go Back
                </Button>
                <CallHeader
                    call={call}
                    width={getCallWidth(-64)}
                    archive={archiveCall}
                />
                {call.notes.length > 0 && (
                    <Spacer space="s" width="100%" direction="vertical">
                        <Divider orientation="horizontal" />
                        <CallNotes notes={call.notes} />
                    </Spacer>
                )}
            </Spacer>
        </Flex>
    );
};

const WrappedCallDetail = () => {
    const { id } = useParams<{ id: string }>();
    return <CallDetail id={id} />;
};

export default WrappedCallDetail;
