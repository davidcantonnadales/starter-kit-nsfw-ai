import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.aixa.app",
  appName: "Aixa AI",
  webDir: "public",
  server: {
    url: "http://192.168.68.110:3000",
    cleartext: true,
  },
};

export default config;
