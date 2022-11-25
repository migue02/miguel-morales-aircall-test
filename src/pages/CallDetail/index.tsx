import { Button, Flex, Skeleton, Spacer } from '@aircall/tractor';
import { FC } from 'react';
import { getCallBorderColor, getCallWidth } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import CallHeader from '../../components/CallHeader';
import useCall from '../../hooks/useCall';
import CallBody from '../../components/CallBody';

interface ICallDetail {
    id?: string;
}

const CallDetail: FC<ICallDetail> = ({ id = '' }) => {
    const navigate = useNavigate();
    const [call, addNote] = useCall(id);

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
            <Spacer space="s" direction="vertical" width="100%">
                <Button mode="link" onClick={() => goBack()}>
                    {`< Back`}
                </Button>
                <CallHeader call={call} />
                <CallBody call={call} onAddNote={addNote} />
            </Spacer>
        </Flex>
    );
};

const WrappedCallDetail = () => {
    const { id } = useParams<{ id: string }>();
    return <CallDetail id={id} />;
};

export default WrappedCallDetail;
