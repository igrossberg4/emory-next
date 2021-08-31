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

  const setVideoPlayed = useCallback(()=>{
    dispatch({ type: "VIDEO_PLAYED", payload:true})
    document.body.classList.remove('full_video');

  }    
    //setVideoCookie("video_played", "played")
  ,[dispatch])
  const classVideo = videoPlayed== undefined ? "video-no-played"  : '';
  if(!videoPlayed && props.active) {
    document.body.classList.add('full_video');
  }
  const [playing, setPlaying] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>(undefined as any);
  const reftoAnimation = useRef();

  const [scroll, setScroll] = useState(0);
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
      {process.browser ? <div
        id="container-video"
        className={`container-fit container-video-intro
        ${!state.comesFromCarousel && props.active ? classVideo : ''}`}
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
                    setMuted(videoRef.muted);
                  }
                }}
              >
                <IconButton
                  key={muted}
                  icon={muted ? "unmute" : "mute"}
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
                    onVideoEnd={()=>{
                      const element = document.getElementById('container-video');
                      if(element){
                        element.classList.remove('video-no-played')
                        
                      }
                      setVideoPlayed();
                      setPlaying(false);
                    }}
                    onVideoRef={(ref: HTMLVideoElement) => {
                      /*if (!videoPlayed && props.active) {
                        document.body.classList.add("hide-lateral");
                      }*/
                        /*setTimeout(() => {
                          if(videoPlayed && ref?.readyState != 0){
                            const element = document.getElementById('container-video');
                            if(element){
                              element.classList.remove('video-no-played')
                            }
                          }
                        }, 2000);*/
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
                            const element = document.getElementById('container-video');
                            if(element){
                              element.classList.remove('video-no-played')
                            }
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
