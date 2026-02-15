import { setupUpdateHandlers } from './updateHandlers.js';

export function setupSettingsHandler() {
    // Initialize update handlers (safe to call even if elements missing)
    setupUpdateHandlers();

    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', async () => {
            const settingsModalEl = document.getElementById('settingsModal');
            // Ensure bootstrap is available (global or imported)
            const bootstrap = window.bootstrap; 
            const modal = new bootstrap.Modal(settingsModalEl);
            modal.show();
            
            await loadAppInfo();
            
            // Reload info when switching to About tab
            const aboutTab = document.getElementById('about-tab');
            if (aboutTab) {
                aboutTab.addEventListener('shown.bs.tab', loadAppInfo);
            }
        });
    }
}

async function loadAppInfo() {
    try {
        const info = await window.api.getAppInfo();
        const verEl = document.getElementById('appVersion');
        const authEl = document.getElementById('appAuthor');
        const licEl = document.getElementById('appLicense');
        
        if (verEl) verEl.textContent = info.version || 'Unknown';
        if (authEl) authEl.textContent = info.author || 'Unknown';
        if (licEl) licEl.textContent = info.license || 'Unknown';
    } catch (err) {
        console.error('Failed to load app info:', err);
    }
}
