import React from 'react';
import { APIResponse, Track } from '../types/types';
import useSWR from 'swr';
import { fetchWithAuth } from '../utils/fetcher';
import { ProviderProps } from './';
import { baseUrl } from '../utils/config';

interface RecentTracksState {
    tracks: { track: Track }[] | undefined;
    error: Error | null;
}

const RecentContext = React.createContext<RecentTracksState | undefined>(undefined);

export default function RecentProvider({ children }: ProviderProps) {
    const { data, error } = useSWR<APIResponse<{ track: Track }[]>>(`${baseUrl}/api/music/recent`, fetchWithAuth(), {
        errorRetryCount: 1,
    });

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
