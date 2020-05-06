import React from 'react';
import { APIResponse, Track } from '../types/types';
import fetch from 'unfetch';
import { ProviderProps } from './AuthContext';

interface RecentTracksState {
    isLoading: boolean;
    tracks: { track: Track }[] | null;
    error: Error | null;
}

// TODO: Type track
const getRecentTracks = async (): Promise<APIResponse<{ track: Track }[]>> => {
    const token = localStorage.getItem('tunedin_token');

    if (token) {
        const req = await fetch('http://localhost:4000/api/music/recent', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        const response = req.json();

        if (req.ok && req.status == 200) {
            return response;
        } else if (req.status == 401) {
            throw new Error('Unauthorized');
        } else {
            throw new Error('Unhandled error');
        }
    } else {
        throw new Error('Unauthorized');
    }
};

const RecentContext = React.createContext<RecentTracksState | undefined>(undefined);

export default function RecentProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState<RecentTracksState>({
        isLoading: false,
        tracks: null,
        error: new Error('Unhandled error'),
    });

    React.useEffect(() => {
        getRecentTracks().then(
            ({ message }) => setState({ tracks: message, isLoading: false, error: null }),
            (error) => setState({ tracks: null, isLoading: false, error }),
        );
    }, []);

    return <RecentContext.Provider value={state}>{children}</RecentContext.Provider>;
}

export const useRecentState = () => {
    return React.useContext(RecentContext)!;
};
