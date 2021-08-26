import Head from "next/head";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import IconButton from "./IconButton";
import { CookiesProvider, useCookies } from "react-cookie";

export default function IntroPage(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const videoPlayed = state.videoPlayed;
  
  const setVideoPlayed = useCallback(()=> 
    dispatch({ type: "VIDEO_PLAYED", payload:true})
    //setVideoCookie("video_played", "played")
  ,[dispatch]) 
  const classVideo = videoPlayed== undefined ? "video-no-played"  : 'video-no-played'; 
  useEffect(() => {
    const handleChange = () => {
      console.log("Change", "LOCAL")
    }
    window.addEventListener("storage",handleChange);

    return () => {
      // When the component unmounts remove the event listener
      window.removeEventListener("storage", handleChange);
    };
}, []);
  const [playing, setPlaying] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>(undefined as any);
  const [refChildren, setRefChildren] = useState(undefined);
  const reftoAnimation = useRef();
  const router = useRouter();
  const controls = useAnimation();
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
        document.body.classList.add("is-scrolled");
        document
          .getElementById("container-video")
          ?.classList.remove("video-no-played");
          setVideoPlayed();
      } else {
        document.body.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, scroll]); // @ts-ignore
  return (


    <AnimateSharedLayout>
      {true ? <div
        id="container-video"

        onTransitionEnd={() => {}}
        className={`container-fit container-video-intro ${classVideo}`}
      >
        {false ? (
          ""
        ) : (
          <Fragment>
            {playing ? (
              <div
                className="mute_button btn text-label"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  if (videoRef) {
                    videoRef.muted = !videoRef.muted;
                  }
                }}
              >
                <IconButton
                  icon={videoRef.muted ? "unmute" : "mute"}
                ></IconButton>
              </div>
            ) : (
              ""
            )}
            <CarouselItem2036 {...props}>
              {
                <div
                  onClick={(e) => {
                    {
                      if (videoRef.paused) {
                        videoRef.play();
                      } else {
                        videoRef.pause();
                      }
                      setPlaying(!playing);
                    }
                  }}
                  //className="video-circle"
                  ref={(ref) => (reftoAnimation.current = ref as any)}
                >
                  <Video
                    {...props}
                    onPlay={() => setPlaying(true)}
                    onVideoRef={(ref: HTMLVideoElement) => {
                      if (!videoPlayed) {
                        document.body.classList.add("hide-lateral");
                      }
                      setVideoRef(ref);
                    }}
                  ></Video>
                  <Fragment>
                    {videoRef && !videoPlayed? (
                      <Fragment>
                        <motion.button
                          className="btn-begin-experience"
                          animate={
                            skipped ? "skip" : playing ? "playing" : "default"
                          }
                          variants={{
                            default: { opacity: 1 },
                            playing: { opacity: 0 },
                            skip: { opacity: 0 },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef) {
                              videoRef.play();
                            }
                          }}
                        >
                          {props.text_play}
                        </motion.button>
                        <motion.button
                          className="btn-skip-intro"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSkipped(true);
                            setVideoPlayed();
                          }}
                          animate={
                            skipped
                              ? "skip"
                              : !videoRef?.paused
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
                        </motion.button>{" "}
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </Fragment>
                </div>
              }
            </CarouselItem2036>
          </Fragment>
        )}
      </div> : ''
}
    </AnimateSharedLayout>

  );
}
