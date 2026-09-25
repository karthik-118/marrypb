/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow remote images if you host photos elsewhere (e.g. Cloudinary, imgur).
  // Add your image host domains here if you switch from local /public images.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
