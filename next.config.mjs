/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'tailone.tailwindtemplate.net',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },

    ],
  }
};

export default nextConfig;