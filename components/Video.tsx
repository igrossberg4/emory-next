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
  const controls = useAnimation()
  return (
    <Fragment>
      <motion.video
        key={props.video_src}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0.5, height: "400px", width: "400px", borderRadius:'50%' }}
        transition={{}}
        animate={
          !state.videoStore[props.video_src]?.paused ? "playing" : "default"
        }
        variants={{
          default: { opacity: 0.5 },
          playing: { opacity: 1 },
        }}
        layout
        onEnded={(en) => {
          dispatch({ type: 'SKIP_VIDEO', payload:{key:props.video_src}});

          //router.push(props.route_to)
          // Check if the video has ended.
          // TO DO define if we take some action on end.
        }}
        ref={(ref) => {
          videoRef.current = ref as any;
          dispatch({
            type: "REGISTER_VIDEO",
            payload: {
              key: props.video_src,
              value: { paused: true, muted: true, videoRef: ref },
            },
          });
        }}
      >
        <source src={props.video_src} type="video/mp4"></source>
      </motion.video>
    </Fragment>
  );
}
