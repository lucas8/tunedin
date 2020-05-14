export const addAuthHeader = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    };
};
