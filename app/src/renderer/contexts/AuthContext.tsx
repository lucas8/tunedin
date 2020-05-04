import React from 'react';
import { User, APIResponse } from '../types/types';
import fetch from 'unfetch';
import Login from '../pages/Login';
import { ipcRenderer } from 'electron';

interface AuthState {
    isLoading: boolean;
    isAuthed: boolean;
    user: User | null;
    error: Error | null;
}

interface ProviderProps {
    children?: React.ReactNode;
}

const getUser = async (): Promise<APIResponse> => {
    const req = await fetch('http://localhost:4000/api/users/me', {
        method: 'get',
        credentials: 'include',
    });

    const response = req.json();

    if (req.ok && req.status == 200) {
        return response;
    } else if (req.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error('Unhandled error');
    }
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState<AuthState>({
        isLoading: false,
        isAuthed: false,
        user: null,
        error: new Error('Unhandled error'),
    });

    React.useEffect(() => {
        getUser().then(
            (user) => setState({ isAuthed: true, user: user.message, isLoading: false, error: null }),
            (error) => setState({ isAuthed: false, user: null, isLoading: false, error }),
        );
    }, []);

    ipcRenderer.on('login-reply', (_, arg) => {
        if (arg === 'success') {
            getUser().then(
                (user) => setState({ isAuthed: true, user: user.message, isLoading: false, error: null }),
                (error) => setState({ isAuthed: false, user: null, isLoading: false, error }),
            );
        } else {
            // TODO: Display error to user
            console.error('Error loggin in');
        }
    });

    return (
        <AuthContext.Provider value={state}>
            {state.isLoading ? <h1>Loading...</h1> : state.error ? <Login /> : children}
            <div>hi</div>
        </AuthContext.Provider>
    );
}
