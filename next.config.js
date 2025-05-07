/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output in a standalone mode which is optimized for Lambda
  output: "standalone",
  // For AWS Lambda environment
  experimental: {
    // Required for AWS Lambda to properly handle API routes
    appDir: true,
  },
  // Set the assetPrefix to match your CloudFront distribution URL if using a custom domain
  // assetPrefix: process.env.ASSET_PREFIX,
};

module.exports = nextConfig;
