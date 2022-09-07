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
  experimental: { images: { allowFutureImage: true, unoptimized: true } },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['assets.imgix.net'],
    // loader: 'imgix',
    // path: 'https://assets.imgix.net/hp/snowshoe.jpg?auto=compress&w=900&h=600&fit=crop',
  },
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
