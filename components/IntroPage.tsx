import Head from "next/head";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

  const setVideoPlayed = useCallback(
    () => {
      dispatch({ type: "VIDEO_PLAYED", payload: true });
      document.body.classList.remove("full_video");

      document.body
        .querySelector(".main-container")
        ?.classList.remove("full_video");
    },
    //setVideoCookie("video_played", "played")
    [dispatch]
  );
  const [userPlayVideo, setuserPlayVideo] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>(undefined as any);
  const reftoAnimation = useRef();

  /*const memo = useMemo(() => {
    return <div></div>
  }, [state, muted, videoRef, classVideo, playing, props, setVideoPlayed, skipped, videoPlayed, videoRef, dispatch]);*/
  useEffect(() => {
    if (!videoPlayed && props.active) {
      document.body.classList.add("full_video");
      document.body
        .querySelector(".main-container")
        ?.classList.add("full_video");
    } else {
      if (props.active) {
        document.body.classList.remove("full_video");
        document.body
          .querySelector(".main-container")
          ?.classList.remove("full_video");

      }
    }

    if (props.active) {
      if (state.isCircleExpanded) {
        document.body.classList.add("is-scrolled");
        document
          .getElementById("container-video")
          ?.classList.remove("video-no-played");
        setVideoPlayed();
      } else {
        document.body.classList.remove("is-scrolled");
      }
    }
  }, [props.active, state.isCircleExpanded, videoPlayed]); // @ts-ignore
  const memo = useMemo(() => {
    return (
      <AnimateSharedLayout>
        <div className="container-force-screen-fit-y">
          {process.browser ? (
            <div
              id="container-video"
              className={`container-fit container-video-intro
  ${props.active && videoPlayed == undefined ? "video-no-played" : ""}`}
            >
              {false ? (
                ""
              ) : (
                <Fragment>
                  {videoRef?.played && playing && !state.isCircleExpanded ? (
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
                        icon={muted ? "mute" : "unmute"}
                      ></IconButton>
                    </div>
                  ) : (
                    ""
                  )}
                  <CarouselItem2036
                    {...props}
                    videoPlayed={videoPlayed}
                    videoRef={videoRef}
                    muted={muted}
                    state={state}
                  >
                    {true ? (
                      <div
                        className={`${
                          !videoPlayed && videoRef?.paused ? "video-paused" : ""
                        }`}
                        onClick={(e) => {
                          {
                            if (videoPlayed) {
                              dispatch({
                                type: "VIDEO_PLAYED",
                                payload: undefined,
                              });
                              setMuted(false);
                              setSkipped(false);
                              document.body.classList.add("full_video");
                              document.body
                                .querySelector(".main-container")
                                ?.classList.add("full_video");
                                document.body.querySelector('container-video-intro')?.classList.add('video-no-played')

                              return;
                            } else {
                              dispatch({
                                type: "VIDEO_PLAYED",
                                payload: true,
                              });
                              setSkipped(true);
                              setMuted(true);

                              document.body.classList.remove("full_video");
                              document.body
                                .querySelector(".main-container")
                                ?.classList.remove("full_video");
                                document.body.querySelector('container-video-intro')?.classList.remove('video-no-played')

                            }
                          }
                        }}
                        //className="video-circle"
                        ref={(ref) => (reftoAnimation.current = ref as any)}
                      >
                        <Video
                          muted={muted || state.isCircleExpanded}
                          autoPlay={videoPlayed != undefined && !userPlayVideo &&  props.active}
                          loop={true}
                          {...props}
                          onPlay={() => setPlaying(true)}
                          onVideoEnd={() => {
                            const element =
                              document.getElementById("container-video");
                            if (element) {
                              element.classList.remove("video-no-played");
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
                          {videoRef && !state.videoPlayed ? (
                            <Fragment>
                              {true? (
                                <button
                                  className={`btn-begin-experience ${
                                    videoRef.paused ? "paused" : ""
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (videoRef) {
                                      videoRef.play();
                                      setMuted(false);
                                    }
                                  }}
                                >
                                  {props.text_play}
                                </button>
                              ) : (
                                ""
                              )}
                              <motion.button
                                className="btn-skip-intro"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSkipped(true);
                                  setMuted(true);
                                  const element =
                                    document.getElementById("container-video");
                                  if (element) {
                                    element.classList.remove("video-no-played");
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
                    ) : (
                      ""
                    )}
                  </CarouselItem2036>
                </Fragment>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </AnimateSharedLayout>
    );
  }, [videoRef, muted, skipped, state.videoPlayed, playing, videoRef?.muted, state.isCircleExpanded]);
  return memo;
}
