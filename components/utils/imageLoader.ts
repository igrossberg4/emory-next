import image from "next/image";

export const imageLoader = (multipleSizesImgPrincipal: any) => {
  return ({src, width}:  {src: string, width: string}) => {

    const filteredPath = multipleSizesImgPrincipal.images.filter((image: { width: string}) => {
      return width === image.width;
    });

    // Find the maximum available image as fallback for missing sizes.
    const getClosestWidthSrc = function() {

      var images = multipleSizesImgPrincipal.images;
      var fallback = {
        width: multipleSizesImgPrincipal.width,
        path: multipleSizesImgPrincipal.src
      };

      for (let i = 0; i < images.length; i++) {
        var image = images[i];
        // Break on larger images
        if (image.width > width) {
          break;
        }
        if (image.width > fallback.width) {
          fallback = image;
        }
      }

      return fallback.path;
    };

    const path = filteredPath.length ? filteredPath[0].path : getClosestWidthSrc();

    return path;
  }

};
