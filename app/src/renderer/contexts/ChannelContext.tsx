import React from 'react';
import { ProviderProps } from '.';
import { ReducerAction, User } from '../types/types';
import { useChannel } from './SocketContext';
import { usePlayerState } from './PlayerContext';
import { Presence } from 'phoenix';

interface State {
    owner: User | null;
    error: null | Error;
    isConnected: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    presenceData: any;
}

interface ChannelState extends State {
    joinChannel: (invite: string) => void;
}

const initialState: State = {
    error: null,
    isConnected: false,
    presenceData: {},
    owner: null,
};

const eventReducer = (state: State, { event, payload }: ReducerAction) => {
    switch (event) {
        case 'phx_reply':
            if (payload.status == 'error') {
                return { ...state, error: new Error(payload.response.reason) };
            } else if (payload.status == 'ok') {
                return { ...state, isConnected: payload.response.success, owner: payload.response.owner };
            }
        case 'presence_state':
            return { ...state, presenceData: Presence.syncState(state.presenceData, payload) };
        case 'presence_diff':
            return { ...state, presenceData: Presence.syncDiff(state.presenceData, payload) };
        default:
            return state;
    }
};

const ChannelContext = React.createContext<undefined | ChannelState>(undefined);

export default function ChannelProvider({ children }: ProviderProps) {
    const { setView } = usePlayerState();

    const { state, join } = useChannel<State>(eventReducer, initialState, { leaveOnError: true });

    React.useEffect(() => {
        if (state.isConnected) {
            setView('channel');
        }
    }, [state.isConnected]);

    const value: ChannelState = React.useMemo(
        () => ({
            ...state,
            joinChannel: (invite: string) => {
                join(`channel:${invite}`);
            },
        }),
        [state],
    );

    return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
}

export const useChannelState = () => {
    return React.useContext(ChannelContext)!;
};
