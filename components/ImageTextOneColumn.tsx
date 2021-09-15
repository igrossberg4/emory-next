import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function ImageTextOneColumn(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="section component-image-text-one-column" style={{backgroundImage:props.background_image ?  `linear-gradient(0deg, #F5F4F5, #F5F4F5), url(/${props.background_image})` : ''}}>
        <div className="container">
          <div className="row">
            <div className="column">
                <h2 className="title header-h3">{props.header}</h2>
                <div className="floating-media">
                  <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text} ></MediaWithExpantion>
                </div>
                <div className="body" dangerouslySetInnerHTML={{__html:props.text}}></div>
            </div>
          </div>
        </div>
    </div>
  );
}

