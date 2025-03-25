
import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set app name
app.name = "Tangent";

// Check if running as packaged app
const isPackaged = app.isPackaged;

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: false,
    show: false,
    title: "Tangent",
    icon: path.join(__dirname, isPackaged ? 'dist' : 'public', 'favicon.ico')
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173'); // Vite dev server URL
    win.webContents.openDevTools();
  } else {
    // Check if the dist/index.html file exists
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (!fs.existsSync(indexPath)) {
      dialog.showErrorBox(
        'Application Error',
        'Could not find the application files. Please reinstall the application.'
      );
      app.quit();
      return;
    }
    
    win.loadFile(indexPath);
  }

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    // Dereference the window object
    // In a multi-window app, you would store windows in an array
    // and filter out closed windows here
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS where it's common
// for applications to stay open until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle any uncaught exceptions to prevent app from crashing silently
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  
  // Show error dialog if app is ready
  if (app.isReady()) {
    dialog.showErrorBox('An error occurred', error.message);
  }
});
