import Head from "next/head";
import React, { Fragment, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

export default function VideoIntro(props: any) {
  const videoRef = useRef<HTMLVideoElement|undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const router = useRouter();
  return (
    <Fragment>
    <motion.figure
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      >
      <div className="container" >
        {playing}
        <video
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
        </video>
        {videoRef && !playing ? (
          <button
            onClick={async () => {
              if (videoRef && videoRef.current && !playing) {
                videoRef?.current?.play();
                setPlaying(true);
              } else {
              }
            }}
          >
            {props.button_start_text}
          </button>
        ) : (
          ""
        )}
        {videoRef && playing ? (
          <button onClick={() => router.push(props.route_to)}>
            {props.button_stop_text}
          </button>
        ) : (
          ""
        )}
      </div>
      </motion.figure>
    </Fragment>
  );
}
