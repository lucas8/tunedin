import React from 'react';
import { ProviderProps } from '.';
import { useAuthState } from './AuthContext';
import { Track, ReducerAction } from '../types/types';
import { useChannel } from './SocketContext';

interface CurrentSocketState {
    track: Track | null;
    isTrackPlaying: boolean | null;
    isPending: boolean;
}

const CurrentSocketContext = React.createContext<undefined | CurrentSocketState>(undefined);

const eventReducer = (state: CurrentSocketState, { event, payload }: ReducerAction) => {
    switch (event) {
        case 'phx_reply':
            return { ...state, isPending: false };
        case 'current_song:update':
            if (payload.success) {
                return { ...state, track: payload.track, isTrackPlaying: true };
            } else {
                return { ...state, isTrackPlaying: false };
            }
        default:
            return state;
    }
};

export default function CurrentSocketProvider({ children }: ProviderProps) {
    const initialState: CurrentSocketState = {
        track: null,
        isTrackPlaying: null,
        isPending: true,
    };
    const { user } = useAuthState();
    const { state, join } = useChannel<CurrentSocketState>(eventReducer, initialState);

    React.useEffect(() => {
        join(`user:${user.id}`);
    }, []);

    return <CurrentSocketContext.Provider value={state}>{children}</CurrentSocketContext.Provider>;
}

export const useCurrentSocketState = () => {
    return React.useContext(CurrentSocketContext)!;
};
