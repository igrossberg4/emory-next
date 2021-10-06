import React, {useContext } from "react";
import Image from "next/image";
import MediaWithExpantion from "./MediaWithExpantion";
import { imageLoader } from "./utils/imageLoader";

export default function TextImageBg(props:any) {
  const multipleSizesImgPrincipal = require(`../public/images/${(props.background_image)}?resiz&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);

  return (
    <div className="section text-image-bg">
        <div className="container">
          <div className="row body-container">
            <div className="col-md-8 image-container">
              <h2 className="text-image-bg__title header-h3"  dangerouslySetInnerHTML={{__html:props.header}}></h2>
              <div className="text-image-bg__image">
                <MediaWithExpantion img_src={props.img_src} media_src={props.media_src} media_alt={props.media_alt} media_type={props.media_type} size="big" header={props.media_header} text={props.media_text} byline={props.media_byline} ></MediaWithExpantion>
                <div className="text-image-bg__bg">
                  <Image loader={imageLoader(multipleSizesImgPrincipal) as any} alt="" src={multipleSizesImgPrincipal.src} layout="fill"></Image>
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
