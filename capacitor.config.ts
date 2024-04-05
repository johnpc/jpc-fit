import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.johncorser.fit",
  appName: "jpc-fit-vite",
  webDir: "dist",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#DB7093",
  },
};

export default config;
