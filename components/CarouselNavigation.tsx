import Head from "next/head";
import React, { Fragment, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { AnimatePresence, motion } from "framer-motion";
import { MD5 } from "object-hash";
import Link from "next/link";
import { route } from "next/dist/next-server/server/router";
import { Context } from "../state/Store";
import { wrap } from "popmotion";
interface ButtonEnabled {
  enabled: boolean;
  onClick: () => void;
  href: string;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const PrevButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={href ? false : true}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={href ? false : true}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);
const EmblaCarousel = ({
  slides,
  actual,
}: {
  slides: any;
  actual: any;
  current: number;
}) => {
  const index = slides.findIndex(
    (slide) => MD5(slide) === MD5(actual.actual)
  );
  const [[page, direction], setPage] = useState([slides.findIndex(
    (slide) => MD5(slide) === MD5(actual.actual)
  ), 0]);
  console.log(slides.findIndex(
    (slide) => MD5(slide) === MD5(actual.actual)
  ));
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, slides.length, page);
  console.log(slides, page, actual);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(page === 0 ? false : true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(page < slides.length - 1 ? false : true);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const router = useRouter();
  const changeRoute = useCallback(
    (route) => {
      if (!route) return;
      console.log(route);
      router.push(
        {
          pathname: route,
        },
        route,

      );
    },
    [router]
  );

  const scrollPrev = useCallback(() => {
    if (page > 0) {
      paginate(-1);
      changeRoute(actual.prev)
    }

    //dispatch({ type: "MOVE_SLIDE", payload: "back" });
  }, [paginate, page]);
  const scrollNext = useCallback(() => {
    if (page < slides.length) {
      paginate(1);
      changeRoute(actual.next);
    }
    //dispatch({ type: "MOVE_SLIDE", payload: "next" });
  }, [paginate, page]);
  return (
    <div>
    <div className="embla">
      <div className="embla__viewport">
        <motion.div

                       /* custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        layout
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = swipePower(offset.x, velocity.x);

                          if (swipe < -swipeConfidenceThreshold) {
                            scrollNext()
                          } else if (swipe > swipeConfidenceThreshold) {
                            scrollPrev()
                          }
                        }}*/
        className="embla__container" style={{transform: `translateX(${-page*100}%)`}}>
          {
            /* 
                      <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        layout
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = swipePower(offset.x, velocity.x);

                          if (swipe < -swipeConfidenceThreshold) {
                            scrollNext()
                          } else if (swipe > swipeConfidenceThreshold) {
                            scrollPrev()
                          }
                        }}
                      >*/
            slides.map((value, i) => {
              return (

                <div key={i}  className="embla__slide">
                  <div className="embla__slide__inner">
                    <DynamicComponentMatcher
                      
                      view={[
                        {
                          component: "DynamicComponentMatcher",
                          props: { view: [value.props.view[0]] },
                        },
                      ]}
                    ></DynamicComponentMatcher>
                  </div>
                </div>

              );
            }) /*
                        <DynamicComponentMatcher
                          view={[slides[imageIndex]]}
                        ></DynamicComponentMatcher>
                      </motion.div>
                    </AnimatePresence>*/
          }
        </motion.div>
      </div>
      <PrevButton
        href={actual.prev}
        onClick={scrollPrev}
        enabled={prevBtnEnabled}
      />
      <NextButton
        href={actual.next}
        onClick={scrollNext}
        enabled={nextBtnEnabled}
      />
    </div>
    <DynamicComponentMatcher
                          view={[
                            {
                              component: "DynamicComponentMatcher",
                              props: { view: slides[page].props.view.slice(1) },
                            },
                          ]}
                        ></DynamicComponentMatcher>
    </div>
  );
};
export default function CarouselNavigation(props: any) {
  return (
    <EmblaCarousel
      slides={props.slides}
      actual={props}
    />
  );
}
