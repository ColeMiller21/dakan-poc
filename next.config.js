/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["poc-dakan.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.thirdwebstorage.com",
      },
    ],
  },
};

module.exports = nextConfig;
