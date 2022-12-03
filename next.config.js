/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
   experimental: { appDir: true },
  distDir: process.env.BUILD_DIR || '.next',
  env: {
    BASE_URL: process.env.BASE_URL,
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['sibaqdb.s3.amazonaws.com', "last-db.s3.amazonaws.com"],
  },
  
  presets: ["next/babel"],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },

}

module.exports = nextConfig
