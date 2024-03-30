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
  // Disables unecessary performance optimization for challenge
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
