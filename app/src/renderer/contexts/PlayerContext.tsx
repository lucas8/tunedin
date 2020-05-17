import React from 'react';
import { ProviderProps } from './';
import CreateJoin from '../components/CreateJoin';
import { JoinActionBar } from '../components/ActionBar';
import Join from '../components/Join';

interface Page {
    name: string;
    component: JSX.Element;
    height: number;
    direction: number;
    actionBar?: JSX.Element;
}

interface PlayerState {
    view: string;
    isOpen: boolean;
    pages: Page[];
    currentPage: Page;
    setOpen: (isOpen: boolean) => void;
    setView: (view: string) => void;
}

const PlayerContext = React.createContext<PlayerState | undefined>(undefined);

const pages: Page[] = [
    {
        name: 'createjoin',
        component: <CreateJoin />,
        height: 150,
        direction: 1,
    },
    {
        name: 'join',
        component: <Join />,
        height: 300,
        direction: 1,
        actionBar: <JoinActionBar />,
    },
];

export default function PlayerProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState({
        view: 'createjoin',
        isOpen: false,
    });

    const value: PlayerState = React.useMemo(
        () => ({
            ...state,
            pages,
            currentPage: pages.filter((page) => page.name == state.view)[0],
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
