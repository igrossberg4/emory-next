import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { AnimatePresence, motion } from "framer-motion";

interface ButtonEnabled {
  enabled: boolean;
  onClick: () => void;
}
export const PrevButton = ({ enabled, onClick }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);
const EmblaCarousel = ({
  slides,
  current,
  actual,
}: {
  slides: any;
  actual: any;
  current: number;
}) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(actual.prev != null);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(actual.next != null);
  const router = useRouter();
  console.log(slides, actual);
  const changeRoute = useCallback(
    (route) => {
      if (!embla && !route) return;
      console.log(route);
      router.push(
        {
          pathname: route,
        },
        route,
        //{ shallow: false }
      );
    },
    [router, embla]
  );
  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev();
    changeRoute(actual.prev);
  }, [embla, changeRoute]);
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext();
    changeRoute(actual.next);
  }, [embla, changeRoute]);
  const onDragEnd = useCallback(() => {
    if (!embla) return;
    //changeRoute();
  }, [embla, changeRoute]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    //embla.on('pointerUp', onDragEnd)
    //onSelect();
  }, [embla, onSelect, onDragEnd]);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {
            slides.map((slide: any, index: number) => {
              console.log(slide);
              return (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <DynamicComponentMatcher
                      view={[slide]}
                    ></DynamicComponentMatcher>
                  </div>
                </div>
              );
            })
            /*[actual.actual, slides[1]].map((slide: any, index: number) => {
              return (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    {
                      <motion.div
                        layoutId="carousel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <DynamicComponentMatcher
                          view={[slide]}
                        ></DynamicComponentMatcher>
                      </motion.div>
                    }
                  </div>
                </div>
              );
            })*/
          }
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};
const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());
export default function CarouselNavigation(props: any) {
  const [emblaRef] = useEmblaCarousel();
  console.log(props);
  return <EmblaCarousel slides={props.slides} actual={props} />;
}
