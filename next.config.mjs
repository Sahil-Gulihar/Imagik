/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }

    // Exclude exiftool-vendored from being processed by webpack
    config.externals = [...(config.externals || []), 'exiftool-vendored'];

    return config;
  },
  // Add this to handle the binary file
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig