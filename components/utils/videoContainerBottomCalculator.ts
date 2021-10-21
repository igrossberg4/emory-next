// Calculates the difference between the window height and the actual viewport.
// it is meant to be osed only on mobile, where units like 100vh will output
// a bigger size than the actual viewport and corrections are needed.
// This will return a negative offset to be used on properties like bottom or
// margin-bottom

export const videoContainerBottomCalculator = (window: Window): string => {
  if (window.innerHeight > window.innerWidth) {
    return `-${ (window.outerHeight - window.innerHeight) / 2}px`
  } else {
    return '0';
  }
};
