import { Button, Divider, Flex, Skeleton, Spacer } from '@aircall/tractor';
import { FC } from 'react';
import { getCallBorderColor, getCallWidth } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import CallHeader from '../../components/CallHeader';
import CallNotes from '../../components/CallNotes';
import useCall from '../../hooks/useCall';

interface ICallDetail {
    id?: string;
}

const CallDetail: FC<ICallDetail> = ({ id }) => {
    const navigate = useNavigate();
    const [call] = useCall(id);

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
                <CallHeader call={call} width={getCallWidth(-64)} />
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
