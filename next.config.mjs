/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export for GitHub Pages
  trailingSlash: true, // Fixes routing issues
  images: {
    unoptimized: true, // Ensures images work correctly
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Prevents build failures due to TS errors
  },
};

export default nextConfig;
