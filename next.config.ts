import type { NextConfig } from "next";

// Publicado no GitHub Pages em /memory-game-nextjs/ (site estático).
const basePath = "/memory-game-nextjs";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
};

export default nextConfig;
