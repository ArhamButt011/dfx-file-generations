import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '046f-192-241-155-184.ngrok-free.app',
        pathname: '/outputs/**', // Adjust based on your URL pattern
      },
    ],
  },
};

export default nextConfig;
