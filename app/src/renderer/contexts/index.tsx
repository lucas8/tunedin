import React from 'react';
import AuthProvider from './AuthContext';
import RecentProvider from './RecentContext';
import CurrentSocketProvider from './CurrentSocketContext';
import PlayerProvider from './PlayerContext';

export interface ProviderProps {
    children?: React.ReactNode;
}

export default function Contexts({ children }: ProviderProps) {
    return (
        <AuthProvider>
            <RecentProvider>
                <CurrentSocketProvider>
                    <PlayerProvider>{children}</PlayerProvider>
                </CurrentSocketProvider>
            </RecentProvider>
        </AuthProvider>
    );
}
