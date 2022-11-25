import Pusher from 'pusher-js';
import { APP_AUTH_ENDPOINT, APP_CLUSTER, APP_KEY } from '../constants';

let pusher: Pusher;
let accessToken: string | null | undefined;

export const getPusher = (token?: string | null) => {
    if (!pusher || token !== accessToken) {
        pusher = new Pusher(APP_KEY, {
            cluster: APP_CLUSTER,
            channelAuthorization: {
                transport: 'ajax',
                endpoint: APP_AUTH_ENDPOINT,
                headers: { Authorization: `Bearer ${token}` },
            },
        });
    }

    accessToken = token;
    return pusher;
};
