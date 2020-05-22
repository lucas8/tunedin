/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { ProviderProps } from '.';
import { APIResponse } from '../types/types';
import useSWR from 'swr';
import { baseUrl } from '../utils/config';
import { fetchWithAuth } from '../utils/fetcher';

interface PlaybackState {
    player: null | Spotify.SpotifyPlayer;
    deviceId: string;
}

const PlaybackContext = React.createContext<undefined | PlaybackState>(undefined);

export default function PlaybackProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState<PlaybackState>({
        player: null,
        deviceId: '',
    });
    const { data, error } = useSWR<APIResponse<string>>(`${baseUrl}/api/users/token`, fetchWithAuth(), {
        shouldRetryOnError: false,
    });

    // TODO: Error handling + spotify premium guard
    React.useEffect(() => {
        if (window.Spotify !== null && data && !error) {
            const player = new window.Spotify.Player({
                name: 'Tunedin Spotify Player',
                getOAuthToken: (cb) => cb(data.message),
            });

            player.addListener('initialization_error', (e) => {
                console.error(e);
            });
            player.addListener('authentication_error', (e) => {
                console.error(e);
            });
            player.addListener('account_error', (e) => {
                console.error(e);
            });
            player.addListener('playback_error', (e) => {
                console.error(e);
            });

            // Playback status updates
            player.addListener('player_state_changed', (state) => {
                console.log(state);
            });

            player.addListener('ready', ({ device_id }) => {
                console.log(device_id);
                setState((state) => ({ ...state, deviceId: device_id }));
            });

            player.connect();
            setState((state) => ({ ...state, player }));
        }
    }, [data]);

    return <PlaybackContext.Provider value={state}>{children}</PlaybackContext.Provider>;
}

export const usePlaybackState = () => {
    return React.useContext(PlaybackContext)!;
};
