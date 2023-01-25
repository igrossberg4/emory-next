import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Box, Tab } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";
import Tag from "./Tag";
import { MD5 } from "object-hash";
import { imageLoader } from "./utils/imageLoader";

export default function Event(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div
      className={`section text-image-header ${
        props.layout === "left" ? "layout-left" : "layout-right"
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 column-text">
            {props.pretitle && (
              <div className="pretitle text-label">{props.date}</div>
            )}
            <h4 className="event-title">{props.title}</h4>
            {props.date && (
              <div className="event-date text-label">{props.date}</div>
            )}
            {props.time && (
              <div className="event-time text-label">{props.time}</div>
            )}
            <div className="cta-button-container">
              <Link href={props.cta_button_link}>
                <a
                  className="link-button"
                  target={props.cta_new_tab ? "_blank" : "_self"}
                >
                  {props.cta_button_text}
                </a>
              </Link>
            </div>
            <MediaWithExpantion
              img_src={props.img_src}
              media_src={props.media_src}
              media_alt={props.media_alt}
              media_type={props.media_type}
              size="big"
              header={props.media_header}
              text={props.media_text}
              byline={props.media_byline}
              hide_icons={true}
            ></MediaWithExpantion>
            <div className="text-image-header__line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
