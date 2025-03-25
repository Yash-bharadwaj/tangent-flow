
#!/bin/bash

# Make sure script exits on any error
set -e

# Clean up previous builds
echo "Cleaning up previous builds..."
rm -rf dist_electron

# Ensure node modules are installed
if [ ! -d "node_modules" ]; then
  echo "Installing Node dependencies..."
  npm install
fi

# Ensure electron is installed
if [ ! -d "node_modules/electron" ]; then
  echo "Installing Electron..."
  npm install --save-dev electron@latest
fi

# Build the React app
echo "Building React app..."
npm run build

# Fix package.json if needed
echo "Checking package.json configuration..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
let modified = false;

if (!pkg.author) {
  pkg.author = 'Tangent';
  modified = true;
}

if (!pkg.description) {
  pkg.description = 'Tangent Desktop Application';
  modified = true;
}

if (pkg.dependencies && pkg.dependencies['electron-builder']) {
  if (!pkg.devDependencies) pkg.devDependencies = {};
  pkg.devDependencies['electron-builder'] = pkg.dependencies['electron-builder'];
  delete pkg.dependencies['electron-builder'];
  modified = true;
}

if (pkg.main !== 'main.js') {
  pkg.main = 'main.js';
  modified = true;
}

if (modified) {
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  console.log('Fixed package.json with required fields');
}
"

# Build Electron app for the requested platform
if [ "$1" == "win" ]; then
  echo "Building Electron app for Windows..."
  DEBUG=electron-builder npx electron-builder --win --config electron-builder.config.js
elif [ "$1" == "mac" ]; then
  echo "Building Electron app for macOS..."
  DEBUG=electron-builder npx electron-builder --mac --config electron-builder.config.js
else
  echo "Building Electron app for all platforms..."
  DEBUG=electron-builder npx electron-builder --mac --win --config electron-builder.config.js
fi

echo "Build process completed!"
echo "Check the 'dist_electron' folder for the output files."
echo ""
echo "For macOS users:"
echo "- Right-click the .app file and select 'Open' to bypass Gatekeeper on first launch"
echo ""
echo "For Windows users:"
echo "- Run the installer (.exe) file and follow the prompts"
