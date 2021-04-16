import 'dotenv/config';

export default {
    name: "unimonitor",
    slug: "unimonitor",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "unimonitor",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    updates: {
        "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        "supportsTablet": true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF"
        }
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    extra: {
        microsoftAdClientId: process.env.MICROSOFT_AD_CLIENT_ID,
    },
    android: {
        package: "io.unimonitor.client"
    }
}