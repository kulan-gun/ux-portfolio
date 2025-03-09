/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Ensures a static build for GitHub Pages
  trailingSlash: true, // Prevents GitHub Pages 404 issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static sites
  },
};

export default nextConfig;
