import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  typescript: {
    // Temporarily ignore TypeScript errors during migration
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore during builds
    dirs: ['src/app', 'src/components'],
  },
  images: {
    domains: ['boostwellbeing.co.nz'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
};

export default nextConfig;