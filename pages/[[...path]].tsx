import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DynamicComponentMatcher from "../components/DynamicComponentMatcher";
import { Fragment, createContext, useReducer } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Context } from "../state/Store";
import {instantiateEmscriptenWasm} from "next/dist/next-server/server/lib/squoosh/emscripten-utils";

export default function Home(props: any) {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  // https://codesandbox.io/s/framer-motion-nextjs-page-transitions-d7fwk?file=/pages/about.js:871-877
  const spring = {
    duration: 1,
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
      y: scroll < innerHeight ? scroll : innerHeight,
    },
    animateWithRoute: {
      // End transition overlay (new section)
      y: 0,
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
    }
  }

  return (
    <Fragment>
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      {
      props.skipTransitionAnimations !== true  ? (
        <AnimatePresence>
          <motion.div
            className="main-container"
            id={router.asPath + ' ---- ' + state.route}
            onAnimationComplete={() => {
              if (state.route !== "") {
                dispatch({ type: "SET_NAV", payload: "" });
              }
            }}
            key={router.asPath}
            // layout={true}
            transition={spring}
            variants={variants}
            initial={state.route === router.asPath ? "initialWithRoute" : false }
            animate={state.route === router.asPath ? "animateWithRoute" : "animate"}
            exit={{
              opacity: 0,
              zIndex: -1,
              position: "absolute",
            }}
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

const menuExample = {
  component: "MenuTop",
  props: {
    title: "Menu",
    options: [
      {
        link_to: "/",
        title: "Home",
      },
    ],
  },
};
const slide_1 = {
  component: "DynamicComponentMatcher",
  props: {
    view: [
      {
        component: "DynamicComponentMatcher",
        props: {
          view: [
            //menuExample,
            {
              component: "CarouselItem",
              props: {
                header: "Building on Emory's commitment to serve humanity",
                button_scroll: "Scroll to explore",
                action: {
                  type: "navigate",
                  route_to: "/landing/another/thing",
                },
                img_src: "/collegue_arts.jpg",
              },
            },
          ],
        },
      },

      {
        component: "ImageTextOneColumn",
        props: {
          header: "Header 2",
          background_image: "bg_brain.jpg",

          text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done
          convallis dictum elit at feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu
          leo viverra, ornare mauris vitae, scelerisque leo. Sed at tortor eu
          justo feugiat porttitor. Quisque tortor nibh, interdum vitae purus a,
          porttitor pretium est. Aenean sed mi semper, sodales urna rutrum,
          consequat risus. Integer at nulla purus. In finibus, nulla ac viverra
          aliquam, sem velit elementum erat, eget lacinia ipsum sapien eget
          enim. Sed congue vitae nisl ut porta. Sed placerat ante nibh, non
          laoreet massa eleifend sed. Praesent non pulvinar leo, at hendrerit
          urna. Quisque ac laoreet libero, at ullamcorper orci.</p> <p>Suspendisse eget
          nulla eu nibh condimentum pellentesque. Duis id neque tincidunt,
          ultricies lacus id, egestas erat. Donec non rutrum augue. Etiam ipsum
          odio, facilisis at molestie in, cursus in lacus. Etiam ut tincidunt
          erat. Sed vel volutpat lectus, tincidunt scelerisque erat. Donec a
          turpis et nisi malesuada scelerisque nec in lectus. Cras molestie,
          eros non auctor rutrum, sapien nunc tincidunt mauris, vitae rhoncus
          libero sapien eu elit. Phasellus vitae feugiat velit, ut iaculis ante.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Vestibulum non urna nibh. Nunc laoreet lectus
          sit amet erat sagittis, at laoreet lectus interdum. Duis rutrum, nisi
          ac posuere rutrum, elit odio faucibus dui, commodo posuere libero
          tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed
          tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin
          imperdiet nec leo eu egestas.</p>`,
          img_src: "/collegue_arts.jpg",
          media_src: "/collegue_arts.jpg",
          media_alt: "Duis rutrum, nisiac posuere rutrum, elit odio faucibus dui.",
          media_type: "image",
          media_header: 'Image title',
          media_text: 'Duis rutrum, nisiac posuere rutrum, elit odio faucibus dui, commodo posuere libero tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin imperdiet nec leo eu egestas.',
        },
      },

      {
        component: "AccordionComponent",
        props: {
          items: [
            {
              title: "Accordion title",
              description: "Accordion description",
            },
            {
              title: "Accordion title",
              description: "Accordion description",
            },
          ],
        },
      },
      {
        component: "BottomNavigation",
        props: {
          previous_title: "Previous title",
          next_title: "Next title",
          previous_route: "/landing/carousel/second",
          next_route: "/landing/carousel/third",
        },
      },
    ],
  },
};

const slide_2 = {
  component: "DynamicComponentMatcher",
  props: {
    view: [
      {
        component: "DynamicComponentMatcher",
        props: {
          view: [
            //menuExample,
            {
              component: "CarouselItem",
              props: {
                header: "Building on Emory's commitment to serve humanity 2",
                button_scroll: "Scroll to explore",
                action: {
                  type: "navigate",
                  route_to: "/landing/another/thing",
                },
                img_src: "/vercel.svg",
              },
            },
          ],
        },
      },

      {
        component: "ImageTextOneColumn",
        props: {
          header: "Header 2",
          background_image: "bg_brain.jpg",

          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done
          convallis dictum elit at feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu
          leo viverra, ornare mauris vitae, scelerisque leo. Sed at tortor eu
          justo feugiat porttitor. Quisque tortor nibh, interdum vitae purus a,
          porttitor pretium est. Aenean sed mi semper, sodales urna rutrum,
          consequat risus. Integer at nulla purus. In finibus, nulla ac viverra
          aliquam, sem velit elementum erat, eget lacinia ipsum sapien eget
          enim. Sed congue vitae nisl ut porta. Sed placerat ante nibh, non
          laoreet massa eleifend sed. Praesent non pulvinar leo, at hendrerit
          urna. Quisque ac laoreet libero, at ullamcorper orci. Suspendisse eget
          nulla eu nibh condimentum pellentesque. Duis id neque tincidunt,
          ultricies lacus id, egestas erat. Donec non rutrum augue. Etiam ipsum
          odio, facilisis at molestie in, cursus in lacus. Etiam ut tincidunt
          erat. Sed vel volutpat lectus, tincidunt scelerisque erat. Donec a
          turpis et nisi malesuada scelerisque nec in lectus. Cras molestie,
          eros non auctor rutrum, sapien nunc tincidunt mauris, vitae rhoncus
          libero sapien eu elit. Phasellus vitae feugiat velit, ut iaculis ante.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Vestibulum non urna nibh. Nunc laoreet lectus
          sit amet erat sagittis, at laoreet lectus interdum. Duis rutrum, nisi
          ac posuere rutrum, elit odio faucibus dui, commodo posuere libero
          tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed
          tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin
          imperdiet nec leo eu egestas.`,
          media_src: "/collegue_arts.jpg",
          media_type: "image",
          media_alt: "Duis rutrum, nisiac posuere rutrum, elit odio faucibus dui.",
          image_expand_id: "image_expanded_test",
          button_close_text: "Close",
        },
      },
      {
        component: "ImageTextOneColumn",
        props: {
          header: "Header 2",
          background_image: "bg_brain.jpg",

          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done
          convallis dictum elit at feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu
          leo viverra, ornare mauris vitae, scelerisque leo. Sed at tortor eu
          justo feugiat porttitor. Quisque tortor nibh, interdum vitae purus a,
          porttitor pretium est. Aenean sed mi semper, sodales urna rutrum,
          consequat risus. Integer at nulla purus. In finibus, nulla ac viverra
          aliquam, sem velit elementum erat, eget lacinia ipsum sapien eget
          enim. Sed congue vitae nisl ut porta. Sed placerat ante nibh, non
          laoreet massa eleifend sed. Praesent non pulvinar leo, at hendrerit
          urna. Quisque ac laoreet libero, at ullamcorper orci. Suspendisse eget
          nulla eu nibh condimentum pellentesque. Duis id neque tincidunt,
          ultricies lacus id, egestas erat. Donec non rutrum augue. Etiam ipsum
          odio, facilisis at molestie in, cursus in lacus. Etiam ut tincidunt
          erat. Sed vel volutpat lectus, tincidunt scelerisque erat. Donec a
          turpis et nisi malesuada scelerisque nec in lectus. Cras molestie,
          eros non auctor rutrum, sapien nunc tincidunt mauris, vitae rhoncus
          libero sapien eu elit. Phasellus vitae feugiat velit, ut iaculis ante.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Vestibulum non urna nibh. Nunc laoreet lectus
          sit amet erat sagittis, at laoreet lectus interdum. Duis rutrum, nisi
          ac posuere rutrum, elit odio faucibus dui, commodo posuere libero
          tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed
          tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin
          imperdiet nec leo eu egestas.`,
          image_expand_id: "image_expanded_test",
          button_close_text: "Close",
          media_src: "/video.mp4",
          media_type: "video",
        },
      },
      {
        component: "ImageTextOneColumn",
        props: {
          header: "Header 2",
          background_image: "bg_brain.jpg",

          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done
          convallis dictum elit at feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu
          leo viverra, ornare mauris vitae, scelerisque leo. Sed at tortor eu
          justo feugiat porttitor. Quisque tortor nibh, interdum vitae purus a,
          porttitor pretium est. Aenean sed mi semper, sodales urna rutrum,
          consequat risus. Integer at nulla purus. In finibus, nulla ac viverra
          aliquam, sem velit elementum erat, eget lacinia ipsum sapien eget
          enim. Sed congue vitae nisl ut porta. Sed placerat ante nibh, non
          laoreet massa eleifend sed. Praesent non pulvinar leo, at hendrerit
          urna. Quisque ac laoreet libero, at ullamcorper orci. Suspendisse eget
          nulla eu nibh condimentum pellentesque. Duis id neque tincidunt,
          ultricies lacus id, egestas erat. Donec non rutrum augue. Etiam ipsum
          odio, facilisis at molestie in, cursus in lacus. Etiam ut tincidunt
          erat. Sed vel volutpat lectus, tincidunt scelerisque erat. Donec a
          turpis et nisi malesuada scelerisque nec in lectus. Cras molestie,
          eros non auctor rutrum, sapien nunc tincidunt mauris, vitae rhoncus
          libero sapien eu elit. Phasellus vitae feugiat velit, ut iaculis ante.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Vestibulum non urna nibh. Nunc laoreet lectus
          sit amet erat sagittis, at laoreet lectus interdum. Duis rutrum, nisi
          ac posuere rutrum, elit odio faucibus dui, commodo posuere libero
          tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed
          tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin
          imperdiet nec leo eu egestas.`,
          image_expand_id: "image_expanded_test",
          button_close_text: "Close",
          media_src: "/collegue_arts.jpg",
          media_type: "image",
          media_alt: "Duis rutrum, nisiac posuere rutrum, elit odio faucibus dui.",
        },
      },
      {
        component: "ImageTextOneColumn",
        props: {
          header: "Header 2",
          background_image: "bg_brain.jpg",

          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done
          convallis dictum elit at feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu
          leo viverra, ornare mauris vitae, scelerisque leo. Sed at tortor eu
          justo feugiat porttitor. Quisque tortor nibh, interdum vitae purus a,
          porttitor pretium est. Aenean sed mi semper, sodales urna rutrum,
          consequat risus. Integer at nulla purus. In finibus, nulla ac viverra
          aliquam, sem velit elementum erat, eget lacinia ipsum sapien eget
          enim. Sed congue vitae nisl ut porta. Sed placerat ante nibh, non
          laoreet massa eleifend sed. Praesent non pulvinar leo, at hendrerit
          urna. Quisque ac laoreet libero, at ullamcorper orci. Suspendisse eget
          nulla eu nibh condimentum pellentesque. Duis id neque tincidunt,
          ultricies lacus id, egestas erat. Donec non rutrum augue. Etiam ipsum
          odio, facilisis at molestie in, cursus in lacus. Etiam ut tincidunt
          erat. Sed vel volutpat lectus, tincidunt scelerisque erat. Donec a
          turpis et nisi malesuada scelerisque nec in lectus. Cras molestie,
          eros non auctor rutrum, sapien nunc tincidunt mauris, vitae rhoncus
          libero sapien eu elit. Phasellus vitae feugiat velit, ut iaculis ante.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Vestibulum non urna nibh. Nunc laoreet lectus
          sit amet erat sagittis, at laoreet lectus interdum. Duis rutrum, nisi
          ac posuere rutrum, elit odio faucibus dui, commodo posuere libero
          tortor eget neque. Donec molestie placerat sapien vitae auctor. Sed
          tincidunt massa ut lacus pharetra, et feugiat lacus dapibus. Proin
          imperdiet nec leo eu egestas.`,
          img_src: "collegue_arts.jpg",
          image_expand_id: "image_expanded_test",
          button_close_text: "Close",
          media_src: "/collegue_arts.jpg",
          media_type: "image",
          media_alt: "Duis rutrum, nisiac posuere rutrum, elit odio faucibus dui.",
        },
      },

      {
        component: "AccordionComponent",
        props: {
          items: [
            {
              title: "Accordion title",
              description: "Accordion description",
            },
            {
              title: "Accordion title",
              description: "Accordion description",
            },
          ],
        },
      },
      {
        component: "BottomNavigation",
        props: {
          previous_title: "Previous title",
          next_title: "Next title",
          previous_route: "/landing/carousel/first",
          next_route: "/landing/carousel/third",
        },
      },
    ],
  },
};
const slide_3 = {
  component: "DynamicComponentMatcher",
  props: {
    view: [
      {
        component: "DynamicComponentMatcher",
        props: {
          view: [
            //menuExample,
            {
              component: "CarouselItem",
              props: {
                header: "Building on Emory's commitment to serve humanity 3",
                button_scroll: "Scroll to explore",
                action: {
                  type: "navigate",
                  route_to: "/landing/another/thing",
                },
                img_src: "/collegue_arts.jpg",
              },
            },
            {
              component: "BottomNavigation",
              props: {
                previous_title: "Previous title",
                next_title: "Next title",
                previous_route: "/landing/carousel/second",
                next_route: "/landing/carousel/first",
              },
            },
          ],
        },
      },
    ],
  },
};

const slide_0 = {
  
    component: "DynamicComponentMatcher",
    props:{
      view:[
        {
        component: "CircleContentWrapper",
        props: {
          view: [
            {
              component: "Video",
              props: {
                video_src: "video.mp4",
              },
            },
          ],
        },
      }
      ]
    }
  }




const carousel_0 = {
  path: "landing/carousel/zero",
  skipTransitionAnimations: true,

  meta: {
    title: "Emory carousel",
    description: "Some description for carousel page",
  },
  view: [
    menuExample,
    {
      component: "CarouselNavigation",
      props: {
        prev: null,
        actual: slide_0,
        next: "landing/carousel/first",
        slides: [slide_1, slide_2, slide_3],
      },
    },
  ],
};
const carousel_1 = {
  path: "landing/carousel/first",
  meta: {
    title: "Emory carousel",
    description: "Some description for carousel page",
  },
  view: [
    menuExample,
    {
      component: "CarouselNavigation",
      props: {
        prev: null,
        actual: slide_1,
        next: "landing/carousel/second",
        slides: [ slide_1, slide_2, slide_3],
      },
    },
  ],
};

const carousel_2 = {
  path: "landing/carousel/second",
  meta: {
    title: "Emory carousel",
    description: "Some description for carousel page",
  },
  view: [
    menuExample,
    {
      component: "CarouselNavigation",
      props: {
        prev: "/landing/carousel/first",
        actual: slide_2,
        next: "/landing/carousel/third",
        slides: [slide_0, slide_1, slide_2, slide_3],
      },
    },
  ],
};
const carousel_3 = {
  path: "landing/carousel/third",
  meta: {
    title: "Emory carousel",
    description: "Some description for carousel page",
  },
  view: [
    menuExample,
    {
      component: "CarouselNavigation",
      props: {
        prev: "/landing/carousel/second",
        actual: slide_3,
        next: null,
        slides: [slide_0, slide_1, slide_2, slide_3],
      },
    },
  ],
};
const carouselInit = {
  path: "landing/carousel",
  meta: {
    title: "Emory carousel",
    description: "Some description for carousel page",
  },
  view: [
    menuExample,
    {
      component: "CarouselNavigation",
      props: {
        prev: null,
        actual: slide_1,
        next: "/landing/carousel/second",
        slides: [slide_1, slide_2, slide_3],
      },
    },
  ],
};

export const pathJsonText = {
  paths: [
    {
      path: "one",
      skipTransitionAnimations: true,
      meta: { title: "Emory intro", description: "Some description for intro" },
      view: [
{
  component: "DynamicComponentMatcher",
  props:{
    view:[
      {
      component: "CircleContentWrapper",
      props: {
        view: [
          {
            component: "Video",
            props: {
              video_src: "video.mp4",
            },
          },
        ],
      },
    }
    ]
  }
}
      ],
    },
    {
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
            route_to: "/landing/carousel/first",
          },
        },
      ],
    },
    carouselInit,
    carousel_1,
    carousel_2,
    carousel_3,
  ],
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: { path: [] } }) {
  const joinPath = params.path ? params.path.join("/") : "";
  const findPath = pathJsonText.paths.find((value) => value.path === joinPath);
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

  const paths = pathJsonText.paths.map((post) => ({
    params: { path: post.path.toString().split("/") },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
}
