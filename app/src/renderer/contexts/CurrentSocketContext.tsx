import React from 'react';
import { ProviderProps, useAuthState } from './AuthContext';
import * as Socket from '../services/socket';

const CurrentSocketContext = React.createContext<undefined | string>(undefined);

export default function CurrentSocketProvider({ children }: ProviderProps) {
    const { user } = useAuthState();
    React.useEffect(() => {
        const socket = Socket.initSocket();

        // We know user exists because this wouldn't be rendered because it is
        // lower in the tree
        const channel = socket.channel(`user:${user!.id}`, {});
        channel
            .join()
            .receive('ok', (resp) => {
                console.log('Joined successfully', resp);
            })
            .receive('error', (resp) => {
                console.log('Unable to join', resp);
            });

        channel.on(`current_song:update`, (msg) => {
            console.log(msg);
        });
    }, []);
    return <CurrentSocketContext.Provider value={'hi'}>{children}</CurrentSocketContext.Provider>;
}
