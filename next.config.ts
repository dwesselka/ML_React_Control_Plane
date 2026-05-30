import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["lucide-react", "@tanstack/react-query"],
  },

  serverExternalPackages: ["pino", "pino-pretty"],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
