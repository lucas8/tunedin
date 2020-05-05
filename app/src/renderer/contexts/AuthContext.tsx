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

const getUser = async (token: string | null): Promise<APIResponse> => {
    if (token) {
        const req = await fetch('http://localhost:4000/api/users/me', {
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

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: ProviderProps) {
    const [state, setState] = React.useState<AuthState>({
        isLoading: false,
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

    ipcRenderer.on('login-reply-token', (_, token) => {
        localStorage.setItem('tunedin_token', token);
        getUser(token).then(
            (user) => setState({ isAuthed: true, user: user.message, isLoading: false, error: null }),
            (error) => setState({ isAuthed: false, user: null, isLoading: false, error }),
        );
    });

    return (
        <AuthContext.Provider value={state}>
            {state.isLoading ? <h1>Loading...</h1> : state.error ? <Login /> : children}
            <div>hi</div>
        </AuthContext.Provider>
    );
}
