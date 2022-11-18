import { format, intervalToDuration, isToday, isYesterday } from "date-fns";
import { CallType } from "../api/types";

export const formatTime = (timeInSeconds: number) => {
    const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ start: 0, end: timeInSeconds * 1000 })

    return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''} ${seconds > 0 ? seconds + 's' : ''}`;
}

export const formatDate = (date: string) => {
    const dateAsDate = new Date(date);

    return isToday(dateAsDate) ? 'Today' : isYesterday(dateAsDate) ? 'Yesterday' : format(dateAsDate, 'dd-HH-yy');
}

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