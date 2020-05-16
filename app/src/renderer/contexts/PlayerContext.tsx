import React from 'react';
import { ProviderProps } from './';

interface PlayerState {
    view: string;
    isOpen: boolean;
    playerHeight: string;
    setOpen: (isOpen: boolean) => void;
    setView: (view: string) => void;
}

const PlayerContext = React.createContext<PlayerState | undefined>(undefined);

const getPlayerHeight = (view: string): string => {
    switch (view) {
        case 'createjoin':
            return '200px';
        case 'create':
            return '400px';
        default:
            return '200px';
    }
};
export default function PlayerProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState({
        view: 'createjoin',
        isOpen: false,
    });

    const value: PlayerState = React.useMemo(
        () => ({
            ...state,
            playerHeight: getPlayerHeight(state.view),
            setOpen: (isOpen: boolean) => {
                setState((state) => ({ ...state, isOpen }));
            },
            setView: (view: string) => {
                setState((state) => ({ ...state, view }));
            },
        }),
        [state],
    );
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayerState = () => {
    return React.useContext(PlayerContext)!;
};
