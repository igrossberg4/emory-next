import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function SectionIntro(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="section component-intro-text" style={{backgroundImage:props.background_image ?  `linear-gradient(0deg, #F5F4F5, #F5F4F5), url(/${props.background_image})` : ''}}>
        <div className="container">
          <div className="row header-container">
            <div className="col-md-6">
                <h2 className="text-body--lg">{props.header}</h2>
            </div>
          </div>
          <div className="row body-container">
            <div className="col-md-8 image-container">
              <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text} ></MediaWithExpantion>
            </div>
            <div className="col-md-6">
              <div className="body" dangerouslySetInnerHTML={{__html:props.text}}></div>
            </div>
          </div>
        </div>
    </div>
  );
}
