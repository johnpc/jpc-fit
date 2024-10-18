import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.johncorser.fit",
  appName: "fit.jpc",
  webDir: "dist",
  bundledWebRuntime: true,
  ios: {
    contentInset: "always",
    backgroundColor: "#DB7093",
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "icon-48",
      iconColor: "#488AFF",
      // sound: "beep.wav",
    },
  },
};

export default config;
