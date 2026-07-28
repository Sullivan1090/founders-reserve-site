/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '*.worf.replit.dev',
    '*.replit.dev',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
