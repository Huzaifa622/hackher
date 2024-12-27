/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/host-and-guest-by-location',
            permanent: true,
          },
        ]
      },
    images:{
        unoptimized:true
    },
    experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
