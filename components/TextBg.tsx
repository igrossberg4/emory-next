import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import MediaWithExpantion from "./MediaWithExpantion";
import { imageLoader } from "./utils/imageLoader";
import Link from "next/link";

export default function TextBg(props:any) {
  const multipleSizesImgPrincipal = require(`../public/images/${(props.image_src)}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);

  return (
    <div className="text-bg">
      <Image alt='' loader={imageLoader(multipleSizesImgPrincipal) as any} src={ multipleSizesImgPrincipal.src } layout="fill" className="textbg__bg"></Image>
      <div className="text-bg__overlay"></div>
      <div className="container">
        <div className="row">
          <div className={props.wide ? "col-md-12" : "col-md-9"}>
            <h2 className="header-h2" dangerouslySetInnerHTML={{__html:props.text}}></h2>
            {
              props.cta_link && props.cta_text ?
              <div className="text-bg__cta">
                <Link  href={ props.cta_link }>
                    <a className="link-button" target={props.new_tab ? "_blank" : "_self"}>{props.cta_text}</a>
                </Link>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}
