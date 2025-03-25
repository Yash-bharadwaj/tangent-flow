
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.tangent.app",
  productName: "Tangent",
  directories: {
    output: "dist_electron"
  },
  files: [
    "dist/**/*",
    "main.js",
    "preload.js"
  ],
  mac: {
    category: "public.app-category.business",
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"]
      }
    ],
    darkModeSupport: true,
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist",
    identity: null, // Set to null for no signing, or specify identity for signing
    notarize: false
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"]
      }
    ],
    artifactName: "${productName}-Setup-${version}.${ext}"
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    runAfterFinish: false,
    allowToChangeInstallationDirectory: false,
    deleteAppDataOnUninstall: false
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220
      },
      {
        x: 410,
        y: 220,
        type: "link",
        path: "/Applications"
      }
    ],
    window: {
      width: 540,
      height: 380
    },
    sign: false
  },
  protocols: {
    name: "Tangent Protocol",
    schemes: ["tangent"]
  }
};

export default config;
