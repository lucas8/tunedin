import React from 'react';
import { ProviderProps } from './';
import { Socket } from 'phoenix';
import { getUserToken } from '../utils/localStorage';
import styledLog from '../utils/styled-log';
import { ReducerAction } from '../types/types';

const SocketContext = React.createContext<Socket | undefined>(undefined);

export default function SocketProvider({ children }: ProviderProps) {
    const socket = new Socket('ws://localhost:4000/socket', { params: { token: getUserToken() } });

    React.useEffect(() => socket.connect(), []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

const mustJoinChannelWarning = () => () =>
    console.error(`useChannel broadcast function cannot be invoked before the channel has been joined`);

function joinChannel(
    socket: Socket,
    topic: string,
    dispatch: React.Dispatch<ReducerAction>,
    setBroadcast: React.Dispatch<React.SetStateAction<() => void>>,
) {
    const channel = socket.channel(topic, {});

    channel.onMessage = (event, payload) => {
        dispatch({ event, payload });
        return payload;
    };

    channel
        .join()
        .receive('ok', () => styledLog(`Successfully Joined Channel: ${topic.split(':')[0]}`, true))
        .receive('error', () => styledLog(`Failed to Join Channel: ${topic.split(':')[0]}`, false));

    setBroadcast(() => channel.push.bind(channel));

    return () => {
        channel.leave();
    };
}

export function useChannel<T>(
    reducer: (state: T, action: ReducerAction) => T,
    initialState: T,
): { state: T; broadcast: () => void; join: (topic: string) => void } {
    const socket = React.useContext(SocketContext)!;
    const [state, dispatch] = React.useReducer<React.Reducer<T, ReducerAction>>(reducer, initialState);
    const [broadcast, setBroadcast] = React.useState(mustJoinChannelWarning);

    return {
        state,
        broadcast,
        join: (topic: string) => joinChannel(socket, topic, dispatch, setBroadcast),
    };
}
