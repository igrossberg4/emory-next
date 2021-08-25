import Head from "next/head";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/dist/client/router";
import {
  AnimatePresence,
  AnimateSharedLayout,
  AnimationControls,
  motion,
  useAnimation,
} from "framer-motion";
import { Context, IVideoController } from "../state/Store";
import Video from "./Video";
import CarouselItem2036 from "./CarouselItem2036";

export default function IntroPage(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const [playing, setPlaying] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [refChildren, setRefChildren] = useState(undefined);
  const reftoAnimation = useRef();
  const router = useRouter();
  const controls = useAnimation();
  const onRefGet = (ref:HTMLDivElement) => {
    if(reftoAnimation.current && skipped){

      const getRect = reftoAnimation?.current.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      //console.log("EOOO", getRect);
      //controls.start({position:'fixed', top:getRect.y, width:'400px', height:'400px'})
      //state.videoStore[props.video_src].controls.start({opacity:0})
      actualVideo.videoRef.style.width = '400px';
      actualVideo.videoRef.style.position = 'absolute';
      actualVideo.videoRef.style.transform=`translateX(${getRect.left + window.scrollX}px) translateY(${getRect.top + window.scrollY}px)`;
      actualVideo.videoRef.style.height = '400px';
      actualVideo.videoRef.style.borderRadius='50%';
  
      //actualVideo.videoRef.style.top=`${getRect.top - bodyRect.top}px`;
      //actualVideo.videoRef.style.left=`${getRect.left - bodyRect.left}px`;
    }

  }
  const onVideoRef = (ref:AnimationControls) => {
    controls.start({opacity:0})
  }
  const actualVideo = state.videoStore[props.video_src] as IVideoController;
  const [animated, setAnimated] = useState(true);
  const [scroll, setScroll] = useState(0);
  const listInnerRef = useRef();
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      const currentScrollY = window.scrollY;

      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }

      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;

      if (currentScrollY > 25) {
        
      }
      else {
        document.body.classList.remove('is-scrolled');
      }

    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, scroll]); // @ts-ignore
  return (
    <AnimateSharedLayout>
      <motion.div
        onTransitionEnd={() => {}}
        animate={controls}
        className="container-fit container-video-intro"
      >
        {(
          <Fragment>
            {/*<motion.div
              layout
              layoutId="test-cosa-inner"
              transition={{duration:1}}

              exit={{
                opacity: 1,
                borderRadius: "0%",
                width:'100%',
                height:'100%'
              }}
            >*/
              <Video {...props} onVideoRef={onVideoRef} ></Video>
           // </motion.div>
            }
          </Fragment>
        )}
        {actualVideo && !skipped ? (
          <Fragment>
            <motion.button
              className="btn-begin-experience"
              animate={
                actualVideo.skipped
                  ? "skip"
                  : !actualVideo?.videoRef?.paused
                  ? "playing"
                  : "default"
              }
              variants={{
                default: { opacity: 1 },
                playing: { opacity: 0 },
                skip: { opacity: 0 },
              }}
              onClick={() => {
                if (actualVideo && actualVideo.videoRef && actualVideo.paused) {
                  dispatch({
                    type: "TOGGLE_VIDEO",
                    payload: { key: props.video_src },
                  });
                }
              }}
            >
              {props.text_play}
            </motion.button>
            <motion.button
              className="btn-skip-intro"
              onClick={() => {
                dispatch({
                  type: "SKIP_VIDEO",
                  payload: { key: props.video_src },
                });
              actualVideo.videoRef.style.position = 'absolute'
                //router.push(props.route_to);
                setSkipped(true);

                
              }}
              animate={
                actualVideo.skipped
                  ? "skip"
                  : !actualVideo?.videoRef?.paused
                  ? "playing"
                  : "default"
              }
              variants={{
                default: { opacity: 0 },
                playing: { opacity: 1 },
                skip: { opacity: 0 },
              }}
            >
              {props.text_skip}
            </motion.button>
          </Fragment>
        ) : (
          <CarouselItem2036 {...props} onRefGet={onRefGet}>
            {
              <div ref={(ref) => reftoAnimation.current = ref} style={{width:'400px', height:'400px'}}></div>

            /*<motion.div
              className="video-skipped"
              transition={{duration:10}}
              onTransitionEnd={(e) => {
                // TO DO Call route predifined.
                console.log("Video transition end", e);
              }}
              initial={{width:2000, height:800, position:'absolute'}}
              animate={{ width: "400px", height: "400px", borderRadius: "50%" }}
              layout
              layoutId="test-cosa-inner"
            >
              <Video {...props}></Video>*/
           // </motion.div>
            }
          </CarouselItem2036>
          /*
          <motion.div
            className="video-skipped"
            onTransitionEnd={(e) => {
              // TO DO Call route predifined.
              console.log("Video transition end", e);
            }}
            animate={{ width: "400px", height: "400px", borderRadius:'50%' }}
            layout
            layoutId="test-cosa-inner"
          >
            <Video {...props} initial_animation={false}></Video>
          </motion.div>*/
        )}
      </motion.div>
    </AnimateSharedLayout>
  );
}
