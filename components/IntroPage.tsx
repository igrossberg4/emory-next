import Head from "next/head";
import React, { Fragment, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

export default function IntroPage(props: any) {
  const videoRef = useRef<HTMLVideoElement|undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [skip, setSkip] = useState(false);
  const router = useRouter();
  return (
    <div
      className="container container-fit container-video-intro">
      <motion.video
        initial={{ opacity: 0 }}
        animate={playing ? "playing" : "default"}
        variants={{
          default: { opacity: .5 },
          playing: { opacity: 1 },
        }}
        layoutId="mainMedia"
        onEnded={(en) => {
          // Check if the video has ended.
          // TO DO define if we take some action on end.
          console.log(en);
        }}
        ref={(ref) => {
          videoRef.current = ref as any;
        }}
        id="myVideo"
      >
        <source src={props.video_src} type="video/mp4"></source>
      </motion.video>
      <motion.button className="btn-begin-experience"
        animate={skip ? "skip" : (playing ? "playing" : "default")}
        variants={{
          default: { opacity: 1 },
          playing: { opacity: 0 },
          skip: { opacity: 0 },
        }}
        onClick={async () => {
          if (videoRef && videoRef.current && !playing) {
            videoRef?.current?.play();
            setPlaying(true);
          }
        }}
      >
        {props.text_play}
      </motion.button>
      <motion.button
        className="btn-skip-intro"
        onClick={() => {
          setSkip(true);
          router.push(props.route_to);
        }}
        animate={skip ? "skip" : (playing ? "playing" : "default")}
        variants={{
          default: { opacity: 0 },
          playing: { opacity: 1 },
          skip: { opacity: 0 },
        }}
      >
        {props.text_skip}
      </motion.button>
    </div>
  );
}
