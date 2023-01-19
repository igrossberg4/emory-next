import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DynamicComponentMatcher from "../components/DynamicComponentMatcher";
import { Fragment, createContext, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Context } from "../state/Store";
import { getNodes } from "../data-loader/get-nodes";
import { MD5 } from "object-hash";
import { useMediaQuery } from "react-responsive";
import { browserName, isMobile, isIOS } from "react-device-detect";
import { videoContainerBottomCalculator } from "../components/utils/videoContainerBottomCalculator";

function getElementXPath(element: any): string {
  if (element.id) {
    return `//*[@id=${element.id}]`;
  } else if (element.tagName === "BODY") {
    return "/html/body";
  } else {
    const sameTagSiblings = Array.from(element.parentNode.childNodes).filter(
      (e) => (e as any).nodeName === element.nodeName
    );
    const idx = sameTagSiblings.indexOf(element);

    return (
      getElementXPath(element.parentNode) +
      "/" +
      element.tagName.toLowerCase() +
      (sameTagSiblings.length > 1 ? `[${idx + 1}]` : "")
    );
  }
}

export default function Home(props: any) {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);
  const scrollVar = 5;
  const [innerHeight, setInnerHeight] = useState(
    process.browser ? window.innerHeight : 0
  );
  const [state, dispatch] = useContext(Context) as any;
  useEffect(() => {
    if (isMobile && !document.body.classList.contains("is-mobile")) {
      document.body.classList.add("is-mobile");
      if (isIOS) {
        document.body.classList.add("is-ios");
      }
    }
  }, []);
  const circleAnimateExpand = useCallback(() => {
    const element = document.getElementById("selected");
    document.body.classList.add("is-scrolled");
    dispatch({ type: "IS_TRANSITIONING", payload: true });

    dispatch({
      type: "GOING_UP",
      payload: true,
    });

    if (element) {
      const activeElement = element.querySelector(".content-header__container");
      activeElement?.setAttribute("data-animation", "active");
    } else {
      // Handler for independent pages. The use the same name class, but there's not selected id.
      const activeElement = document.querySelector(
        ".content-header__container"
      );
      if (activeElement) {
        activeElement?.setAttribute("data-animation", "active");
      }
    }

    setTimeout(() => {
      dispatch({ type: "IS_TRANSITIONING", payload: false });
    }, 600);
  }, []);

  const circleAnimateCollapse = useCallback(() => {
    document.body.classList.remove("is-scrolled");
    dispatch({ type: "IS_TRANSITIONING", payload: true });
    dispatch({
      type: "GOING_UP",
      payload: false,
    });
    setTimeout(() => {
      dispatch({ type: "IS_TRANSITIONING", payload: false });
    }, 600);
    const element = document.getElementById("selected");
    if (element) {
      const activeElement = element.querySelector(".content-header__container");
      activeElement?.setAttribute("data-animation", "no-active");
    } else {
      // Handler for independent pages. The use the same name class, but there's not selected id.
      const activeElement = document.querySelector(
        ".content-header__container"
      );
      if (activeElement) {
        activeElement?.setAttribute("data-animation", "no-active");
      }
    }
  }, []);

  const circleAnimateMinimunScroll = 50;

  const circleAnimateExpandLaunch = useCallback(
    (
      isCircleOnAnimation: boolean,
      isCircleExpanded: boolean,
      isOverlayExpanded: boolean
    ) => {
      const circleAnimateMinimunScroll = 50;

      if (!isCircleOnAnimation && !isCircleExpanded && !isOverlayExpanded) {
        circleAnimateExpand();

        // If we are on ~top
        if (
          window.scrollY < circleAnimateMinimunScroll &&
          circleAnimatePreventScrollEnabled
        ) {
          // Scroll automatically a little bit as the human scroll is frozen (to behave similar but controlled).
          // Also, avoid excesssive jumps that might generate excessive whitespace on these two scenarios:
          // 1 - Portrait orientations
          // 2 - Short viewports
          // Also, avoid jumps of more than 200px.
          const ratio = window.innerWidth / window.innerHeight;
          const heightThreshold = 450; // heept this in sync with $carousel-min-height
          const targetHeight =
            ratio >= 1 && window.innerHeight > heightThreshold
              ? window.innerHeight / 4
              : 50;

          window.scroll({
            top: targetHeight > 200 ? 200 : targetHeight,
            behavior: "smooth",
          });
        }
      }
    },
    []
  );

  const circleAnimateCollapseLaunch = useCallback(
    (
      isCircleOnAnimation: boolean,
      isCircleExpanded: boolean,
      isOverlayExpanded: boolean
    ) => {
      const circleAnimateMinimunScroll = 150;

      if (
        window.scrollY < circleAnimateMinimunScroll &&
        !isCircleOnAnimation &&
        isCircleExpanded &&
        !isOverlayExpanded
      ) {
        circleAnimateCollapse();
        const element = document.getElementById("header");
        if (element) {
          element.classList.remove("hide");
        }

        // If we are on ~top:
        if (window.scrollY < 200 && circleAnimatePreventScrollEnabled) {
          // Scroll automatically to top bit as the human scroll is frozen (to behave similar but controlled):
          // window.scroll({ top: 0 , behavior: "smooth" });
        }
      }
    },
    []
  );

  // https://codesandbox.io/s/framer-motion-nextjs-page-transitions-d7fwk?file=/pages/about.js:871-877
  const spring = {
    type: "tween",
    duration: 0.65,
    ease: "easeInOut",
  };
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerHeight;
      const width = window.innerWidth;
      document
        .querySelectorAll(".container-force-screen-fit-y")
        .forEach((item) => {
          (item as HTMLElement).style.height = `${newHeight}px`;
        });

      const carousel = document.querySelector(".embla--carousel-navigation");
      if (carousel instanceof HTMLElement) {
        carousel.style.height = `${newHeight}px`;
      }

      const videoElement = document.getElementById("video-container");
      if (videoElement) {
        videoElement.style.marginBottom = isMobile
          ? videoContainerBottomCalculator(window)
          : (undefined as any);
      }
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [router.asPath, isMobile]);
  useEffect(() => {
    const handleFocus = () => {
      if (state.activeFocusXPATH.includes("*[@id=carousel]")) {
        const element = document.evaluate(
          "//html" + state.activeFocusXPATH.replace("carousel", '"carousel"'),
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (element != null) {
          let elementFocusable = document.querySelector(
            (element as any).className
              .split(" ")
              .map((value: string) => `.${value}`)
              .join("")
          );
          elementFocusable.focus();
        }
      }
      setTimeout(() => {
        document.body.style.overflowY = "visible";
        document.body.style.paddingRight = "";
        if (window.scrollY > 0) {
          circleAnimateExpandLaunch(
            state.isCircleOnAnimation,
            state.isCircleExpanded,
            state.isOverlayExpanded
          );
        }
        dispatch({ type: "IS_TRANSITIONING", payload: false });
        dispatch({ type: "IS_OVERLAY_EXPANDED", payload: false });
      }, 300);
    };

    router.events.on("routeChangeComplete", handleFocus);
    return () => {
      router.events.off("routeChangeComplete", handleFocus);
    };
  }, [
    router.events,
    state.activeFocusXPATH,
    state.isCircleOnAnimation,
    state.isCircleExpanded,
    state.isOverlayExpanded,
  ]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > 49 &&
        !document.body.classList.contains("is-scrolled")
      ) {
        // We need to bypass the handler for avoid a race condition and to many events to be fired.
        circleAnimateExpand();
        const element = document.getElementById("header");
        if (element) {
          element.classList.add("hide");
        }
      } else {
        if (
          document.body.classList.contains("is-scrolled") &&
          window.scrollY < 20
        ) {
          // We need to bypass the handler for avoid a race condition and to many events to be fired.
          circleAnimateCollapse();

          const element = document.getElementById("header");

          if (element) {
            element.classList.add("hide");
          }
        }
      }
    };
    handleScroll();
    //window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router.asPath]); // @ts-ignore
  // The effect for compute mousedown and mouseup event for using scroll bar.
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      // We need to check if the mouse is in the scroll bar.
      if (e.clientX > document.body.offsetWidth) {
        // This is the calculated scroll.
        const calculatedScroll = e.offsetY - e.clientY;
        // When mouse is going down,
        if (
          (window.scrollY > 30 || calculatedScroll > 30) &&
          !document.body.classList.contains("is-scrolled")
        ) {
          // We need to bypass the handler for avoid a race condition and to many events to be fired.
          circleAnimateExpand();
          const element = document.getElementById("header");
          if (element) {
            element.classList.add("hide");
          }
        } else {
          // If mouse is going up.
          if (
            document.body.classList.contains("is-scrolled") &&
            (window.scrollY < 20 || calculatedScroll < 20)
          ) {
            // We need to bypass the handler for avoid a race condition and to many events to be fired.
            circleAnimateCollapse();

            const element = document.getElementById("header");

            if (element) {
              element.classList.remove("hide");
            }
          }
        }
      }
      /**/
    };
    window.addEventListener("mousedown", handleScroll, { passive: true });
    window.addEventListener("mouseup", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mouseup", handleScroll);
      window.removeEventListener("mousedown", handleScroll);
    };
  }, [router.asPath]);

  const circleAnimatePreventScrollEnabled = true;

  /**
   * Prevent scroll on circle animation.
   */
  const circleAnimatePreventScroll = useCallback(
    (
      e: Event,
      isCircleOnAnimation: boolean,
      isCircleExpanded: boolean,
      scrollY: number,
      isGoingDown: boolean
    ) => {
      const isMenu =
        e.target instanceof HTMLElement &&
        (e.target.closest(".menu-main") || e.target.closest(".menu-schools"));
      if (
        !isMenu &&
        circleAnimatePreventScrollEnabled &&
        scrollY < circleAnimateMinimunScroll &&
        ((!isCircleExpanded && isGoingDown) ||
          (isCircleExpanded && !isGoingDown) ||
          isCircleOnAnimation)
      ) {
        e.preventDefault();
        return true;
      }
    },
    []
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const carouselContentElement = document.getElementById("carouselContent");
      const carouselContentHeight = carouselContentElement?.offsetHeight
        ? carouselContentElement.offsetHeight
        : 0;
      const path = getElementXPath(document.activeElement);

      if (path.includes("*[@id=carousel]")) {
        dispatch({
          type: "ACTIVE_FOCUS_KEY_PATH",
          payload: getElementXPath(document.activeElement),
        });
      }

      if ([" ", "ArrowDown", "PageDown", "End"].indexOf(e.key) > -1) {
        // Handler for accesibility in menu and carousel arrows. We must guarantee that space works when these elements are focused.
        if (
          e.key === " " &&
          (path.includes("menu-button") || path.includes("@id=carousel"))
        ) {
          return;
        }
        circleAnimatePreventScroll(
          e,
          state.isCircleOnAnimation,
          state.isCircleExpanded,
          window.scrollY,
          true
        );
        circleAnimateExpandLaunch(
          state.isCircleOnAnimation,
          state.isCircleExpanded,
          state.isOverlayExpanded
        );
      }

      if (["ArrowUp", "PageUp", "Home"].indexOf(e.key) > -1) {
        circleAnimatePreventScroll(
          e,
          state.isCircleOnAnimation,
          state.isCircleExpanded,
          window.scrollY,
          false
        );
        circleAnimateCollapseLaunch(
          state.isCircleOnAnimation,
          state.isCircleExpanded,
          state.isOverlayExpanded
        );
      }

      // Case End
      /*
      if (e.key === "Home") {
        window.scroll({ top: 0, behavior: "smooth" });
        circleAnimateCollapse();
      }
*/
    },
    [
      dispatch,
      state.isCircleExpanded,
      state.isCircleOnAnimation,
      state.isOverlayExpanded,
    ]
  );
  useEffect(() => {
    document.body.addEventListener("keydown", handleKey, { passive: false });
    return () => document.body.removeEventListener("keydown", handleKey);
  }, [handleKey]); // @ts-ignore
  const handleFocus = useCallback((e: FocusEvent) => {}, []);
  useEffect(() => {
    document.addEventListener("focusin", handleFocus, { passive: false });
    return () => document.removeEventListener("focusin", handleFocus);
  }, [handleFocus]); // @ts-ignore
  useEffect(() => {
    if (process.browser && document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
    }
  }, []);

  var supportsPassive = true;
  /*try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    as any);
  } catch (e) {}*/
  const wheelOpt = supportsPassive ? { passive: false } : false;
  const wheelEvent = process.browser
    ? "onwheel" in document.createElement("div")
      ? "wheel"
      : "mousewheel"
    : "mousewheel";

  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      // Prevent is scroll:
      circleAnimatePreventScroll(
        e,
        state.isCircleOnAnimation,
        state.isCircleExpanded,
        window.scrollY,
        e.deltaY > 0
      );
      if (router.isReady) {
        // Launch circle animation:
        if (e.deltaY > 0) {
          circleAnimateExpandLaunch(
            state.isCircleOnAnimation,
            state.isCircleExpanded,
            state.isOverlayExpanded
          );
        } else {
          circleAnimateCollapseLaunch(
            state.isCircleOnAnimation,
            state.isCircleExpanded,
            state.isOverlayExpanded
          );
        }
      }
    };
    window.addEventListener("DOMMouseScroll", preventDefault as any, false); // older FF
    window.addEventListener(wheelEvent, preventDefault as any, wheelOpt); // modern desktop
    //window.addEventListener("touchmove", preventDefault as any, wheelOpt); // mobile
    //window.addEventListener('touchstart', preventDefault as any, wheelOpt);

    //window.addEventListener("keydown", preventDefaultForScrollKeys, false);

    return () => {
      window.removeEventListener("DOMMouseScroll", preventDefault as any);
      window.removeEventListener(wheelEvent, preventDefault as any);
      //window.removeEventListener("touchmove", preventDefault as any);
      //window.removeEventListener('touchstart', preventDefault as any, wheelOpt);
      // window.removeEventListener("keydown", preventDefaultForScrollKeys);
    };
  }, [
    state.isCircleExpanded,
    state.isCircleOnAnimation,
    router.isReady,
    state.isOverlayExpanded,
  ]);
  const [touchScrollPosition, setTouchScrollPosition] = useState(0);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.type === "touchstart") {
        setTouchScrollPosition(e.touches[0].clientY);
      }
      if (e.type === "touchmove") {
        const te = e.changedTouches[0].clientY;
        const isUp = touchScrollPosition > te;
        circleAnimatePreventScroll(
          e,
          state.isCircleOnAnimation,
          state.isCircleExpanded,
          window.scrollY,
          isUp
        );
        if (router.isReady) {
          if (isUp) {
            circleAnimateExpandLaunch(
              state.isCircleOnAnimation,
              state.isCircleExpanded,
              state.isOverlayExpanded
            );
          } else {
            circleAnimateCollapseLaunch(
              state.isCircleOnAnimation,
              state.isCircleExpanded,
              state.isOverlayExpanded
            );
          }
        }

        //setTouchScrollPosition(e.touches[0].clientY);
      }
    };

    window.addEventListener("touchmove", preventDefault as any, wheelOpt); // mobile
    window.addEventListener("touchstart", preventDefault as any, wheelOpt);

    return () => {
      window.removeEventListener("touchmove", preventDefault as any);
      window.removeEventListener("touchstart", preventDefault as any);
    };
  }, [
    touchScrollPosition,
    state.isCircleOnAnimation,
    state.isCircleExpanded,
    router.isReady,
    state.isOverlayExpanded,
  ]);

  const variants = {
    initialWithRoute: {
      // Load new route in overlay
      //y: scroll < innerHeight ? scroll : innerHeight,
      y: innerHeight,
    },
    animateWithRoute: {
      // End transition overlay (new section)
      y: 0,
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 },
      zIndex: -1,
      position: "absolute",
    },
  };
  const memo = useMemo(() => {
    return props.skipTransitionAnimations !== true ? (
      <AnimatePresence>
        <motion.div
          className={`main-container ${
            props.view[1].props.isMain && !state.comesFromCarousel
              ? "full_video"
              : ""
          }`}
          id={state.route + " --- " + state.route}
          onAnimationComplete={() => {
            if (state.route !== "") {
              dispatch({ type: "SET_NAV", payload: "" });
            }
          }}
          key={router.asPath}
          transition={spring}
          // Need to type as any because not all variants have the same properties and brings errors on build.
          variants={variants as any}
          initial={
            state.route !== "" && state.route === router.asPath
              ? "initialWithRoute"
              : false
          }
          animate={
            state.route !== "" && state.route === router.asPath
              ? "animateWithRoute"
              : "animate"
          }
          // Need to type as any because types differs and brings errors on build.
          exit={state.route !== "" ? ("exit" as any) : false}
        >
          <DynamicComponentMatcher
            key={state.route}
            view={props.view}
          ></DynamicComponentMatcher>
        </motion.div>
        {/* Watermark is here to prevent disapperance when scrolling carousel and flickering */}
        <div className="watermark">
          <Image
            src="/logos/emory-university-logo.svg"
            alt="EMORY"
            width="70px"
            height="15px"
          ></Image>
        </div>
      </AnimatePresence>
    ) : (
      ""
    );
  }, [router.asPath, state.route, MD5(props.view), state.comesFromCarousel]);

  return (
    <Fragment>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5VDCSNB');`,
          }}
        ></script>
        <title>{props.meta.title}</title>
        {props.meta.robots ? (
          <meta name="robots" content={props.meta.robots} />
        ) : (
          ""
        )}
        <meta name="description" content={props.meta.description} />
        <meta property="og:image" content={props.meta.image}></meta>
        {props.meta.og_description ? (
          <meta property="og:description" content={props.meta.og_description} />
        ) : (
          ""
        )}

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
          crossOrigin="use-credentials"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/pangram-regular.woff2"
          crossOrigin={"true"}
        ></link>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/pangram-bold.woff2"
          crossOrigin={"true"}
        ></link>
        <link
          rel="preload"
          as="font"
          type="font/woff"
          href="/fonts/ampersand-medium.woff"
          crossOrigin={"true"}
        ></link>

        <meta name="msapplication-TileColor" content="#f5f4f5" />
        <meta name="theme-color" content="#ffffff"></meta>

        {/* Allow custom CSS on the page level */}
        {props.meta.custom_css ? (
          <style
            dangerouslySetInnerHTML={{
              __html: props.meta.custom_css,
            }}
          ></style>
        ) : null}
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5VDCSNB" title="google tag manager" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      ></noscript>
      {memo}
    </Fragment>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: { path: [] } }) {
  const joinPath = params.path ? params.path.join("/") : "";
  const findPath = getNodes().paths.find((value) => value.path === joinPath);
  return {
    props: findPath,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  /*const posts = [{id:1}, {id:2}, {id:3}, {id:"dos/tres"}];

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { path: post.id.toString().split('/') },
    }))
  */
  const paths = getNodes().paths.map((post) => ({
    params: { path: post.path.toString().split("/") },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
}
