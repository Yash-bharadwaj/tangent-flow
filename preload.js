
// Preload script for Electron
const { contextBridge, ipcRenderer } = require('electron');

// Set up safe context bridge between Electron and renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any API methods here that you want to expose to the renderer process
  // For example:
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  openExternal: (url) => ipcRenderer.send('open-external', url)
});

// Add event listeners once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  // Inject version info if element exists
  const versionElement = document.getElementById('app-version');
  if (versionElement) {
    ipcRenderer.invoke('get-app-version').then((version) => {
      versionElement.textContent = version;
    });
  }
});
