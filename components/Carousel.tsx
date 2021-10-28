import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useRef,
} from "react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { AnimatePresence, motion } from "framer-motion";
import { MD5 } from "object-hash";
import { Context } from "../state/Store";
import { useInView } from "react-intersection-observer";
import { css, cx } from "@emotion/css";
import { animated, useSpring } from "react-spring";
import { useMediaQuery } from "react-responsive";
function useWindowSize() {
  const getSize = () => {
    return {
      width: process.browser ? window.innerWidth : 0,
      height: process.browser ? window.innerHeight : 0,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const SmoothScroll = ({ active, children }: any) => {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef();

  // 3.
  const data = {
    ease: 0.04,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // 4.
  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    document.body.style.height = `${
      (scrollingContainerRef?.current as any)?.getBoundingClientRect()?.height
    }px`;
  };

  // 5.
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler(active));
  }, [active]);

  const smoothScrollingHandler = useCallback(
    (active) => {
      if (active) {
        data.current = window.scrollY;
        data.previous += (data.current - data.previous) * data.ease;
        data.rounded = Math.round(data.previous * 100) / 100;

        const element = scrollingContainerRef.current;
        if (element) {
          (element as any).style.transform = `translateY(-${data.previous}px)`;
          requestAnimationFrame(() => smoothScrollingHandler(active));
        }
      }

      // Recursive call
    },
    [active, scrollingContainerRef.current, data]
  );

  return (
    <div style={{}} className="parent">
      <div ref={(ref) => (scrollingContainerRef.current = ref as any)}>
        {children}
      </div>
    </div>
  );
};

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
    type="button"
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={href != undefined ? false : true}
  >
    <svg
      className="embla__button__svg"
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.54267 15.2093L0 7.66668L7.54267 0.124008L8.48533 1.06668L1.88533 7.66668L8.48533 14.2667L7.54267 15.2093Z"
        fill="#212322"
      />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    type="button"
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={href != undefined ? false : true}
  >
    <svg
      className="embla__button__svg"
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.942667 15.2093L8.48533 7.66668L0.942667 0.124008L0 1.06668L6.6 7.66668L0 14.2667L0.942667 15.2093Z"
        fill="#212322"
      />
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
  const [state, dispatch] = useContext(Context) as any;
  const [[page, direction], setPage] = useState([index, 1]);
  const [queue, setQueue] = useState([]);
  const [performTransition, setPerformTransition] = useState(false);
  const [isCircleOnAnimation, setTransitioning] = useState(false);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(
    page === 0 ? false : true
  );
  const [nextBtnEnabled, setNextBtnEnabled] = useState(
    page < slides.length - 1 ? false : true
  );
  useEffect(() => {
    const routeChangeStart = () => {
      if (performTransition && isCircleOnAnimation) {
        const newErr = new Error("Abort route");
        (newErr as any).cancelled = true;
        throw newErr;
      }else{
        window.scroll({ top: 0, behavior: "smooth" });
        const scrollbarWidth = window.innerWidth - document.body.scrollWidth;
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    };
    router.events.on("routeChangeStart", routeChangeStart);
    return () => router.events.off("routeChangeStart", routeChangeStart);
  }, [performTransition, isCircleOnAnimation]);

  const changeRoute = useCallback(
    (route, newDirection) => {
      if (route == undefined) return;
      dispatch({ type: "CAROUSEL_NAV", payload: true });
      if (route != router.asPath) {
        router.push(
          {
            pathname: route,
          },
          route,
          { scroll: false, shallow: false }
        );
      } else {
        setTransitioning(false);
        setPerformTransition(false);
      }
    },
    [router]
  );
  const paginate = useCallback(
    (newDirection: number) => {
      setTransitioning(true);
      setPage([page + newDirection, newDirection]);
      setQueue(
        queue.concat(slides[page + newDirection].props.view[0].props.path)
      );
      dispatch({ type: "IS_TRANSITIONING", payload: true });

    },
    [changeRoute, page, slides, queue, setQueue]
  );
  const scrollPrev = useCallback(() => {
    if (page > 0) {
      paginate(-1);
    }
  }, [paginate, page, queue]);
  const scrollNext = useCallback(() => {
    if (page < slides.length - 1) {
      paginate(1);
    }
  }, [paginate, page, queue]);
  const [refViewport, inView, entry] = useInView({});
  useEffect(() => {
    if (performTransition) {
      changeRoute(slides[page].props.view[0].props.path, 0);
    }
  }, [isCircleOnAnimation, performTransition, page, changeRoute]);
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (inView && !state.isCircleExpanded) {
        switch (e.key) {
          case "ArrowLeft":
            scrollPrev();
            return;
          case "ArrowRight":
            scrollNext();
            return;
        }
      }
    },
    [page, inView, scrollNext, scrollPrev, state.isCircleExpanded]
  );
  useEffect(() => {
    document.body.addEventListener("keydown", handleKey, { passive: false });
    return () => document.body.removeEventListener("keydown", handleKey);
  }, [inView, page, queue, state.isCircleExpanded]); // @ts-ignore
  const isSmall = useMediaQuery({ query: `(max-width: 800px)` });
  const isMedium = useMediaQuery({ query: `(max-width: 1000px)` });
  const memo = useMemo(() => {
    return (
      <>
        <div
          id="carousel"
          style={{
            height: process.browser ? window.innerHeight : 'auto'
          }}
          className={`embla embla--carousel-navigation
        ${!navigation ? "page-carousel" : ""}
        ${
          index !== page
            ? `transitioning ${performTransition ? "blocked" : ""}`
            : ""
        }`}
        >
          <div
            className={`
            ${
              slides[page].props.view[0].props.isMain && !state.isCircleExpanded
                ? "background-visible"
                : ""
            }
            ${css`
              &:before {
                display: ${!state.isCircleExpanded ? "block" : "none"};
                width: ${!state.isCircleExpanded ? "100%" : "95%"};
                height: ${!state.isCircleExpanded ? "100%" : "95%"};
                background: ${`url(${require(`../public/images/2036-bg-blur.png`)})
                no-repeat`};
              }
            `} embla__viewport`}
            key={"viewPort"}
          >
            <div>
              <div
                className="embla__container"
                data-route={`${slides[page].props.view[0].props.path}`}
                onTransitionEnd={
                  isCircleOnAnimation
                    ? (e) => {
                        if (
                          e.propertyName === "transform" &&
                          !(e.target as HTMLElement)?.className.includes(
                            "no_selected"
                          ) &&
                          (e.target as HTMLElement)?.className.includes(
                            "selected"
                          ) &&
                          isCircleOnAnimation
                        ) {
                          //e.stopPropagation();

                          setTimeout(() => {
                            setPerformTransition(true);
                          }, 0);
                          setTransitioning(false)
                        }
                      }
                    : undefined
                }
              >
                {slides.map((value: any, i: number) => {
                  // No offset used right now, left here in case it is needed
                  // to be recovered.
                  const valueMore = slides[i].props.view[0].props.isMain
                    ? i > page
                      ? 0
                      : 0
                    : 0;
                  return (
                    <div
                      key={MD5(value) + i.toString()}
                      ref={page === i ? refViewport : undefined}
                      id={page === i && !performTransition ? "selected" : ""}
                      style={{
                        transform: `translateX(${
                          i < page
                            ? `${
                                (i - page) *
                                ((!isSmall ? (isMedium ? 60 : 50) : 100) +
                                  valueMore)
                              }vw`
                            : page === i
                            ? `0`
                            : `${
                                (i - page) *
                                ((!isSmall ? (isMedium ? 60 : 50) : 100) +
                                  valueMore)
                              }vw`
                        })`,
                      }}
                      className={`embla_slide_present ${
                        page === i ? "selected" : "no_selected"
                      } ${i < page ? "first" : ""} ${i > page ? "last" : ""} ${
                        isCircleOnAnimation ? "is-transitioning" : ""
                      }`}
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
            onClick={true ? scrollPrev : () => {}}
            enabled={prevBtnEnabled}
          />
          <NextButton
            href={
              actual ? actual.next : page === slides.length - 1 ? "" : "active"
            }
            onClick={true ? scrollNext : () => {}}
            enabled={nextBtnEnabled}
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
    );
  }, [
    page,
    isSmall,
    isMedium,
    handleKey,
    state.isCircleExpanded,
    performTransition,
    setPerformTransition,
  ]);
  return memo;
}
