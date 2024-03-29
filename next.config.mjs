/** @type {import('next').NextConfig} */
const nextConfig = {
  // This config redirects/defaults the root / to /home as per spec
  redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
