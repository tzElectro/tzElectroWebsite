/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tzelectro.sirv.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
