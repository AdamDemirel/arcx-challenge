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
  // Prevents needing to wrap with Suspense
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
