import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.johncorser.fit",
  appName: "fit.jpc",
  webDir: "dist",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#DB7093",
  },
};

export default config;
