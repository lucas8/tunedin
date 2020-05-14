import React from 'react';
import { ProviderProps } from './AuthContext';
import * as Socket from '../services/socket';

const CurrentSocketContext = React.createContext<undefined | string>(undefined);

export default function CurrentSocketProvider({ children }: ProviderProps) {
    React.useEffect(() => {
        Socket.initSocket();
    }, []);
    return <CurrentSocketContext.Provider value={'hi'}>{children}</CurrentSocketContext.Provider>;
}
