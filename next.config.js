/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.thirdwebstorage.com",
      },
    ],
  },
};

module.exports = nextConfig;
