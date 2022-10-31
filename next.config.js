/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['sibaqdb.s3.amazonaws.com', "last-db.s3.amazonaws.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }

}

module.exports = nextConfig
