import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio now includes a server-side /api/chat route.
  // Do not use static export because App Router API routes need a server runtime.
  images: {
    unoptimized: true,
    qualities: [62, 65, 75],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
