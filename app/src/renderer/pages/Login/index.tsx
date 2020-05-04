import React from 'react';
import { ipcRenderer } from 'electron';

export default function Login() {
    const onButtonClick = () => {
        ipcRenderer.send('login');
    };
    return <button onClick={onButtonClick}>Continue with Spotify</button>;
}
