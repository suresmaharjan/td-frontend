/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tamangdictionary.com/api/:path*', // proxy to external API
      },
    ];
  },
};

module.exports = nextConfig;
