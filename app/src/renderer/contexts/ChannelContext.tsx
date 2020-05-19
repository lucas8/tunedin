import React from 'react';
import { ProviderProps } from '.';
import { ReducerAction } from '../types/types';
import { useChannel } from './SocketContext';

interface State {
    test: string;
}

interface ChannelState extends State {
    joinChannel: (invite: string) => void;
}

const ChannelContext = React.createContext<undefined | ChannelState>(undefined);

const eventReducer = (state: State, { event, payload }: ReducerAction) => {
    switch (event) {
        case 'testing':
            return { ...state, test: 'hello world' };
        default:
            return state;
    }
};

export default function ChannelProvider({ children }: ProviderProps) {
    const initialState: State = {
        test: 'test',
    };
    const { state, join } = useChannel<State>(eventReducer, initialState);

    const value: ChannelState = {
        ...state,
        joinChannel: (invite: string) => {
            join(`channel:${invite}`);
        },
    };

    return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
}

export const useChannelState = () => {
    return React.useContext(ChannelContext)!;
};
