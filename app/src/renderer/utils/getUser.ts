import fetch from 'unfetch';
import { APIResponse, User } from '../types/types';

export const getUser = async (token: string | null): Promise<APIResponse<User>> => {
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
