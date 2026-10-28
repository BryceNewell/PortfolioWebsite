import type { NextConfig } from "next";

// Exported as fully static HTML (served from ./out by Cloudflare Workers static assets).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
