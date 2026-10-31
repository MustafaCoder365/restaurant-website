import type { NextConfig } from "next";

// Served from https://<user>.github.io/lumina-dental-website/ on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
