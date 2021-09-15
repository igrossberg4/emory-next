import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useState, useCallback, useMemo, useContext, useEffect } from "react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { AnimatePresence, motion } from "framer-motion";
import { MD5 } from "object-hash";
import { Context } from "../state/Store";
import { useInView } from "react-intersection-observer";
import { css, cx } from "@emotion/css";
import { animated, useSpring } from "react-spring";
import { useMediaQuery } from "react-responsive";

export interface ButtonEnabled {
  enabled: boolean;
  onClick: () => void;
  href?: string;
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
    disabled={href != undefined ? false : true}
  >
    <svg className="embla__button__svg" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.54267 15.2093L0 7.66668L7.54267 0.124008L8.48533 1.06668L1.88533 7.66668L8.48533 14.2667L7.54267 15.2093Z" fill="#212322"/>
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={href != undefined ? false : true}
  >
    <svg className="embla__button__svg" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.942667 15.2093L8.48533 7.66668L0.942667 0.124008L0 1.06668L6.6 7.66668L0 14.2667L0.942667 15.2093Z" fill="#212322"/>
    </svg>
  </button>
);
export default function EmblaCarousel({
  slides,
  actual,
  navigation,
}: {
  slides: any;
  actual: any;
  navigation: boolean;
}) {
  const router = useRouter();
  const index = actual
    ? slides.findIndex((slide: any) => MD5(slide) === MD5(actual.actual))
    : 0;
  const [[page, direction], setPage] = useState([index, 1]);
  const [state, dispatch] = useContext(Context) as any;
  const [isTransitioning, setTransitioning] = useState(false);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(
    page === 0 ? false : true
  );
  const [nextBtnEnabled, setNextBtnEnabled] = useState(
    page < slides.length - 1 ? false : true
  );

  const changeRoute = useCallback(
    (route, newDirection) => {
      if (route == undefined) return;
      router.push(
        {
          pathname: route,
        },
        route,
        { scroll: false, shallow: false }
      );
    },
    [router]
  );
  const paginate = useCallback(
    (newDirection: number) => {
      setTransitioning(true);
      setPage([page + newDirection, newDirection]);
    },
    [changeRoute, page, slides]
  );
  const scrollPrev = useCallback(() => {
    if (page > 0) {
      paginate(-1);
    }
  }, [paginate, page]);
  const scrollNext = useCallback(() => {
    if (page < slides.length - 1) {
      paginate(1);
    }
  }, [paginate, page]);
  const [refViewport, inView, entry] = useInView({});
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
  }, [inView]); // @ts-ignore
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const memo = useMemo(() => {
    return     <>
    <div
      className={`embla embla--carousel-navigation 
    ${!navigation ? "page-carousel" : ""} 
    ${index !== page ? "transitioning" : ""}`}
    >
      <div
        className={`${css`
          &:before {
            content: " ";
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: ${slides[page].props.view[0].props.isMain ? 1 : 0};
            background-repeat: no-repeat;
            background-position: 50% 0;
            background-size: cover;
            background: url(${require(`../public/images/2036-bg.jpg`)})
              no-repeat center bottom;
          }
        `} embla__viewport`}
        ref={refViewport}
        key={"viewPort"}
      >
        <div>
          <div
            className="embla__container"
          >
            {slides.map((value: any, i: number) => {
              const valueMore = slides[i].props.view[0].props.isMain ? (i > page ? 40 : 30) : 0;
              //value.props.view[0].props.view[0].props.is_selected = i === page;
              return (
                  
                  <div
                  key={MD5(value) + i.toString()}
                    onTransitionEnd={(e)=>{
                      if(page === i && isTransitioning){
                        setTimeout(()=>{
                          changeRoute(slides[page].props.view[0].props.path, 0);

                        }, 300)
                      }
                    }}
                    style={{transform:`translateX(${i < page ? `${(i-page) * ((!isMobile ? 50 : 100) +valueMore)}vw` : page === i ? `0` : `${(i-page) * ((!isMobile ? 50 : 100) + valueMore)}vw`})`}}
                    className={`embla_slide_present ${
                      page === i ? "selected" : "no_selected"
                    } ${i < page ? "first" : ""} ${i > page ? "last" : ""} `}
                  >
                    <div className="embla__slide">
                      <div className="embla__slide__inner">
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
                    </div>
                  </div>

              );
            })}
          </div>
        </div>
      </div>

      <PrevButton
        href={actual ? actual.prev : page === 0 ? "" : "active"}
        onClick={!isTransitioning ? scrollPrev : ()=>{}}
        enabled={prevBtnEnabled && !isTransitioning}
      />
      <NextButton
        href={
          actual ? actual.next : page === slides.length - 1 ? "" : "active"
        }
        onClick={!isTransitioning ? scrollNext : ()=>{}}
        enabled={nextBtnEnabled && !isTransitioning}
      />
    </div>
    {navigation ? (
      <div key={MD5(slides[page].props.view.slice(1))} id="carouselContent">
        <div className="line-separator line-separator--overflowed-top-1-3"></div>
        <DynamicComponentMatcher
          view={[
            {
              component: "DynamicComponentMatcher",
              props: { view: slides[page].props.view.slice(1) },
            },
          ]}
        ></DynamicComponentMatcher>
      </div>
    ) : (
      ""
    )}
  </>
   }, [page, isMobile])
  return (
    memo
  );
}
