export const getUserToken = () => localStorage.getItem('tunedin_token');

export const setUserToken = (token: string): Promise<void> =>
    Promise.resolve(localStorage.setItem('tunedin_token', token));
