import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio now includes a server-side /api/chat route.
  // Static export would remove App Router API routes from the deployment.
  images: {
    unoptimized: true,
    qualities: [62, 65, 75],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  outputFileTracingIncludes: {
    "/api/chat": ["./content/rag/index.json"],
  },
};

export default nextConfig;
