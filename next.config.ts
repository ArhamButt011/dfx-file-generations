const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['lumashape.com', 'dxf.lumashape.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lumashape.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dxf.lumashape.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
