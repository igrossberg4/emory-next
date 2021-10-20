export const videoContainerBottomCalculator = (window: Window, document: Document): string => {
  if (window.innerHeight > window.innerWidth) {
    return window.innerWidth < 560 ?  `${window.innerHeight - 320}px` : `${window.innerHeight - 330}px`;
  } else {
    return '';
  }
};
