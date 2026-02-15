const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const Store = require('electron-store');
const store = new Store();

// Disable auto-downloading to ask user first
autoUpdater.autoDownload = false;

function registerUpdateIpcHandlers(mainWindow) {
    function sendStatusToWindow(text) {
        log.info(text);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', text);
        }
    }

    autoUpdater.on('checking-for-update', () => {
        sendStatusToWindow('Checking for update...');
        if (mainWindow) mainWindow.webContents.send('update-checking');
    });

    autoUpdater.on('update-available', (info) => {
        sendStatusToWindow('Update available.');
        // Check if user has ignored updates, unless manual check
        const autoUpdate = store.get('autoUpdate', true);
        if (mainWindow) {
            mainWindow.webContents.send('update-available', info);
        }
    });

    autoUpdater.on('update-not-available', (info) => {
        sendStatusToWindow('Update not available.');
        if (mainWindow) mainWindow.webContents.send('update-not-available', info);
    });

    autoUpdater.on('error', (err) => {
        sendStatusToWindow('Error in auto-updater. ' + err);
        if (mainWindow) mainWindow.webContents.send('update-error', err.message);
    });

    autoUpdater.on('download-progress', (progressObj) => {
        let log_message = "Download speed: " + progressObj.bytesPerSecond;
        log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
        log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
        sendStatusToWindow(log_message);
        if (mainWindow) mainWindow.webContents.send('update-download-progress', progressObj);
    });

    autoUpdater.on('update-downloaded', (info) => {
        sendStatusToWindow('Update downloaded');
        if (mainWindow) mainWindow.webContents.send('update-downloaded', info);
    });

    // IPC Handlers
    ipcMain.handle('check-for-updates', async () => {
        try {
            const result = await autoUpdater.checkForUpdates();
            return { success: true, updateInfo: result ? result.updateInfo : null };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('download-update', () => {
        autoUpdater.downloadUpdate();
    });

    ipcMain.handle('quit-and-install', () => {
        autoUpdater.quitAndInstall();
    });

    ipcMain.handle('get-update-settings', () => {
        return {
            autoUpdate: store.get('autoUpdate', true)
        };
    });

    ipcMain.handle('set-update-settings', (event, settings) => {
        if (settings.autoUpdate !== undefined) {
            store.set('autoUpdate', settings.autoUpdate);
        }
        return { success: true };
    });

    // Auto-check on startup if enabled
    if (store.get('autoUpdate', true)) {
        // Wait a bit for app to settle
        setTimeout(() => {
            autoUpdater.checkForUpdates().catch(err => log.error('Auto-check error:', err));
        }, 3000);
    }
}

module.exports = { registerUpdateIpcHandlers };
