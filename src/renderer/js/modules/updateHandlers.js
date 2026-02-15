export function setupUpdateHandlers() {
    const autoUpdateCheckbox = document.getElementById('autoUpdateCheckbox');
    const checkForUpdatesBtn = document.getElementById('checkForUpdatesBtn');
    const updateStatusMsg = document.getElementById('updateStatusMsg');
    const updateAvailableModal = new window.bootstrap.Modal(document.getElementById('updateAvailableModal'));
    const downloadUpdateBtn = document.getElementById('downloadUpdateBtn');
    const dontAskAgainCheckbox = document.getElementById('dontAskAgainCheckbox');

    // Load initial settings
    window.api.getUpdateSettings().then(settings => {
        if (autoUpdateCheckbox) {
            autoUpdateCheckbox.checked = settings.autoUpdate;
        }
    });

    // Save settings on change
    if (autoUpdateCheckbox) {
        autoUpdateCheckbox.addEventListener('change', (e) => {
            window.api.setUpdateSettings({ autoUpdate: e.target.checked });
        });
    }

    // Manual check
    if (checkForUpdatesBtn) {
        checkForUpdatesBtn.addEventListener('click', async () => {
            updateStatusMsg.textContent = 'Checking...';
            updateStatusMsg.className = 'mt-3 text-info small text-center';
            checkForUpdatesBtn.disabled = true;

            const res = await window.api.checkForUpdates();
            checkForUpdatesBtn.disabled = false;
            
            if (!res.success) {
                updateStatusMsg.textContent = 'Error checking for updates.';
                updateStatusMsg.className = 'mt-3 text-danger small text-center';
            }
        });
    }

    // Listeners
    window.api.onUpdateChecking(() => {
        if (updateStatusMsg) updateStatusMsg.textContent = 'Checking for updates...';
    });

    window.api.onUpdateAvailable((info) => {
        if (updateStatusMsg) updateStatusMsg.textContent = `Update available: ${info.version}`;
        
        // Check if we should show modal (autoUpdate is handled in main, but this event fires anyway)
        // Main process handles "auto check", but we decide UI here.
        // If this was triggered manually, we always show.
        // If auto, main process only sends if acceptable.
        
        updateAvailableModal.show();
    });

    window.api.onUpdateNotAvailable(() => {
        if (updateStatusMsg) {
            updateStatusMsg.textContent = 'You are on the latest version.';
            updateStatusMsg.className = 'mt-3 text-success small text-center';
        }
    });

    window.api.onUpdateError((msg) => {
        if (updateStatusMsg) {
            updateStatusMsg.textContent = 'Update error: ' + msg;
            updateStatusMsg.className = 'mt-3 text-danger small text-center';
        }
    });

    window.api.onUpdateProgress((progress) => {
        if (updateStatusMsg) {
            updateStatusMsg.textContent = `Downloading: ${Math.round(progress.percent)}%`;
        }
        if (downloadUpdateBtn) {
            downloadUpdateBtn.textContent = `Downloading ${Math.round(progress.percent)}%`;
            downloadUpdateBtn.disabled = true;
        }
    });

    window.api.onUpdateDownloaded(() => {
        if (updateStatusMsg) updateStatusMsg.textContent = 'Update downloaded. Installing...';
        // Auto install
        window.api.quitAndInstall();
    });

    // Modal actions
    if (downloadUpdateBtn) {
        downloadUpdateBtn.addEventListener('click', () => {
            window.api.downloadUpdate();
            
            // Handle "Don't ask again" implies disabling auto-updates?
            // Actually request says "Mozliwosc przelaczenia spowrotem checkboxa w ustawieniach".
            // So if they uncheck "ask me", maybe it means "disable auto update checks".
            if (dontAskAgainCheckbox.checked) {
                window.api.setUpdateSettings({ autoUpdate: false });
                if (autoUpdateCheckbox) autoUpdateCheckbox.checked = false;
            }
            
            updateAvailableModal.hide();
        });
    }
}
