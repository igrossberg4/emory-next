const path = require("path");
// const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");

module.exports =
  // withPlugins(
  // [
  //   [
  // optimizedImages,
  // {
  //   handleImages: ["jpg", "jpeg", "png", "webp", "gif"],
  //   imagesFolder: "./public/images",
  //   /* config for next-optimized-images */
  // },
  //   ],
  // ],
  {
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/yerkes-national-primate-research-center",
          destination: "/emory-national-primate-research-center",
          permanent: true,
        },
      ];
    },
    images: {
      disableStaticImages: true,
      loader: "imgix",
      path: "/",
      deviceSizes: [300, 600, 1024, 1200, 2048],
      // unoptimized: true,
    },

    // https://github.com/vercel/next.js/issues/21079
    // Remove this workaround whenever the issue is fixed
    // images: {
    //   loader: "imgix",
    //   path: "",
    // },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  };
