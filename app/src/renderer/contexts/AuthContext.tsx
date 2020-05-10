import React from 'react';
import { User } from '../types/types';
import Login from '../pages/Login';
import { ipcRenderer } from 'electron';
import { getUser } from '../utils/getUser';

interface AuthState {
    isLoading: boolean;
    isAuthed: boolean;
    user: User | null;
    error: Error | null;
}

export interface ProviderProps {
    children?: React.ReactNode;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState<AuthState>({
        isLoading: true,
        isAuthed: false,
        user: null,
        error: new Error('Unhandled error'),
    });

    React.useEffect(() => {
        getUser(localStorage.getItem('tunedin_token')).then(
            (user) => setState({ isAuthed: true, user: user.message, isLoading: false, error: null }),
            (error) => setState({ isAuthed: false, user: null, isLoading: false, error }),
        );
    }, []);

    if (ipcRenderer) {
        ipcRenderer.on('login-reply-token', (_, token) => {
            localStorage.setItem('tunedin_token', token);
            getUser(token).then(
                (user) => setState({ isAuthed: true, user: user.message, isLoading: false, error: null }),
                (error) => setState({ isAuthed: false, user: null, isLoading: false, error }),
            );
        });
    }

    return (
        <AuthContext.Provider value={state}>
            {state.isLoading ? null : state.error ? <Login /> : children}
        </AuthContext.Provider>
    );
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
