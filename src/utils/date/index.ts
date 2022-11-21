import { format, intervalToDuration, isToday, isYesterday } from 'date-fns';

export const formatSecondsInTime = (timeInSeconds: number) => {
    const {
        hours = 0,
        minutes = 0,
        seconds = 0,
    } = intervalToDuration({ start: 0, end: timeInSeconds * 1000 });

    return `${hours > 0 ? hours + 'h' : ''} ${
        minutes > 0 ? minutes + 'm' : ''
    } ${seconds > 0 ? seconds + 's' : ''}`;
};

export const formatTime = (date: string) => {
    const dateAsDate = new Date(date);

    return format(dateAsDate, 'p');
};

export const formatDate = (date: string) => {
    const dateAsDate = new Date(date);

    return isToday(dateAsDate)
        ? 'Today'
        : isYesterday(dateAsDate)
        ? 'Yesterday'
        : format(dateAsDate, 'MMMM, EEE do yyyy');
};
