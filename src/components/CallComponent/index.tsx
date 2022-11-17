import { Flex } from '@aircall/tractor';
import { FC } from 'react';
import { Call } from '../../api/types';
import { getCallBorderColor, getCallWidth } from '../../utils';
import CallHeader from '../CallHeader';

interface IProps {
    call: Call;
    goToDetail: (id: string) => void;
    archive: (id: string) => void;
}

const CallComponent: FC<IProps> = ({ call, goToDetail, archive }) => {
    return (
        <Flex
            px="32px"
            py="16px"
            borderLeftWidth="5px"
            borderLeftStyle="solid"
            width={getCallWidth()}
            bg={call.is_archived ? 'grey.light' : 'white'}
            borderColor={getCallBorderColor(call.call_type)}
        >
            <CallHeader
                call={call}
                width={getCallWidth()}
                goToDetail={goToDetail}
                archive={archive}
            />
        </Flex>
    );
};

export default CallComponent;
