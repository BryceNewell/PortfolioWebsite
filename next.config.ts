import type { NextConfig } from "next";

// The site is exported as static HTML so it can be hosted on GitHub Pages (or any static host).
// When served from a repository sub-path (https://<user>.github.io/<repo>), set NEXT_PUBLIC_BASE_PATH=/<repo>.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
