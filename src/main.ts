import { app, BrowserWindow, screen, Tray, Menu, MenuItemConstructorOptions, Notification } from 'electron';
import path from 'path';
import url from 'url';

let mainWindow: BrowserWindow | null;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname, 'assets', 'logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../dist/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Doesnt work
    const menuTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                { label: 'Open', click: () => { console.log('Open clicked'); } },
                { label: 'Save', click: () => { console.log('Save clicked'); } },
                { type: 'separator' },
                { label: 'Exit', click: () => { app.quit(); } }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

if (require('electron-squirrel-startup'))
    app.quit();

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
