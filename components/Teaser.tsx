import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function Teaser(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;

  let multipleSizesImgPrincipal;

  if (!props.hosted_externally) {
    multipleSizesImgPrincipal = require(`../public/images/${props.img_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp`);
  }

  return (
    <div className="teaser">
      {props.type == "gallery" ? (
        <MediaWithExpantion
          img_src={props.img_src}
          media_src={props.media_src}
          media_alt={props.media_alt}
          media_type={props.media_type}
          size="normal"
          is_carousel="true"
          type={props.type}
          header={props.media_header}
          text={props.media_text}
          byline={props.media_byline}
          slides={props.slides}
          hosted_externally={props.hosted_externally}
          galleryApi={props.galleryApi}
        ></MediaWithExpantion>
      ) : (
        ""
      )}

      {props.type !== "gallery" && (
        <img
          alt={props.title}
          className="teaser__image round-wp"
          src={multipleSizesImgPrincipal.src}
          srcSet={multipleSizesImgPrincipal.srcSet}
        ></img>
      )}
      {/* <h3 className="teaser__title">{props.title}</h3>
      <p className="teaser__body">{props.body}</p>
      {props.explore_link && !props.internal_link ? (
        <a href={props.explore_link} className="teaser__link text-cta">
          Explore
        </a>
      ) : (
        ""
      )}
      {props.explore_link && props.internal_link ? (
        <div
          onClick={(e) => {
            e.preventDefault();
            const linkPrepared =
              props.explore_link[0] !== "/"
                ? `/${props.explore_link}`
                : props.explore_link;
            dispatch({ type: "SET_NAV", payload: linkPrepared });
            router.push(`${props.explore_link}`);
          }}
        >
          <a
            href={props.explore_link ? props.explore_link : "/"}
            className="teaser__link text-cta"
          >
            Explore
          </a>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
