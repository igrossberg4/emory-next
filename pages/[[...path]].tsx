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
import { instantiateEmscriptenWasm } from "next/dist/next-server/server/lib/squoosh/emscripten-utils";
import { getNodes } from "../data-loader/get-nodes";
import { MD5 } from "object-hash";
import { useMediaQuery } from "react-responsive";

export default function Home(props: any) {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [innerHeight, setInnerHeight] = useState(
    process.browser ? window.innerHeight : 0
  );
  const [state, dispatch] = useContext(Context) as any;

  // https://codesandbox.io/s/framer-motion-nextjs-page-transitions-d7fwk?file=/pages/about.js:871-877
  const spring = {
    type: "tween",
    duration: 0.65,
    ease: "easeInOut",
  };
  if (process.browser && document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  }
  const handleScroll = useCallback(() => {
    setInnerHeight(window.innerHeight);
    const element = document.getElementById("selected");
    if (element) {
      const activeElement = element.querySelector(".content-header__container");

      if (window.scrollY > 5) {
        activeElement?.setAttribute("data-animation", "active");
      } else {
        activeElement?.setAttribute("data-animation", "no-active");
      }
    }

    if (
      window.scrollY >= 5 &&
      !document.body.classList.contains("is-scrolled")
    ) {
      document.body.classList.add("is-scrolled");

      dispatch({
        type: "GOING_UP",
        payload: true,
      });
    } else if (
      window.scrollY < 5 &&
      document.body.classList.contains("is-scrolled")
    ) {
      document.body.classList.remove("is-scrolled");

      dispatch({
        type: "GOING_UP",
        payload: false,
      });
    }

    setScroll(window.scrollY);
  }, [setScroll, setInnerHeight, scroll, state.goingUp]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
          className="main-container"
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
      </AnimatePresence>
    ) : (
      ""
    );
  }, [router.asPath, state.route, MD5(props.view)]);
  return (
    <Fragment>
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta property="og:image" content={props.meta.image}></meta>
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="preload" href="/fonts/pangram-regular.woff2"></link>
        <link rel="preload" href="/fonts/pangram-bold.woff2"></link>

        <meta name="msapplication-TileColor" content="#f5f4f5" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
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
