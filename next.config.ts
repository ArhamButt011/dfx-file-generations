import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable Strict Mode to prevent double API calls

  images: {
    domains: ['046f-192-241-155-184.ngrok-free.app'], // Add ngrok domain to allowed image sources
    remotePatterns: [
      {
        protocol: 'http', // Your image URL uses HTTP
        hostname: '192.241.155.184',
        port: '8080', // Allow images from port 8080
        pathname: '/outputs/**', // Adjust this based on your actual image path
      },
      {
        protocol: 'https', // Allow images from the ngrok URL
        hostname: '046f-192-241-155-184.ngrok-free.app',
        pathname: '/**', // Allow all images from this domain
      },
    ],
  },
}

export default nextConfig
