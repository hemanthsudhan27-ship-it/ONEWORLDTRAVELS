import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: undefined,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
