import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box, Tab } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";
import Tag from "./Tag";
// import { MD5 } from "object-hash";

const hash = require("hash-sum");

export default function TextImageHeader(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div
      className={`section text-image-header ${
        props.layout === "left" ? "layout-left" : "layout-right"
      } ${props.disabled ? "text-image-header__disabled" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 column-text">
            {props.pretitle && (
              <div className="pretitle text-label">{props.pretitle}</div>
            )}
            <h2 className="title text-body--lg">{props.title}</h2>
            {props.tags && (
              <div className="tags">
                {props?.tags.map((tag: any, index: number) => {
                  {
                    tag.internal_link = tag.url[0] == "/";
                  }
                  return (
                    <Tag
                      // Replace object-hash/MD5 with hash-sum/hash. MD5 is CPU-intensive and causes lag on large pages.
                      key={hash(tag) + index.toString()}
                      label={tag.label}
                      url={tag.url}
                      {...tag}
                    ></Tag>
                  );
                })}
              </div>
            )}
            <MediaWithExpantion
              img_src={props.img_src}
              media_src={props.media_src}
              media_alt={props.media_alt}
              media_type={props.media_type}
              links={props.links}
              size="big"
              header={props.media_header}
              text={props.media_text}
              byline={props.media_byline}
              disabled={props.disabled}
            />
            <div className="text-image-header__line"></div>
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: props.body }}
            ></div>
            {props.read_more && !props.internal_link && (
              <div>
                <a href={props.read_more} className="readmore text-cta">
                  Read more
                  <span className="visually-hidden"> about {props.title}</span>
                </a>
              </div>
            )}
            {props.read_more && props.internal_link && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  const linkPrepared =
                    props.read_more[0] !== "/"
                      ? `/${props.read_more}`
                      : props.read_more;
                  dispatch({
                    type: "SET_NAV",
                    payload: linkPrepared,
                  });
                  router.push(`${props.read_more ? props.read_more : "/"}`);
                }}
              >
                <a href={props.read_more} className="readmore text-cta">
                  Read more
                  <span className="visually-hidden"> about {props.title}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
