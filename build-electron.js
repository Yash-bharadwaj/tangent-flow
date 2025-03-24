
// Build script for Electron using ES modules
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to ensure electron-builder is in devDependencies
function fixPackageJson() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add author and description if missing
  if (!packageJson.author) {
    packageJson.author = "Tangent";
  }
  if (!packageJson.description) {
    packageJson.description = "Tangent Desktop Application";
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
    
    // Write the fixed package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Fixed package.json: Moved electron-builder to devDependencies');
    return true;
  }
  return false;
}

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building Vite project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Fix package.json before building
const wasFixed = fixPackageJson();

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
