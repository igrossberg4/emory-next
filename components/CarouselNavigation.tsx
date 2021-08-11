import Head from "next/head";
import React, { Fragment, useContext, useRef } from "react";
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
const EmblaCarousel = ({ slides, actual }: { slides: any; actual: any }) => {
  const index = slides.findIndex(
    (slide: any) => MD5(slide) === MD5(actual.actual)
  );

  const [[page, direction, isTransitioning], setPage] = useState([
    index,
    1,
    false,
  ]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(
    page === 0 ? false : true
  );
  const [nextBtnEnabled, setNextBtnEnabled] = useState(
    page < slides.length - 1 ? false : true
  );
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection, true]);
  };
  const router = useRouter();
  const changeRoute = useCallback(
    (route) => {
      if (!route) return;
      router.push(
        {
          pathname: route,
        },
        route,
        { scroll: false }
      );
    },
    [router]
  );

  const scrollPrev = useCallback(() => {
    if (page > 0 && !isTransitioning) {
      paginate(-1);
    }
  }, [paginate, page]);
  const scrollNext = useCallback(() => {
    if (page < slides.length -1 && !isTransitioning) {
      paginate(1);
    }
  }, [paginate, page]);
  return (
    <div>
      <div className="embla" key="id-test">
        <div className="embla__viewport" key={"viewPort"}>
          <motion.div
            className="embla__container"
            onTransitionEnd={(e) => {
              changeRoute(direction === 1 ? actual.next : actual.prev);
            }}
            style={{ transform: `translateX(${-page * 100}vw)` }}
          >
            <AnimatePresence>
              {slides.map((value: any, i: number) => {
                //value.props.view[0].props.view[0].props.is_selected = i === page;
                return (
                  <div
                  className={`embla_slide_present ${page === i ?'selected' : 'no_selected'} ${i < page ? 'first' : ''} ${i > page ? 'last' : ''} `}
                  key={MD5(value)}
                  //style={{transform:`translateX(${page === i ? 0 :(page > i ? 100 : -100)}px)`}}
                  >
                  <motion.div
                    drag="x"
                    layout
                    dragPropagation
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                    }}

                    onDrag={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        scrollNext();
                      } else if (swipe > swipeConfidenceThreshold) {
                        scrollPrev();
                      }
                    }}
                    //draggable={true}
                    className="embla__slide"
                  >
                    <div className="embla__slide__inner">
                      <DynamicComponentMatcher
                        key={MD5(value)}
                        view={[
                          {
                            component: "DynamicComponentMatcher",
                            props: { view: [value.props.view[0]] },
                          },
                        ]}
                      ></DynamicComponentMatcher>
                    </div>
                  </motion.div>
                  </div>
                );
              })}
            </AnimatePresence>
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
      <motion.div 
      key={MD5(slides[page].props.view.slice(1))}
      layout layoutId={MD5(slides[page].props.view.slice(1))} id="carouselContent">
        <DynamicComponentMatcher
          view={[
            {
              component: "DynamicComponentMatcher",
              props: { view: slides[page].props.view.slice(1) },
            },
          ]}
        ></DynamicComponentMatcher>
      </motion.div>
    </div>
  );
};
export default function CarouselNavigation(props: any) {
  return <EmblaCarousel key="id" slides={props.slides} actual={props} />;
}
