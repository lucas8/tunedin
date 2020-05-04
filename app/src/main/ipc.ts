import { ipcMain } from 'electron';
import { createAuthWindow } from './createAuthWindow';

ipcMain.on('login', async (event) => {
    createAuthWindow(event);
});
