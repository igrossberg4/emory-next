const path = require('path')
module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '/',
  },
  experimental: {
    scrollRestoration: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
