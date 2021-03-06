import React from 'react';
import AuthProvider from './AuthContext';
import RecentProvider from './RecentContext';
import CurrentProvider from './CurrentContext';
import PlayerProvider from './PlayerContext';
import ChannelProvider from './ChannelContext';
import SocketProvider from './SocketContext';
import PlaybackProvider from './PlaybackContext';

export interface ProviderProps {
    children?: React.ReactNode;
}

export default function Contexts({ children }: ProviderProps) {
    return (
        <AuthProvider>
            <PlaybackProvider>
                <PlayerProvider>
                    <RecentProvider>
                        <SocketProvider>
                            <ChannelProvider>
                                <CurrentProvider>{children}</CurrentProvider>
                            </ChannelProvider>
                        </SocketProvider>
                    </RecentProvider>
                </PlayerProvider>
            </PlaybackProvider>
        </AuthProvider>
    );
}
