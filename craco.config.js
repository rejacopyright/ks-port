const path = require('path')
module.exports = {
  style: {
    modules: {
      localIdentName: '[path][name]__REJAJAMIL__[hash:base64:5]',
    },
  },
  webpack: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/_api'),
      '@assets': path.resolve(__dirname, 'src/_assets'),
      '@images': path.resolve(__dirname, 'src/_assets/images'),
      '@components': path.resolve(__dirname, 'src/_components'),
      '@layouts': path.resolve(__dirname, 'src/_components/layouts'),
      '@helpers': path.resolve(__dirname, 'src/_helpers'),
      '@redux': path.resolve(__dirname, 'src/_redux'),
      '@styles': path.resolve(__dirname, 'src/_styles'),
      crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
    },
    fallback: {
      crypto: false,
    },
  },
}
