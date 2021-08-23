import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function TextImageBg(props:any) {
  return (
    <div className="section text-image-bg">
        <div className="container">
          <div className="row body-container">
            <div className="col-md-8 image-container">
              <h2 className="text-image-bg__title header-h3">{props.header}</h2>
              <div className="text-image-bg__image">
                <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text}></MediaWithExpantion>
                <div className="text-image-bg__bg">
                  <Image src={props.background_image} layout="fill"></Image>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-image-bg__text">
              <div className="body" dangerouslySetInnerHTML={{__html:props.text}}></div>
            </div>
          </div>
        </div>
    </div>
  );
}
