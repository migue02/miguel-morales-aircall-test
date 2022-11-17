import { intervalToDuration } from "date-fns";

export const formatTime = (timeInSeconds: number) => {
    const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ start: 0, end: timeInSeconds * 1000 })

    return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''} ${seconds > 0 ? seconds + 's' : ''}`;
}