import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeaderTop(props: any) {
  const router = useRouter();
  return (
    <div className="content-header">
      <div className="content-header__background-image">
         <div className="image round-wp">
           <Image alt="" src={props.img_src} width="1600" height="1600" ></Image>
         </div>
      </div>
      <div className="content-header__container container container-screen-fit">
        <div className="content">
          <div className="pretitle">{props.about}</div>
          <h1 className="title">{props.header}</h1>
          <div className="subtitle">{props.text}</div>
        </div>
        <div className="actions">
            <div className="btn"
                 onClick={(e) => {
                     if (props.action && props.action.type === "navigate") {
                         router.push(props.action.route_to);
                     }
                 }}
            >
                {" "}
                {props.button_scroll}
            </div>
            <div className="line-separator line-separator--overflowed line-separator--half-height"></div>
        </div>
      </div>
    </div>
  );
}
