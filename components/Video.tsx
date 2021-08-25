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

export default function Video(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const videoRef = useRef<HTMLVideoElement | undefined>(undefined);
  const controls = useAnimation();
  return (
    <Fragment>
      <video
              onPlay={() => {
                if(props.onPlay){
                  props.onPlay();
                }
              }}
              ref={(ref) => {
                if(!videoRef.current)
                {videoRef.current = ref as any;
                dispatch({
                  type: "REGISTER_VIDEO",
                  payload: {
                    key: props.video_src ? props.video_src : props.media_src,
                    value: { paused: true, muted: true, videoRef: ref, controls:controls },
                  },
                });}
                //props.onVideoRef(controls)
                
              }}
              onEnded={(en) => {
                //dispatch({ type: 'SKIP_VIDEO', payload:{key:props.video_src ? props.video_src : props.media_src}});
                if(props.onVideoEnd){
                  props.onVideoEnd();
                }
                //router.push(props.route_to)
                // Check if the video has ended.
                // TO DO define if we take some action on end.
              }}
        loop
        controls={props.controls}
        key={props.video_src ? props.video_src : props.media_src}
        //initial={!props.initial_animation ? { opacity: 0 } : props.initial_animation}
        //exit={!props.initial_animation ? { opacity: 1, height: "400px", width: "400px", borderRadius:'50%' } : props.initial_animation}
/*
        animate={
          !props.initial_animation === false ? undefined : state.videoStore[props.video_src ? props.video_src : props.media_src]?.skip ? 'skip' : (!state.videoStore[props.video_src ? props.video_src : props.media_src]?.paused ? "playing" : "default")
        }
        variants={{
          default: { opacity: 0.5 },
          playing: { opacity: 1 },
          skip: {width:0, height:0}
        }}
        layout

*/

      >
        <source src={props.video_src ? props.video_src : props.media_src} type="video/mp4"></source>
      </video>
    </Fragment>
  );
}
