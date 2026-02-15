const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { createWindow } = require('./core/app');
const { registerVaultIpcHandlers } = require('./ipc/vaultIpc');
const { registerFileIpcHandlers } = require('./ipc/fileIpc');
const { registerUpdateIpcHandlers } = require('./ipc/updateIpc');

const VaultManager = require('./utils/vaultManager');
global.vaultMgr = new VaultManager();

let isQuitting = false;

// Fix for VM rendering issues (Linux/Hyper-V)
app.disableHardwareAcceleration();

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);

    const splash = new BrowserWindow({
        width: 420,
        height: 260,
        frame: false,
        resizable: false,
        movable: true,
        show: true,
        alwaysOnTop: true,
        transparent: false,
        backgroundColor: '#1e1e1e',
        autoHideMenuBar: true,
        webPreferences: { sandbox: true }
    });
    splash.removeMenu();
    splash.loadFile(path.join(__dirname, '../renderer/pages/splash.html'));

    const mainWindow = createWindow();

    const showMain = () => {
        try { if (!mainWindow.isDestroyed()) mainWindow.show(); } catch (_) {}
        try { if (!splash.isDestroyed()) splash.close(); } catch (_) {}
    };

    mainWindow.once('ready-to-show', showMain);
    mainWindow.webContents.once('did-finish-load', showMain);

    registerVaultIpcHandlers(mainWindow);
    registerFileIpcHandlers();
    registerUpdateIpcHandlers(mainWindow);
});

app.on('before-quit', async (event) => {
    if (isQuitting) return;

    const { getCurrentSessionHandler, clearSession } = require('./utils/session');
    const handler = getCurrentSessionHandler();
    if (handler) {
        event.preventDefault();
        try {
            const sealPromise = handler.closeVault();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Sealing timeout')), 10000));
            await Promise.race([sealPromise, timeoutPromise]);
        } catch (err) {
            console.error('Error while sealing vault on quit:', err);
        } finally {
            try {
                const { closeCurrentDB } = require('./utils/db');
                await closeCurrentDB();
            } catch (_) {}
            try { clearSession(); } catch (_) {}
            isQuitting = true;
            app.quit();
        }
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('will-quit', () => {
    const { closeCurrentDB } = require('./utils/db');
    closeCurrentDB();
});