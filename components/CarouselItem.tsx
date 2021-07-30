import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function CarouselItem(props: any) {
  const router = useRouter();
  return (
    <div className="carousel-item">
        <div className="image round-wp">
            {/*<img alt={props.header} src={props.img_src}/>*/}
          {/*<motion.figure transition={{delay:0.2}} layoutId={props.img_src}>*/}
           <Image alt="{props.header}" src={props.img_src} width="530" height="530" ></Image>
          {/*</motion.figure>*/}
        </div>
        <h2 className="title">{props.header}</h2>
        <div className="button"
            onClick={(e) => {
              if (props.action && props.action.type === "navigate") {
                router.push(props.action.route_to);
              }
            }}
          >
            {" "}
            {props.button_scroll}
        </div>
        <div className="line-separator line-separator--half-height"></div>
    </div>
  );
}
