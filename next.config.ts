import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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