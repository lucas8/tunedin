import React from 'react';
import GlobalStyles from '../GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import Loading from '../Loading';
import Contexts from '../../contexts';

interface ProviderProps {
    children?: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <Contexts>
                    <Loading>{children}</Loading>
                </Contexts>
            </ThemeProvider>
        </>
    );
}
