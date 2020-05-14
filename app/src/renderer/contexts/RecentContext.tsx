import React from 'react';
import { APIResponse, Track } from '../types/types';
import { ProviderProps } from './AuthContext';
import { getUserToken } from '../utils/localStorage';
import useSWR from 'swr';
import fetch from '../utils/fetcher';

interface RecentTracksState {
    tracks: { track: Track }[] | undefined;
    error: Error | null;
}

const RecentContext = React.createContext<RecentTracksState | undefined>(undefined);

export default function RecentProvider({ children }: ProviderProps) {
    const { data, error } = useSWR<APIResponse<{ track: Track }[]>>('http://localhost:4000/api/music/recent', (url) =>
        fetch(url, {
            headers: {
                Authorization: `Bearer ${getUserToken()}`,
                'Content-type': 'application/json',
            },
        }),
    );

    const state = React.useMemo(
        () => ({
            tracks: data?.message,
            error: error,
        }),
        [data, error],
    );

    return <RecentContext.Provider value={state}>{children}</RecentContext.Provider>;
}

export const useRecentState = () => {
    return React.useContext(RecentContext)!;
};
