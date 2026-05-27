import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssrfbnycbrikgfdikkrw.supabase.co",
      },
    ],
  },
};

export default nextConfig;