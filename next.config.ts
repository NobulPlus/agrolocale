import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enabled for static export builds to cPanel
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
