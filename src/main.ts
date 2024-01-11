import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import url from 'url';

let mainWindow: BrowserWindow | null;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true, // If you require node integration
            contextIsolation: false // Only disable if absolutely necessary
        }
    });

    // Load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../dist/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});