import { spawn } from 'child_process';
import path from 'path';

function handleSquirrelEvent(app: Electron.App): boolean {
    if (process.argv.length === 1) {
        return false;
    }

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawnUpdate = function (args: string[]) {
        try {
            spawn(updateExe, args, { detached: true }).on('close', app.quit);
        } catch (e) {
            console.error('Squirrel event handling error:', e);
        }
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Added '--shortcut-locations', 'Desktop' to ensure desktop shortcut is created
            spawnUpdate(['--createShortcut', exeName, '--shortcut-locations', 'Desktop,StartMenu']);
            return true;
        case '--squirrel-uninstall':
            // It's also a good idea to remove the shortcut from both locations on uninstall
            spawnUpdate(['--removeShortcut', exeName, '--shortcut-locations', 'Desktop,StartMenu']);
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
        default:
            return false;
    }
}

export default handleSquirrelEvent;
