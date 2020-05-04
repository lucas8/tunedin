import { BrowserWindow, IpcMainEvent } from 'electron';

let win: BrowserWindow | null = null;

function destroyAuthWindow() {
    if (!win) return;
    win.close();
    win = null;
}

export function createAuthWindow(event: IpcMainEvent) {
    destroyAuthWindow();

    win = new BrowserWindow({
        width: 400,
        height: 500,
    });

    win.loadURL('http://localhost:4000/auth/spotify');

    const {
        session: { webRequest },
    } = win.webContents;

    const filter = {
        urls: ['http://localhost:4000/auth/spotify/callback*'],
    };

    webRequest.onBeforeRedirect(filter, async (details) => {
        console.log(details);
        await event.reply('login-reply', 'success');
        destroyAuthWindow();
    });

    win.on('closed', () => {
        win = null;
    });
}
