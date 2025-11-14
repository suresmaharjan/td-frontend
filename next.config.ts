/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // 👈 this disables image optimization for static export
  }, 
};

module.exports = nextConfig;
