import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { Thumb } from "./Thumb";
// import { MD5 } from "object-hash";
import { useMediaQuery } from "react-responsive";
import { ButtonEnabled } from "./Carousel";
import { useInView } from "react-intersection-observer";
import { OptionsType } from "embla-carousel/embla-carousel-vanilla/options";

const hash = require("hash-sum");

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

export default function GalleryCarouselItem(props: any) {
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
                <div
                  className="embla-gallery__slide"
                  // Replace object-hash/MD5 with hash-sum/hash. MD5 is CPU-intensive and causes lag on large pages.
                  key={hash(value) + i.toString()}
                >
                  <div className="embla-gallery__slide__number">
                    <span>{i + 1}</span>
                  </div>

                  {value.hosted_externally ? (
                    <img
                      className="embla-gallery__slide__img"
                      src={value.img_src}
                      alt="Your alt text"
                    />
                  ) : (
                    <img
                      className="embla-gallery__slide__img"
                      src={
                        require(`../public/images/${value.img_src}?resize&sizes[]=2048&format=png`)
                          .src
                      }
                      alt="Your alt text"
                    />
                  )}
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
                  imgSrc={value.thumb_src}
                  // Replace object-hash/MD5 with hash-sum/hash. MD5 is CPU-intensive and causes lag on large pages.
                  key={hash(value) + i.toString()}
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
