import React from 'react';
import GlobalStyles from '../GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import AuthProvider from '../../contexts/AuthContext';
import RecentProvider from '../../contexts/RecentContext';
import Loading from '../Loading';
import CurrentSocketProvider from '../../contexts/CurrentSocketContext';

interface ProviderProps {
    children?: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <RecentProvider>
                        <CurrentSocketProvider>
                            <Loading>{children}</Loading>
                        </CurrentSocketProvider>
                    </RecentProvider>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
