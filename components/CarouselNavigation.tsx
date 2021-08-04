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
interface ButtonEnabled {
  enabled: boolean;
  onClick: () => void;
  href: string;
}
export const PrevButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={href ? false : true}
  >
    <Link href={href ? href : ""}>
      <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
        <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
      </svg>
    </Link>
  </button>
);

export const NextButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <Link href={href ? href : ""}>
    <button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={href ? false : true}
    >
      <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
        <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
      </svg>
    </button>
  </Link>
);
const EmblaCarousel = ({ slides, actual }: { slides: any; actual: any }) => {
  const [state, dispatch] = useContext(Context);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  console.log("EOOO", state);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(actual.next != null);
  const router = useRouter();
  const changeRoute = useCallback(
    (route) => {
      if (!route) return;
      console.log(route);
      router.push(
        {
          pathname: route,
        },
        route
        //{ shallow: false }
      );
    },
    [router]
  );

  const scrollPrev = useCallback(() => {
    console.log;
    dispatch({ type: "MOVE_SLIDE", payload: "back" });
    //changeRoute(actual.prev);
  }, [changeRoute]);
  const scrollNext = useCallback(() => {
    //changeRoute(actual.next);
    dispatch({ type: "MOVE_SLIDE", payload: "next" });
  }, [changeRoute]);
  const spring = {
    delay: 0.3,
    duration: 2,

    staggerChildren: 0.17,
    delayChildren: 0.2,
  };
  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          <AnimatePresence>
            {[actual.actual].map((slide, index) => {
              return (
                

                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__inner">
                        {
                          <DynamicComponentMatcher
                            view={[slide]}
                          ></DynamicComponentMatcher>
                        }
                      </div>
                    </div>
              );

            })              
          }</AnimatePresence>
        </div>
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
  );
};
const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());
export default function CarouselNavigation(props: any) {
  return <EmblaCarousel slides={props.slides} actual={props} />;
}
