import "dotenv/config";

export default {
  expo: {
    name: "github-repository-app",
    slug: "github-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apolloUri: process.env.EXPO_PUBLIC_APOLLO_URI,
      eas: {
        projectId: "2c08608e-2a9d-49e2-8dfd-2afb95f3cd25",
      },
    },
    updates: {
      url: "https://u.expo.dev/2c08608e-2a9d-49e2-8dfd-2afb95f3cd25",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
