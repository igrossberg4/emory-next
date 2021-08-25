import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function TextImageHeader(props:any) {
  return (
    <div className="section text-image-header">
        <div className="container">
          <div className="row">
            <div className="col-md-5 column-media">
              <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text}></MediaWithExpantion>
            </div>
            <div className="col-md-6 column-text">
              {props.pretitle && <div className="pretitle text-label">{props.pretitle}</div>}
              <h2 className="title text-body--lg">{props.title}</h2>
              <div className="text-image-header__line"></div>
              <div className="body" dangerouslySetInnerHTML={{__html:props.body}}></div>
              {props.read_more && <a href={props.read_more} className="readmore text-cta">Read more</a>}
            </div>
          </div>
        </div>
    </div>
  );
}
