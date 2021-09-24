const path = require('path');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([

  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'webp', 'gif', 'jpg'],
    imagesFolder: './public/images',
    /* config for next-optimized-images */
  }]
],{
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    loader: 'imgix',
    path: "/",
    deviceSizes: [300, 600, 1024, 2048]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}
)
