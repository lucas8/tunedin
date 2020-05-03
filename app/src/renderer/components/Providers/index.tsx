import React from 'react';
import GlobalStyles from '../GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

interface ProviderProps {
    children?: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
