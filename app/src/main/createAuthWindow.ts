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
        urls: ['http://localhost:4000/auth/spotify/get*'],
    };

    webRequest.onBeforeRequest(filter, async ({ url }, callback) => {
        const token = new URL(url).searchParams.get('token');
        console.log(token);
        await event.reply('login-reply-token', token);
        destroyAuthWindow();

        callback({ cancel: true });
    });

    win.on('closed', () => {
        win = null;
    });
}
