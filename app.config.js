import 'dotenv/config';

export default {
  name: 'unimonitor',
  slug: 'unimonitor',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  scheme: 'unimonitor',
  entryPoint: './src/App.tsx',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'io.unimonitor.client',
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  extra: {
    microsoftAdClientId: process.env.MICROSOFT_AD_CLIENT_ID,
    unimonitorApiUrl: process.env.UNIMONITOR_API_URL,
    enableDebugToken: true,
  },
};
