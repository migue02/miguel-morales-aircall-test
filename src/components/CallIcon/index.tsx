import {
    AnsweredOutboundFilled,
    InboundOutlined,
    MissedInboundFilled,
    OutboundOutlined,
    VoicemailOutlined,
} from '@aircall/tractor';
import { FC } from 'react';
import { CallDirection, CallType } from '../../api/types';

interface ICallIcon {
    icon: CallType | CallDirection;
}

const CallIcon: FC<ICallIcon> = ({ icon }) => {
    return icon === 'answered' ? (
        <AnsweredOutboundFilled />
    ) : icon === 'missed' ? (
        <MissedInboundFilled />
    ) : icon === 'voicemail' ? (
        <VoicemailOutlined />
    ) : icon === 'inbound' ? (
        <InboundOutlined />
    ) : (
        <OutboundOutlined />
    );
};

export default CallIcon;
