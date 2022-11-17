import {
    AnsweredOutboundFilled,
    ArchiveFilled,
    InboundOutlined,
    MissedInboundFilled,
    OutboundOutlined,
    VoicemailOutlined,
} from '@aircall/tractor';
import { FC } from 'react';
import { CallDirection, CallType } from '../../api/types';

interface ICallIcon {
    icon: CallType | CallDirection | 'archive';
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
    ) : icon === 'outbound' ? (
        <OutboundOutlined />
    ) : (
        <ArchiveFilled />
    );
};

export default CallIcon;
