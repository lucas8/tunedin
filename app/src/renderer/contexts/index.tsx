import React from 'react';
import AuthProvider from './AuthContext';
import RecentProvider from './RecentContext';
import CurrentProvider from './CurrentContext';
import PlayerProvider from './PlayerContext';
import ChannelProvider from './ChannelContext';
import SocketProvider from './SocketContext';

export interface ProviderProps {
    children?: React.ReactNode;
}

export default function Contexts({ children }: ProviderProps) {
    return (
        <AuthProvider>
            <RecentProvider>
                <SocketProvider>
                    {/* <ChannelProvider> */}
                    <CurrentProvider>
                        <PlayerProvider>{children}</PlayerProvider>
                    </CurrentProvider>
                    {/* </ChannelProvider> */}
                </SocketProvider>
            </RecentProvider>
        </AuthProvider>
    );
}
