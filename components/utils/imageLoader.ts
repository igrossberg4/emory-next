export const imageLoader = (multipleSizesImgPrincipal: any, { src, width }: {src: string, width: string}) => {
  const filteredPath = multipleSizesImgPrincipal.images.filter((image: { width: string}) => {
    return width === image.width;
  });

  const path = filteredPath.length ? filteredPath[0].path : src;
  return path;
};
