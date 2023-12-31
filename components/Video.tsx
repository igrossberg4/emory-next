import Head from "next/head";
import React, { Fragment, useContext, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Box,
} from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import ReactPlayer from "react-player";
import { css } from "@emotion/css";

export default function Video(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const videoRef = useRef<HTMLVideoElement | undefined>(undefined);
  const controls = useAnimation();
  const media_src = props.video_src ? props.video_src : props.media_src;
  const re = new RegExp("^(http|https)://", "i");
  return (
    <Fragment>
      {!re.test(media_src) ? (
        <Fragment>
          <video
            disableRemotePlayback={true}
            playsInline={props.playsInline}
            muted={props.muted}
            autoPlay={props.autoPlay}
            loop={props.loop}
            onPlay={() => {
              if (props.onPlay) {
                props.onPlay();
              }
            }}
            ref={(ref) => {
              videoRef.current = ref as any;
              const tracks = ref?.textTracks[0];
              const element = document.getElementById("caption-block");
              if (tracks) {
                tracks.mode = "hidden"; // must occur before cues is retrieved
                const cues = tracks.cues;
                const replaceText = function (text: string) {
                    if (element) {
                      element.innerHTML = text;
                    }
                  },
                  showText = function () {
                    if (element) {
                      element.style.visibility = "visible";
                    }
                  },
                  hideText = function () {
                    if (element) {
                      element.style.visibility = "hidden";
                    }
                  },
                  cueEnter = function (this: any) {
                    replaceText((this as any).text);
                    showText();
                  },
                  cueExit = function () {
                    hideText();
                  },
                  videoLoaded = function (e: Event) {
                    if (cues) {
                      for (let i = 0; i < cues.length; i++) {
                        const cue = cues[Number(i)];
                        if (cue) {
                          cue.onenter = cueEnter;
                          cue.onexit = cueExit;
                        }
                      }
                    }
                  };

                ref?.addEventListener("loadedmetadata", videoLoaded);
              }

              /*dispatch({
              type: "REGISTER_VIDEO",
              payload: {
                key: props.video_src ? props.video_src : props.media_src,
                value: { paused: true, muted: true, videoRef: ref, controls:controls },
              },
            });*/
              if (props.onVideoRef) {
                props.onVideoRef(ref);
              }
              //props.onVideoRef(controls)
            }}
            onEnded={(en) => {
              //dispatch({ type: 'SKIP_VIDEO', payload:{key:props.video_src ? props.video_src : props.media_src}});
              if (props.onVideoEnd) {
                props.onVideoEnd();
              }
              //router.push(props.route_to)
              // Check if the video has ended.
              // TO DO define if we take some action on end.
            }}
            controls={props.controls}
            key={props.video_src ? props.video_src : props.media_src}
            //initial={!props.initial_animation ? { opacity: 0 } : props.initial_animation}
            //exit={!props.initial_animation ? { opacity: 1, height: "400px", width: "400px", borderRadius:'50%' } : props.initial_animation}
          >
            {props.video_webm_src ? (
              <source src={props.video_webm_src} type="video/webm"></source>
            ) : (
              ""
            )}
            <source src={media_src} type="video/mp4"></source>
              <track
                default
                src={props.video_vtt}
                kind="captions"
                srcLang={props.video_vtt_lang}
                label="english_captions"
              ></track>
          </video>

          <div
            className={`${
              !state.videoPlayed && state.captionVideoEnabled ? "caption-visible" : "caption-hide"
            }`}
            id="caption-block"
          ></div>
        </Fragment>
      ) : (
        <div className="video-vimeo">
          <ReactPlayer playing={true} light={false} controls url={media_src} />
        </div>
      )}
    </Fragment>
  );
}
