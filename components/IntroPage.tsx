import Head from "next/head";
import React, { Fragment, useContext, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/dist/client/router";
import { motion, useAnimation } from "framer-motion";
import { Context, IVideoController } from "../state/Store";
import Video from "./Video";

export default function IntroPage(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const router = useRouter();
  const controls = useAnimation()

  const actualVideo = state.videoStore[props.video_src] as IVideoController;
  return (
    <div className="container container-fit container-video-intro">

      <Video   {...props}></Video>
      {actualVideo ? (
        <Fragment>
          <motion.button
            className="btn-begin-experience"
            animate={
              actualVideo.skipped ? "skip" : !actualVideo.paused ? "playing" : "default"
            }
            variants={{
              default: { opacity: 1 },
              playing: { opacity: 0 },
              skip: { opacity: 0 },
            }}
            onClick={async () => {
              if (actualVideo && actualVideo.videoRef && actualVideo.paused) {
                actualVideo.videoRef?.play();
                actualVideo.paused = false;
                dispatch({ type: 'TOGGLE_VIDEO', payload:{key:props.video_src}});
              }
            }}
          >
            {props.text_play}
          </motion.button>
          <motion.button
            className="btn-skip-intro"
            onClick={() => {
              dispatch({ type: 'SKIP_VIDEO', payload:{key:props.video_src}});
              /*controls.start({
                opacity: 1,
                width:'400px',
                height:'400px',
                margin:'0 auto',

                backgroundColor: "#f00",
                borderRadius:'50%',
                transition: { duration: 0.2 },
              })*/
              router.push(props.route_to);

            }}
            animate={
              actualVideo.skipped ? "skip" : !actualVideo.paused ? "playing" : "default"
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
        ""
      )}
    </div>
  );
}
