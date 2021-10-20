import image from "next/image";

export const imageLoader = (multipleSizesImgPrincipal: any) => {
  return ({src, width}:  {src: string, width: string}) => {

    const filteredPath = multipleSizesImgPrincipal.images.filter((image: { width: string}) => {
      return width === image.width;
    });

    // Find the maximum available image as fallback for missing sizes.
    const getMaxAvailableWidthSrc = function() {
      console.log('trying to get other width of', src, width);
      const widths = [300, 600, 1024, 2048];
      let maxAvailableWidthSrc = src;
      multipleSizesImgPrincipal.images.forEach((image: { width: string, path: string}) => {
        if (widths.includes(parseInt(image.width))) {
          maxAvailableWidthSrc = image.path
        }
      });
      return maxAvailableWidthSrc;
    };

    const path = filteredPath.length ? filteredPath[0].path : getMaxAvailableWidthSrc();

    return path;
  }

};
