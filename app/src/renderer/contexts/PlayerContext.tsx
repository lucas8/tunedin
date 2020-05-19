import React from 'react';
import { ProviderProps } from './';
import CreateJoin from '../components/CreateJoin';
import Join from '../components/Join';

interface Page {
    name: string;
    component: JSX.Element;
    height: number | string;
    actionBar?: JSX.Element;
}

interface PlayerState {
    view: string;
    isOpen: boolean;
    pages: Page[];
    currentPage: Page;
    direction: string;
    setOpen: (isOpen: boolean) => void;
    setView: (view: string) => void;
    setDirection: (direction: string) => void;
    movePage: (direction: string, view: string) => void;
}

const PlayerContext = React.createContext<PlayerState | undefined>(undefined);

const pages: Page[] = [
    {
        name: 'createjoin',
        component: <CreateJoin />,
        height: 150,
    },
    {
        name: 'join',
        component: <Join />,
        height: 200,
    },
    {
        name: 'channel',
        component: <div style={{ background: 'red' }}>hey</div>,
        height: '100%',
    },
];

export default function PlayerProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState({
        view: 'createjoin',
        isOpen: false,
        direction: 'right',
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
            setDirection: (direction: string) => {
                setState((state) => ({ ...state, direction }));
            },
            movePage: (direction: string, view: string) => {
                setState((state) => ({ ...state, direction, view }));
            },
        }),
        [state],
    );
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayerState = () => {
    return React.useContext(PlayerContext)!;
};
