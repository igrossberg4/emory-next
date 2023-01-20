import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { Thumb } from "./Thumb";
import { MD5 } from "object-hash";
import { useMediaQuery } from "react-responsive";
import { ButtonEnabled } from "./Carousel";
import { useInView } from "react-intersection-observer";
import { OptionsType } from "embla-carousel/embla-carousel-vanilla/options";
// export const PrevAsdfButton = ({ enabled, onClick }: ButtonEnabled) => (
//     <button
//         type="button"
//         className="embla__button embla__button--prev"
//         onClick={onClick}
//         disabled={!enabled}
//         aria-label="Previous"
//     >
//         <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
//             <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
//         </svg>
//     </button>
// );

// export const NextAsdfButton = ({ enabled, onClick }: ButtonEnabled) => (
//     <button
//         type="button"
//         className="embla__button embla__button--next"
//         onClick={onClick}
//         disabled={!enabled}
//         aria-label="Next"
//     >
//         <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
//             <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
//         </svg>
//     </button>
// );

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla-gallery__button embla-gallery__button--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg
        width="17"
        height="29"
        viewBox="0 0 17 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6425 28.3924L0.5 14.2499L14.6425 0.107422L16.41 1.87492L4.035 14.2499L16.41 26.6249L14.6425 28.3924Z"
          fill="#212322"
        />
      </svg>
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla-gallery__button embla-gallery__button--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg
        width="17"
        height="29"
        viewBox="0 0 17 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.26756 28.3924L16.4101 14.2499L2.26756 0.107422L0.500061 1.87492L12.8751 14.2499L0.500061 26.6249L2.26756 28.3924Z"
          fill="#212322"
        />
      </svg>
    </button>
  );
};

export const PrevButtonThumbs: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla-gallery-thumbs__button embla-gallery-thumbs__button--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg
        width="7"
        height="13"
        viewBox="0 0 7 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.657 12.157L0 6.50002L5.657 0.843018L6.364 1.55002L1.414 6.50002L6.364 11.45L5.657 12.157Z"
          fill="#212322"
        />
      </svg>
    </button>
  );
};

export const NextButtonThumbs: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla-gallery-thumbs__button embla-gallery-thumbs__button--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg
        width="7"
        height="13"
        viewBox="0 0 7 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.707 12.157L6.364 6.50002L0.707 0.843018L0 1.55002L4.95 6.50002L0 11.45L0.707 12.157Z"
          fill="#212322"
        />
      </svg>
    </button>
  );
};

export default function AsdfCarousel(props: any) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const SLIDE_COUNT = props.slides.length;

  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    align: isMobile ? "center" : "start",
  });

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [prevBtnAsdfEnabled, setPrevBtnAsdfEnabled] = useState(false);
  const [nextBtnAsdfEnabled, setNextBtnAsdfEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbsApi]
  );

  const onThumbPrevClick = useCallback(() => {
    if (!embla || !emblaThumbsApi) return;
    if (emblaThumbsApi.clickAllowed()) {
      const nextSlide = selectedThumbIndex - 7;

      if (nextSlide < 0) {
        setSelectedThumbIndex(0);
        emblaThumbsApi.scrollTo(0);
      } else if (nextSlide > SLIDE_COUNT - 1) {
        setSelectedThumbIndex(SLIDE_COUNT - 1);
        emblaThumbsApi.scrollTo(SLIDE_COUNT - 1);
      } else {
        setSelectedThumbIndex(selectedThumbIndex - 7);
        emblaThumbsApi.scrollTo(selectedThumbIndex - 7);
      }
    }
  }, [embla, emblaThumbsApi, selectedThumbIndex]);

  const onThumbNextClick = useCallback(() => {
    if (!embla || !emblaThumbsApi) return;
    if (emblaThumbsApi.clickAllowed()) {
      const nextSlide = selectedThumbIndex + 7;

      if (nextSlide < 0) {
        setSelectedThumbIndex(0);
        emblaThumbsApi.scrollTo(0);
      } else if (nextSlide > SLIDE_COUNT - 1) {
        setSelectedThumbIndex(SLIDE_COUNT - 1);
        emblaThumbsApi.scrollTo(SLIDE_COUNT - 1);
      } else {
        setSelectedThumbIndex(nextSlide);
        emblaThumbsApi.scrollTo(nextSlide);
      }
    }
  }, [embla, emblaThumbsApi, selectedThumbIndex]);

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbsApi) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnAsdfEnabled(embla.canScrollPrev());
    setNextBtnAsdfEnabled(embla.canScrollNext());
    emblaThumbsApi.scrollTo(embla.selectedScrollSnap());
    setSelectedThumbIndex(embla.selectedScrollSnap());
  }, [embla, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
  }, [embla, onSelect]);

  const [refViewport, inView, entry] = useInView({});
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      e.preventDefault();
      if (inView) {
        switch (e.key) {
          case "ArrowLeft":
            scrollPrev();
            return;
          case "ArrowRight":
            scrollNext();
            return;
        }
      }
    };
    document.body.addEventListener("keydown", handleKey, { passive: false });
    return () => document.body.removeEventListener("keydown", handleKey);
  }, [inView, scrollNext, scrollPrev]); // @ts-ignore
  return (
    <div
      ref={refViewport}
      className="section campaign-carousel gallery-carousel asdf-carousel"
    >
      <div className="embla-gallery">
        <div className="embla-gallery__viewport" ref={viewportRef}>
          <div className="embla-gallery__container">
            {props.slides.map((value: any, i: number) => {
              return (
                <div className="embla-gallery__slide" key={i}>
                  <div className="embla-gallery__slide__number">
                    <span>{i + 1}</span>
                  </div>
                  <img
                    className="embla-gallery__slide__img"
                    src={
                      require(`../public/images/${value.img_src}?resize&sizes[]=2048&format=png`)
                        .src
                    }
                    alt="Your alt text"
                  />
                </div>
              );
            })}
          </div>
          {prevBtnAsdfEnabled ? (
            <PrevButton onClick={scrollPrev} enabled={prevBtnAsdfEnabled} />
          ) : (
            ""
          )}
          {nextBtnAsdfEnabled ? (
            <NextButton onClick={scrollNext} enabled={nextBtnAsdfEnabled} />
          ) : (
            ""
          )}
        </div>

        <div className="embla-gallery-thumbs">
          <span className="slide-num">{`${
            selectedIndex + 1
          } / ${SLIDE_COUNT}`}</span>
          <div className="embla-gallery-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-gallery-thumbs__container">
              {props.slides.map((value: any, i: number) => (
                <Thumb
                  onClick={() => onThumbClick(i)}
                  selected={i === selectedIndex}
                  index={i}
                  imgSrc={
                    require(`../public/images/${value.img_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp`)
                      .src
                  }
                  key={i}
                />
              ))}
            </div>

            {prevBtnAsdfEnabled ? (
              <PrevButtonThumbs onClick={onThumbPrevClick} enabled={true} />
            ) : (
              ""
            )}
            {nextBtnAsdfEnabled ? (
              <NextButtonThumbs onClick={onThumbNextClick} enabled={true} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
