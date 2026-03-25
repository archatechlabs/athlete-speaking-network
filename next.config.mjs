/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/athletes",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
