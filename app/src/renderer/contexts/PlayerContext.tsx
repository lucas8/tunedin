import React from 'react';
import { ProviderProps } from './';

interface PlayerState {
    view: string;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const PlayerContext = React.createContext<PlayerState | undefined>(undefined);

export default function PlayerProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState({
        view: 'createjoin',
        isOpen: false,
    });

    const value: PlayerState = React.useMemo(
        () => ({
            ...state,
            setOpen: (isOpen: boolean) => {
                setState((state) => ({ ...state, isOpen: isOpen }));
            },
        }),
        [state],
    );
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayerState = () => {
    return React.useContext(PlayerContext)!;
};
