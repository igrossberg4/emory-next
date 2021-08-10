import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      <div className={expanded ? 'component-media-with-expansion is-expanded': 'component-media-with-expansion'}>
        <motion.figure
          className={props.size !== 'normal' ? 'round-wp size--' + props.size : 'round-wp' }
          // layout
          // layoutId={layoutId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.figure
            // layout
            // layoutId={layoutId}
            // initial={{ opacity: 1 }}
            // animate={{ opacity: 1 }}
          >
            
              <img alt={props.media_alt} src={props.img_src ? props.img_src : props.media_src} />

          </motion.figure>
        </motion.figure>
        <div className="actions"
          onClick={() => {
            setExpanded(true);
          }}
        >
          {props.media_type === "image" ? <IconButton icon={"eye"} ></IconButton> : <IconButton icon={"play"} />}
        </div>

        {expanded ? (
          <motion.div
            // layoutId={layoutId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="container-force-screen-fit-y overlay"
            style={{ pointerEvents: "auto" }}
          >
            <button className="close-popup text-label"
              onClick={() => {
                setExpanded(false);
              }}
            >
              Close
            </button>
            <motion.figure
              // layout
              // layoutId={layoutId}
              // initial={{ opacity: 1 }}
              // animate={{ opacity: 1 }}
            >
              {props.media_type === "image" ? (
                <img alt={props.media_alt} src={props.media_src} ></img>
              ) : (
                <Video {...props} controls={true}></Video>
              )}
            </motion.figure>
            <h6 className="text-body">{props.header}</h6>
            <div className="body" dangerouslySetInnerHTML={{__html:props.text}}></div>
          </motion.div>
        ) : ("")}

      </div>
    </Fragment>
  );
}
