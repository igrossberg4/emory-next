import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import MediaWithExpantion from "./MediaWithExpantion";
import { imageLoader } from "./utils/imageLoader";

export default function TextBg(props:any) {
  // @todo: Recover 300, 600, 1240 sizes when loaders are implemented
  const multipleSizesImgPrincipal = require(`../public/images/${(props.image_src)}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);

  return (
    <div className="text-bg">
      <Image alt='' loader={imageLoader} src={ multipleSizesImgPrincipal.src } layout="fill" className="textbg__bg"></Image>
      <div className="text-bg__overlay"></div>
      <div className="container">
        <div className="row">
          <div className=" col-md-9">
            <h2 className="header-h2">{props.text}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
