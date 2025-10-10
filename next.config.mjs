/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sam.or.th',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'quickchart.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
