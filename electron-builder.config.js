
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
    darkModeSupport: true
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"]
      }
    ]
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    runAfterFinish: false,
    allowToChangeInstallationDirectory: false
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
    }
  }
};

module.exports = config;
