import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable Strict Mode to prevent double API calls

  images: {
    remotePatterns: [
      {
        protocol: 'http', // Your image URL uses HTTP
        hostname: '192.241.155.184',
        port: '8080', // Allow images from port 8080
        pathname: '/outputs/**', // Adjust this based on your actual image path
      },
    ],
  },
}

export default nextConfig
