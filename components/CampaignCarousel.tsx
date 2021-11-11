import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { MD5 } from "object-hash";
import { useMediaQuery } from "react-responsive";
import { ButtonEnabled } from "./Carousel";
import { useInView } from "react-intersection-observer";
export const PrevCampaignButton = ({ enabled, onClick }: ButtonEnabled) => (
  <button
    type="button"
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
    aria-label="Previous"
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextCampaignButton = ({ enabled, onClick }: ButtonEnabled) => (
  <button
    type="button"
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
    aria-label="Next"
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

export default function CampaignCarousel(props:any) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    align: isMobile ? 'center' : 'start'
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);
  const [refViewport, inView, entry] = useInView({});
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      e.preventDefault();
      if(inView) {
        switch(e.key) {
          case 'ArrowLeft':
            scrollPrev();
            return;
          case 'ArrowRight':
            scrollNext();
            return;
        }
      }

    };
    document.body.addEventListener("keydown", handleKey, { passive: false });
    return () =>  document.body.removeEventListener("keydown", handleKey);
  }, [inView, scrollNext, scrollPrev]); // @ts-ignore
  return (
    <div ref={refViewport} className="section campaign-carousel">
      <h2 className="campaign-carousel__title container header-h1">{props.title}</h2>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {props.slides.map((value: any, i: number) => {
              return (
                <div className="embla__slide" key={MD5(value) + i.toString()}>
                  <DynamicComponentMatcher
                    key={MD5(value) + i.toString()}
                    view={[
                      {
                        component: "DynamicComponentMatcher",
                        props: {
                          view: value?.props?.view
                            ? [value.props.view[0]]
                            : [value],
                        },
                      },
                    ]}
                  ></DynamicComponentMatcher>
                </div>
              );
            })}
          </div>
        </div>
        {prevBtnEnabled ? <PrevCampaignButton onClick={scrollPrev} enabled={prevBtnEnabled} /> : ''}
        {nextBtnEnabled ? <NextCampaignButton onClick={scrollNext} enabled={nextBtnEnabled} /> : ''}
      </div>
    </div>
  );
}
