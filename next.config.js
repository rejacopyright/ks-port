const path = require('path')


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: false,
  experimental: { images: { allowFutureImage: true } },
  images: { dangerouslyAllowSVG: true },
  compiler: {
    // removeConsole: {
    //   exclude: ['error', 'warning'],
    // },
  },
}

module.exports = nextConfig
