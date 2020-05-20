import { getUserToken } from './localStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}

export const fetchWithAuth = (args?: RequestInit) => {
    return (url: string) =>
        fetcher(url, {
            ...args,
            headers: {
                Authorization: `Bearer ${getUserToken()}`,
                'Content-type': 'application/json',
            },
        });
};
