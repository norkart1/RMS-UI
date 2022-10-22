// const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, env: {
    SINAN_BASE_URL: process.env.SINAN_BASE_URL,
    MY_BASE_URL: process.env.MY_BASE_URL,
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
