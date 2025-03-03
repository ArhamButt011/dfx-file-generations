import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable Strict Mode to prevent double API calls

  images: {
    domains: ['dxf.lumashape.com'], // Add new domain to allowed image sources
    remotePatterns: [
      {
        protocol: 'https', // Ensure HTTPS usage
        hostname: 'dxf.lumashape.com',
        pathname: '/outputs/**',
      },
    ],
  },
}

export default nextConfig
