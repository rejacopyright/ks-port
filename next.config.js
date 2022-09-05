const path = require('path')

const rewrites = [
  {
    source: '/login',
    destination: '/auth/login',
  },
  {
    source: '/register',
    destination: '/auth/register',
  },
]
const redirects = [
  {
    source: '/auth/:pathname*',
    destination: '/:pathname*',
    permanent: true,
  },
]

const nextConfig = {
  // useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: false,
  experimental: { images: { allowFutureImage: true, unoptimized: false } },
  images: { dangerouslyAllowSVG: true },
  // compiler: {
  //   removeConsole: true
  // },
  async rewrites() {
    return rewrites
  },
  async redirects() {
    return redirects
  },
}

module.exports = nextConfig
