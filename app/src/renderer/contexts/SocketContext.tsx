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

const mustJoinChannelWarning = () => (_eventName: string, _payload: object) =>
    console.error(`useChannel broadcast function cannot be invoked before the channel has been joined`);

function joinChannel(
    socket: Socket,
    topic: string,
    dispatch: React.Dispatch<ReducerAction>,
    setBroadcast: React.Dispatch<React.SetStateAction<(eventName: string, payload: object) => void>>,
    leaveOnError = false,
) {
    const channel = socket.channel(topic, { client: 'browser' });

    channel.onMessage = (event, payload) => {
        if (event != null && !event.startsWith('chan_reply_')) {
            dispatch({ event, payload });
        }
        return payload;
    };

    channel
        .join()
        .receive('ok', () => styledLog(`Successfully Joined Channel: ${topic.split(':')[0]}`, true))
        .receive('error', () => {
            if (leaveOnError) {
                channel.leave();
            }
            styledLog(`Failed to Join Channel: ${topic.split(':')[0]}`, false);
        });

    setBroadcast(() => (eventName: string, payload: object) => channel.push(eventName, payload));

    return () => {
        channel.leave();
    };
}

interface ChannelOptions {
    leaveOnError?: boolean;
}

export function useChannel<T>(
    reducer: (state: T, action: ReducerAction) => T,
    initialState: T,
    options?: ChannelOptions,
) {
    const socket = React.useContext(SocketContext)!;
    const [state, dispatch] = React.useReducer<React.Reducer<T, ReducerAction>>(reducer, initialState);
    const [broadcast, setBroadcast] = React.useState(mustJoinChannelWarning);

    return {
        state,
        broadcast,
        join: (topic: string) => joinChannel(socket, topic, dispatch, setBroadcast, options?.leaveOnError),
    };
}
