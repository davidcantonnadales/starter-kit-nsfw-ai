// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  maximumFileSizeToCacheInBytes: 3000000, // 3 MB
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
    unoptimized: true,
  },
  env: {
    FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    NOVITA_API_KEY: process.env.NOVITA_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CHAT_PROJECT_ID: process.env.CHAT_PROJECT_ID,
    CHAT_PROJECT_KEY: process.env.CHAT_PROJECT_KEY,
  },
};

module.exports = withPWA(nextConfig);
