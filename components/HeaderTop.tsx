import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {Box, Container, transition} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeaderTop(props: any) {
  const router = useRouter();
  let previosPath: string;
  previosPath = router.asPath.search('#') > -1 ? router.asPath.split('#').slice(-1).toString() : '';
  const variants = {
    mainImage_active: {
      opacity: 1,
      maxWidth: '1600px',
      scale: 1.5,
      bottom: '10%',
      transition: { duration: 4 }
    },
    mainImage_initialFromCarousel: {
      opacity: 1,
      maxWidth: 530,
      scale: 1,
      bottom: '30%',
    },
    teaserImage_active: {
      maxWidth: 0,
      margin: 0,
      border: 0,
      transitionEnd: {
        display: "none",
      },
      transition: { duration: 2 }
    },
    teaserImage_initialFromCarousel: {
      maxWidth: '530px',
    },
    title_active: {
      fontSize: '3.5em',
      maxWidth: '780px',
      transition: { duration: 4 }
    },
    title_initialFromCarousel: {
      opacity: 1,
      fontSize: '2em',
      maxWidth: '650px',
    },
    fadeIn_active: {
      opacity: 1,
      transition: { duration: 2 }
    },
    fadeIn_initial: {
      opacity: 0,
    }
  };

  // @ts-ignore
  return (
    <div className="content-header">
      <motion.img className="image round-wp"
                  variants={variants}
                  style={{ originY: 1 }}
                  initial={previosPath != 'carousel' ? 'mainImage_initialFromCarousel' : 'fadeIn_initial'}
                  animate={previosPath != 'carousel' ? 'mainImage_active' : 'fadeIn_active'}
                  alt={props.header} src={props.img_src}
                 >
      </motion.img>
      <div className="content-header__container container container-force-screen-fit-y">
        <div className="content">
          <motion.img className="image round-wp"
                      variants={variants}
                      style={{ originY: 1 }}
                      initial="teaserImage_initialFromCarousel"
                      animate="teaserImage_active"
                      alt={props.header} src={props.img_src}
          ></motion.img>
          <motion.div className="pretitle"
                      variants={variants}
                      initial="fadeIn_initial"
                      animate="fadeIn_active"
          >{props.about}</motion.div>
          <motion.h1 className="title"
                     variants={variants}
                     initial={previosPath !== 'carousel' ? 'title_initialFromCarousel' : 'fadeIn_initial'}
                     animate={previosPath !== 'carousel' ? 'title_active' : 'fadeIn_active'}
          >{props.header}</motion.h1>
          <motion.div className="subtitle"
                      variants={variants}
                      initial="fadeIn_initial"
                      animate="fadeIn_active"
          >{props.text}</motion.div>
        </div>
        <div className="actions">
            <div className="btn"
                 onClick={(e) => {
                     /*if (props.action && props.action.type === "navigate") {
                         router.push(props.action.route_to);
                     }*/
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
