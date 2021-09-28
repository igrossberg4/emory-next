export const videoContainerBottomCalculator = (window: Window, document: Document): string => {
  if (window.innerHeight > window.innerWidth) {
    return window.innerWidth < 560 ?  `${window.innerHeight - 420}px` : `${window.innerHeight - 430}px`;
  } else {
    return '';
  }
};
