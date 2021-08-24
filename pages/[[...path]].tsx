import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DynamicComponentMatcher from "../components/DynamicComponentMatcher";
import { Fragment, createContext, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Context } from "../state/Store";
import { instantiateEmscriptenWasm } from "next/dist/next-server/server/lib/squoosh/emscripten-utils";
import { getNodes } from "../data-loader/get-nodes";

export default function Home(props: any) {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  // https://codesandbox.io/s/framer-motion-nextjs-page-transitions-d7fwk?file=/pages/about.js:871-877
  const spring = {
    duration: 0.35,
  };

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY);
    setInnerHeight(window.innerHeight);
  }, [setScroll, setInnerHeight]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const [state, dispatch] = useContext(Context) as any;

  const variants = {
    initialWithRoute: {
      // Load new route in overlay
      //y: scroll < innerHeight ? scroll : innerHeight,
      y:innerHeight,
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
      zIndex: -1,
      position: "absolute",
    },
  };
  return (
    <Fragment>
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta property="og:image"   content={props.meta.image}></meta>
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
        <meta name="msapplication-TileColor" content="#f5f4f5" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      {props.skipTransitionAnimations !== true ? (
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
            // layout={true}
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
        <AnimatePresence>
          <DynamicComponentMatcher
            key={state.route}
            view={props.view}
          ></DynamicComponentMatcher>
        </AnimatePresence>
      )}
    </Fragment>
  );
}

const introComponent = {
  path: "",
  skipTransitionAnimations: true,
  meta: { title: "Emory intro", description: "Some description for intro" },
  view: [
    {
      component: "IntroPage",
      props: {
        video_src: "video.mp4",
        text_play: "Begin\r\nyour\r\nexperience",
        text_skip: "Skip video",
        route_to: "/home",
      },
    },
  ],
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: { path: [] } }) {
  const joinPath = params.path ? params.path.join("/") : "";
  const findPath = getNodes()
    .paths.concat(introComponent as any)
    .find((value) => value.path === joinPath);
  return {
    props: findPath,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
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
  const paths = getNodes()
    .paths.concat(introComponent as any)
    .map((post) => ({
      params: { path: post.path.toString().split("/") },
    }));
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
}
