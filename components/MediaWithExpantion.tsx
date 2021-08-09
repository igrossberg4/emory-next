import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import LateralImageExpanded from "./LateralImageExpanded";
import Video from "./Video";
import IconButton from "./IconButton";

export default function MediaWithExpantion(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);
  return (
    <Fragment>
      <AnimateSharedLayout type="crossfade">
        {!expanded ? (
          <div className="floating-media">
            <motion.figure
              className={props.size !== 'normal' ? 'round-wp size--' + props.size : 'round-wp' }
              layout
              layoutId={props.media_src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {props.media_type === "image" ? (
                <img alt={props.media_alt} src={props.img_src} ></img>
              ) : (
                <Video {...props}></Video>
              )}
            </motion.figure>
            <div
              onClick={() => {
                setExpanded(true);
              }}
            >
              {props.media_type === "image" ? <IconButton icon={"eye"} ></IconButton> : <IconButton icon={"play"} />}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="container-force-screen-fit-y overlay"
            style={{ background: props.background, pointerEvents: "auto" }}
          >
            <button
              onClick={() => {
                props.setExpanded(false);
              }}
            >
              Close
            </button>

            <motion.figure
              layout
              layoutId={props.media_src}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {props.media_type === "image" ? (
                  <img alt={props.media_alt} src={props.media_src} ></img>
              ) : (
                <Video {...props}></Video>
              )}
            </motion.figure>
            <h6>{props.header}</h6>
            <p>{props.text}</p>
          </motion.div>
        )}
      </AnimateSharedLayout>
    </Fragment>
  );
}
