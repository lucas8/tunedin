import React from 'react';
import { render, act } from '@testing-library/react';
import AuthProvider from '../AuthContext';
import { APIResponse, User } from '../../types/types';

const tree = (component: React.ReactNode): JSX.Element => <AuthProvider>{component}</AuthProvider>;

jest.mock('../../utils/getUser.ts', () => {
    return {
        getUser: jest.fn(
            (token: string): Promise<APIResponse<User>> => {
                return Promise.resolve({
                    message: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        avatar_url: 'https://via.placeholder.com',
                        email: 'testing@gmail.com',
                        id: 1,
                        username: 'testing-user',
                    },
                    success: true,
                });
            },
        ),
    };
});

describe('auth context', () => {
    it('should display a login page', () => {
        act(() => {
            render(tree(<pre>success</pre>));
        });
    });
});
