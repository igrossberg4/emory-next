import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function TextLargeImage(props:any) {
  return (
    <div className={`section text-large-image ${props.layout === "left" ? "layout-left" : "layout-right"}`} style={{backgroundImage:props.background_image ? `url(/${props.background_image})` : ''}}>
        <div className="container">
        {props.header &&
          <div className="row header-container">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <h2 className="title header-h3">{props.header}</h2>
            </div>
          </div>
          }
          <div className="row body-container">
            <div className="col-md-6">
              <div className="body" dangerouslySetInnerHTML={{__html:props.text}}></div>
            </div>
            <div className="col-md-8 image-container">
              <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text} byline={props.media_byline} ></MediaWithExpantion>
            </div>
          </div>
        </div>
    </div>
  );
}
