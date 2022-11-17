import { FC, useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { createCtx } from '..';
import { IRealTimeProvider, RealTimeType } from './types';
import { CHANNEL, UPDATE_CALL_EVENT } from '../../services/constants';
import { useUserContext } from '../UserContext';
import { getPusher } from '../../services/Pusher';
import { getAccessToken } from '../../storage';

export const [useRealTimeContext, RealTimeContext] = createCtx<RealTimeType>();

export const RealTimeProvider: FC<IRealTimeProvider> = ({ children }) => {
    const { loggedIn } = useUserContext();

    useEffect(() => {
        if (loggedIn) {
            const channel = getPusher(getAccessToken()).subscribe(CHANNEL);
            channel.bind(UPDATE_CALL_EVENT, (data: Record<string, string>) => {
                // console.log('data', data);
            });
            return () => getPusher().unsubscribe(CHANNEL);
        }
    }, [loggedIn]);

    return (
        <RealTimeContext.Provider value={{}}>
            {children}
        </RealTimeContext.Provider>
    );
};
