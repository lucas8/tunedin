import React from 'react';
import { ProviderProps, useAuthState } from './AuthContext';
import * as Socket from '../services/socket';
import { Track } from '../types/types';

interface CurrentSocketState {
    track: Track | null;
    isPending: boolean;
}

const CurrentSocketContext = React.createContext<undefined | CurrentSocketState>(undefined);

export default function CurrentSocketProvider({ children }: ProviderProps) {
    const { user } = useAuthState();
    const [state, setState] = React.useState<CurrentSocketState>({
        track: null,
        isPending: true,
    });

    React.useEffect(() => {
        const socket = Socket.initSocket();

        if (user) {
            const channel = socket.channel(`user:${user!.id}`, {});
            channel
                .join()
                .receive('ok', (resp) => {
                    setState((state) => ({ ...state, isPending: false }));
                    console.log('Joined successfully', resp);
                })
                .receive('error', (resp) => {
                    console.log('Unable to join', resp);
                });

            channel.on('current_song:update', (msg) => {
                console.log(msg);
                setState((state) => ({ ...state, track: msg.track }));
            });
        }
    }, []);
    return <CurrentSocketContext.Provider value={state}>{children}</CurrentSocketContext.Provider>;
}

export const useCurrentSocketState = () => {
    return React.useContext(CurrentSocketContext)!;
};
