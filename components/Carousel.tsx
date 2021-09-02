import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useState, useCallback, useMemo, useContext, useEffect } from "react";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
import { AnimatePresence, motion } from "framer-motion";
import { MD5 } from "object-hash";
import { Context } from "../state/Store";
import { useInView } from "react-intersection-observer";
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
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick, href }: ButtonEnabled) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={href != undefined ? false : true}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
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
        { scroll: false, shallow:false }
      );
    },
    [router]
  );
  const paginate = useCallback((newDirection: number) => {
    setTransitioning(true);
    setPage([page + newDirection, newDirection]);
  }, [changeRoute, page, slides]);
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
  }, [inView]); // @ts-ignore

  const memo = useMemo(() => {
    return <AnimatePresence>
    <div
      className={`embla embla--carousel-navigation 
      ${!navigation ? "page-carousel" : ""} 
      ${index !== page? 'transitioning' : ''}`}
    >
        <div ref={refViewport} className="embla__viewport" key={"viewPort"}>
          <motion.div
            drag={inView ? "x" : undefined}
            layout
            dragPropagation
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 20 },
            }}
            onDrag={(e, { offset, velocity }) => {
              if (inView) {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  scrollNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  scrollPrev();
                }
              }
            }}
          >
              <div
                className="embla__container"
                onTransitionEnd={(e) => {
                  var target = e.target as Element;
                  if (inView) {
                    if (
                      target.className === "embla__container" &&
                      navigation === true
                    ) {
                      dispatch({ type: "CAROUSEL_NAV", payload:true})
                      changeRoute(slides[page].props.view[0].props.path, 0);
                    } else {
                      setTransitioning(false);
                    }
                  }
                }}
                style={{ transform: `translateX(${-page * 100}vw)` }}
              >
                {slides.map((value: any, i: number) => {
                  //value.props.view[0].props.view[0].props.is_selected = i === page;
                  return (<AnimatePresence  key={MD5(value) + i.toString()}>
                    <div
                      className={`embla_slide_present ${
                        page === i ? "selected" : "no_selected"
                      } ${i < page ? "first" : ""} ${i > page ? "last" : ""} `}
                     
                      //style={{transform:`translateX(${page === i ? 0 :(page > i ? 100 : -100)}px)`}}
                    >
                      <div
                        className="embla__slide"
                      >
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
                    </AnimatePresence>
                  );
                })}
            </div>
          </motion.div>
        </div>

      <PrevButton
        href={actual ? actual.prev : page === 0 ? "" : "active"}
        onClick={scrollPrev}
        enabled={prevBtnEnabled && !isTransitioning}
      />
      <NextButton
        href={
          actual ? actual.next : page === slides.length - 1 ? "" : "active"
        }
        onClick={scrollNext}
        enabled={nextBtnEnabled && !isTransitioning}
      />
    </div>
    {navigation ? (
      <div
        key={MD5(slides[page].props.view.slice(1))}
        id="carouselContent"
      >
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
  </AnimatePresence>
  }, [page, inView])
  return (
    memo

  );
}
