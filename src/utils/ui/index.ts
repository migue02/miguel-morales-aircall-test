import { CallType } from '../../api/types';

export const getCallBorderColor = (type: CallType) => {
    if (type === 'missed') {
        return 'red.base';
    } else if (type === 'answered') {
        return 'primary.base';
    } else {
        return 'yellow.base';
    }
};

export const getCallWidth = (offset?: number) => {
    return {
        _: `${350 + (offset || 0)}px`,
        md: `${600 + (offset || 0)}px`,
        xl: `${800 + (offset || 0)}px`,
    };
};
