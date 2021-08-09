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
  const [layoutId, setLayoutID] = useState(Math.random().toString());
  return (
    <Fragment>
      <AnimateSharedLayout type="crossfade">
          <div className={expanded ? 'component-media-with-expansion is-expanded': 'component-media-with-expansion'}>
          {!expanded ? (
            <Fragment>
            <motion.figure
              className={props.size !== 'normal' ? 'round-wp size--' + props.size : 'round-wp' }
              //layout
              //layoutId={layoutId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {props.media_type === "image" ? (
                <img alt={props.media_alt} src={props.media_src} />
              ) : (
                <Video {...props} ></Video>
              )}
            </motion.figure>
            <div className="actions"
              onClick={() => {
                setExpanded(true);
              }}
            >
              {props.media_type === "image" ? <IconButton icon={"eye"} ></IconButton> : <IconButton icon={"play"} />}
            </div>
            </Fragment>
            
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="container-force-screen-fit-y overlay"
            style={{ pointerEvents: "auto" }}
          >
            <button
              onClick={() => {
                setExpanded(false);
              }}
            >
              Close
            </button>

            <motion.figure
              //layout
              //layoutId={layoutId}
              //initial={{ opacity: 1 }}
              //animate={{ opacity: 1 }}
            >
              {props.media_type === "image" ? (
                  <img alt={props.media_alt} src={props.media_src} ></img>
              ) : (
                <Video {...props} controls={true}></Video>
              )}
            </motion.figure>
            <h6>{props.header}</h6>
            <p>{props.text}</p>
          </motion.div>
        )}
          </div>
      </AnimateSharedLayout>
    </Fragment>
  );
}
