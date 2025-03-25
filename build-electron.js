
// Build script for Electron using ES modules
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to ensure electron-builder is in devDependencies and fix package.json
function fixPackageJson() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  let modified = false;
  
  // Add author and description if missing
  if (!packageJson.author) {
    packageJson.author = "Tangent";
    modified = true;
  }
  
  if (!packageJson.description) {
    packageJson.description = "Tangent Desktop Application";
    modified = true;
  }

  // Ensure electron-builder is only in devDependencies
  if (packageJson.dependencies && packageJson.dependencies['electron-builder']) {
    // If it's in dependencies, move it to devDependencies
    const version = packageJson.dependencies['electron-builder'];
    delete packageJson.dependencies['electron-builder'];
    
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
    }
    
    packageJson.devDependencies['electron-builder'] = version;
    modified = true;
  }
  
  // Add build scripts if they don't exist
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  if (!packageJson.scripts['electron:build']) {
    packageJson.scripts['electron:build'] = 'node build-electron.js';
    modified = true;
  }
  
  // Make sure we have main field pointing to the main.js
  if (packageJson.main !== 'main.js') {
    packageJson.main = 'main.js';
    modified = true;
  }
  
  if (modified) {
    // Write the fixed package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Fixed package.json with required fields');
  }
  
  return modified;
}

// Ensure electron is installed
function ensureElectronInstalled() {
  try {
    // Check if electron is in node_modules
    const electronPath = path.join(__dirname, 'node_modules', 'electron');
    if (!fs.existsSync(electronPath)) {
      console.log('Electron is not installed. Installing now...');
      execSync('npm install --save-dev electron@latest', { stdio: 'inherit' });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking/installing electron:', error);
    return false;
  }
}

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building Vite project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Fix package.json before building
fixPackageJson();

// Ensure electron is installed
ensureElectronInstalled();

// Get platform argument
const args = process.argv.slice(2);
const platform = args[0] || 'all'; // Default to all platforms

try {
  if (platform === 'win' || platform === 'all') {
    console.log('Building for Windows...');
    execSync('npx electron-builder --win --config electron-builder.config.js', { stdio: 'inherit' });
    console.log('Windows build completed successfully.');
  }
  
  if (platform === 'mac' || platform === 'all') {
    console.log('Building for macOS...');
    execSync('npx electron-builder --mac --config electron-builder.config.js', { stdio: 'inherit' });
    console.log('macOS build completed successfully.');
  }
  
  console.log('Build completed successfully!');
  console.log('Installers are located in the dist_electron directory.');
  
  // Provide information on distributing the built packages
  console.log('\nDistribution Information:');
  console.log('1. For macOS: The .dmg file can be distributed to macOS users.');
  console.log('   - Mac users might need to right-click and open the app first time to bypass Gatekeeper.');
  console.log('   - For proper distribution, code signing with an Apple Developer certificate is recommended.');
  console.log('2. For Windows: The .exe installer can be distributed to Windows users.');
  console.log('   - Windows users might see SmartScreen warnings which they can bypass.');
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
