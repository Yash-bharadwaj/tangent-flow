
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building Vite project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Get platform argument
const args = process.argv.slice(2);
const platform = args[0] || 'all'; // Default to all platforms

try {
  if (platform === 'win' || platform === 'all') {
    console.log('Building for Windows...');
    execSync('npx electron-builder --win --config electron-builder.config.js', { stdio: 'inherit' });
  }
  
  if (platform === 'mac' || platform === 'all') {
    console.log('Building for macOS...');
    execSync('npx electron-builder --mac --config electron-builder.config.js', { stdio: 'inherit' });
  }
  
  console.log('Build completed successfully!');
  console.log('Installers are located in the dist_electron directory.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
