import React from "react";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={"embla-gallery-thumbs__slide".concat(
        selected ? " embla-gallery-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-gallery-thumbs__slide__button"
        type="button"
      >
        <img
          className="embla-gallery-thumbs__slide__img"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  );
};
