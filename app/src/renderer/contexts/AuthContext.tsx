import React from 'react';
import { User, APIResponse } from '../types/types';
import Login from '../pages/Login';
import { getUserToken, setUserToken } from '../utils/localStorage';
import { baseUrl } from '../utils/config';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { ipcRenderer } from 'electron';

interface AuthState {
    isAuthed: boolean;
    user: User | undefined;
    error: Error | null;
}

export interface ProviderProps {
    children?: React.ReactNode;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: ProviderProps) {
    const { data, error, mutate } = useSWR<APIResponse<User>>(
        `${baseUrl}/api/users/me`,
        (url) =>
            fetcher(url, {
                headers: {
                    Authorization: `Bearer ${getUserToken()}`,
                    'Content-type': 'application/json',
                },
            }),
        {
            shouldRetryOnError: false,
        },
    );

    // const [state, setState] = React.useState<AuthState>({
    //     isAuthed: !!(data?.success && data?.message),
    //     user: data?.message,
    //     error: error || null,
    // });

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
    // use useMemo

    return <AuthContext.Provider value={state}>{state.isAuthed ? children : <Login />}</AuthContext.Provider>;
}

export function useAuthState() {
    const getAccessToken = localStorage.getItem('tunedin_token');
    const state = React.useContext(AuthContext)!;
    const isAuthenticated = state.user && state.isAuthed;

    return {
        ...state,
        getAccessToken,
        isAuthenticated,
    };
}
