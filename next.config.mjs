/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', 'convex-frontend', 'mbaluev.com'],
    },
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
};

export default nextConfig;
