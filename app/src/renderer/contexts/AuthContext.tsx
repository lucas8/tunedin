import React from 'react';
import { ipcRenderer } from 'electron';
import { User, APIResponse } from '../types/types';
import Login from '../pages/Login';
import { setUserToken } from '../utils/localStorage';
import { baseUrl } from '../utils/config';
import useSWR from 'swr';
import { fetchWithAuth } from '../utils/fetcher';
import { ProviderProps } from './';

interface AuthState {
    isAuthed: boolean;
    user: User | undefined;
    error: Error | null;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: ProviderProps) {
    const { data, error, mutate } = useSWR<APIResponse<User>>(`${baseUrl}/api/users/me`, fetchWithAuth(), {
        shouldRetryOnError: false,
    });

    // ipcRenderer isn't always present when testing in an enviorment such as the reactdom while testing
    if (ipcRenderer) {
        ipcRenderer.on('login-reply-token', async (_, token) => {
            await setUserToken(token);
            mutate();
        });
    }

    const state = React.useMemo(
        () => ({
            isAuthed: !!(data?.success && data?.message && !error),
            user: data?.message,
            error: error || null,
        }),
        [data, error],
    );

    return (
        <AuthContext.Provider value={state}>
            {state.isAuthed ? children : error ? <Login /> : null}
        </AuthContext.Provider>
    );
}

export function useAuthState() {
    const getAccessToken = localStorage.getItem('tunedin_token');
    const state = React.useContext(AuthContext)!;
    const isAuthenticated = state.user && state.isAuthed;

    return {
        ...state,
        user: state.user!,
        getAccessToken,
        isAuthenticated,
    };
}
