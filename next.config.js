const withFonts = require("next-fonts");

/** @type {import('next').NextConfig} */
const nextConfig = withFonts({
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["poc-dakan.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.thirdwebstorage.com",
      },
    ],
  },
});

module.exports = nextConfig;
