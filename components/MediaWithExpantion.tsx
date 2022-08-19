import * as fs from "fs";

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
import Overlay from "./Overlay";
import path from "path";
import dynamic from "next/dynamic";
import { imageLoader } from "./utils/imageLoader";

export default function MediaWithExpantion(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [layoutId, setLayoutID] = useState(Math.random().toString());
  let multipleSizesImgPrincipal;
  let multipleSizesImgExpanded;

  multipleSizesImgPrincipal = require(`../public/images/${
    props.img_src ? props.img_src : props.media_src
  }?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);
  if (props.media_type != "video") {
    multipleSizesImgExpanded = require(`../public/images/${props.media_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=1200,sizes[]=2048&format=png`);
  }

  //const files = fs.readdirSync(__dirname);
  //const moduleName = path.join(__dirname, files[0]);
  return (
    <Fragment>
      <div
        className={
          false
            ? "component-media-with-expansion is-expanded"
            : "component-media-with-expansion"
        }
      >
        <motion.figure
          className={
            props.size !== "normal"
              ? "round-wp size--" + props.size
              : "round-wp"
          }
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
            <img
              alt={props.media_alt}
              srcSet={multipleSizesImgPrincipal.srcSet}
              src={multipleSizesImgPrincipal.src}
              style={props.img_size ? { objectFit: props.img_size } : {}}
            />
          </motion.figure>
          {props.disabled && <div className="image-overlay" />}
        </motion.figure>
        {!props.disabled && (
          <Overlay
            expand_action={
              <div className="actions">
                <IconButton icon={props.media_type === "image" ? "eye" : "play"} label="See more" />
              </div>
            }
            expanded_content={
              <Fragment>
                <motion.figure
                  data-media={props.media_type}
                >
                  {props.media_type === "image" ? (
                    <div
                      className="image-wrapper"
                    >
                      <Image
                        loader={imageLoader(multipleSizesImgExpanded) as any}
                        priority={true}
                        alt={props.media_alt}
                        src={multipleSizesImgExpanded.src}
                        layout={"responsive"}
                        width={multipleSizesImgExpanded.width}
                        height={multipleSizesImgExpanded.height}
                      />
                    </div>
                  ) : (
                    <Video {...props} controls={true} />
                  )}
                  <figcaption className="overlay__text">
                    <h6 className="title text-body">{props.header}</h6>
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: props.text }}
                    />
                    {props.byline && (
                      <div
                        className="byline"
                        dangerouslySetInnerHTML={{ __html: props.byline }}
                      />
                    )}
                  </figcaption>
                </motion.figure>
              </Fragment>
            }
          />
        )}
        {props.links && (
          <div className="links">
            {props.links.map((link: any, idx: number) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                <img src={`/${link.icon}`} alt={link.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}
