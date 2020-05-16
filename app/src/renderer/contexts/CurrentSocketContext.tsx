import React from 'react';
import { ProviderProps, useAuthState } from './AuthContext';
import { Track } from '../types/types';
import { Socket } from 'phoenix';
import { getUserToken } from '../utils/localStorage';
import styledLog from '../utils/styled-log';

interface CurrentSocketState {
    track: Track | null;
    isPending: boolean;
    isTrackPlaying: boolean | null;
}

// TODO: Fix spotify not playing -> playing bug
const CurrentSocketContext = React.createContext<undefined | CurrentSocketState>(undefined);

export default function CurrentSocketProvider({ children }: ProviderProps) {
    const { user } = useAuthState();
    const [state, setState] = React.useState<CurrentSocketState>({
        track: null,
        isPending: true,
        isTrackPlaying: null,
    });

    React.useEffect(() => {
        if (user) {
            const socket = new Socket('ws://localhost:4000/socket', { params: { token: getUserToken() } });
            socket.connect();
            const channel = socket.channel(`user:${user!.id}`, {});
            channel
                .join()
                .receive('ok', ({ success }) => {
                    if (success) {
                        setState((state) => ({ ...state, isPending: false }));
                        styledLog('WS Connected', true);
                    }
                })
                .receive('error', () => {
                    styledLog('Unable to join WS', false);
                });

            channel.on('current_song:update', (msg) => {
                if (msg.success) {
                    setState((state) => ({ ...state, track: msg.track, isTrackPlaying: true }));
                } else {
                    setState((state) => ({ ...state, isTrackPlaying: false }));
                }
            });
        }
    }, []);
    return <CurrentSocketContext.Provider value={state}>{children}</CurrentSocketContext.Provider>;
}

export const useCurrentSocketState = () => {
    return React.useContext(CurrentSocketContext)!;
};
