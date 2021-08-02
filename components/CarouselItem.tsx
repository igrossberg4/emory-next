import Head from "next/head";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeaderTop from "./HeaderTop";
const normalize = (val, max, min) => { return (val - min) / (max - min); }

export default function CarouselItem(props: any) {
  const router = useRouter();
  const [animated, setAnimated] = useState(false);
  const [scroll, setScroll] = useState(0);
  const listInnerRef = useRef();

  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  const [variants, setVariants] = useState({
    mainImage_active: {
      opacity: 1,
      maxWidth: "1600px",
      scale: 1.5,
      bottom: "10%",
      transition: { duration: 4 },
    },
    mainImage_initialFromCarousel: {
      opacity: 1,
      maxWidth: "530px",
      scale: 1,
      bottom: "30%",
    },
    teaserImage_active: {
      maxWidth: 0,
      margin: 0,
      border: 0,
      transitionEnd: {
        display: "none",
      },
      transition: { duration: 2 },
    },
    teaserImage_initialFromCarousel: {
      maxWidth: "530px",
    },
    title_active: {
      fontSize: `clamp(2em, ${normalize(scroll, 170, 0) * 3.5}em, 3.5em)`,
      maxWidth: "780px",
      transition: { duration: 1 },
    },
    title_initialFromCarousel: {
      opacity: 1,
      fontSize: "2em",
      maxWidth: "650px",
    },
    fadeIn_active: {
      opacity: 1,
      transition: { duration: 2 },
    },
    fadeIn_initial: {
      opacity: 0,
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      const currentScrollY = window.scrollY;
      console.log(goingUp, currentScrollY);
      setVariants({
        mainImage_active: {
          opacity: 1,
          maxWidth: "1600px",
          scale: 1.5,
          bottom: "10%",
          transition: { duration: 4 },
        },
        mainImage_initialFromCarousel: {
          opacity: 1,
          maxWidth: "0px",
          scale: 1,
          bottom: "30%",
        },
        teaserImage_active: {
          maxWidth: 0,
          margin: 0,
          border: 0,
          transitionEnd: {
            display: "none",
          },
          transition: { duration: 2 },
        },
        teaserImage_initialFromCarousel: {
          maxWidth: "530px",
        },
        title_active: {
          fontSize: `clamp(2em, ${normalize(scroll, 170, 0) * 3.5}em, 3.5em)`,

          maxWidth: `520px`,
          transition: { duration: 0.3 },
        },
        title_initialFromCarousel: {
          opacity: 1,
          fontSize: "2em",
          maxWidth: "650px",
        },
        fadeIn_active: {
          opacity: 1,
          transition: { duration: 2 },
        },
        fadeIn_initial: {
          opacity: 0,
        },
      });

      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;

    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, scroll, variants]);
  let previosPath: string;
  previosPath =
    router.asPath.search("#") > -1
      ? router.asPath.split("#").slice(-1).toString()
      : "";

  // @ts-ignore
  return (
    <div className="content-header">
      {/*  <motion.img
        className="image round-wp"
       variants={variants}
        style={{ originY: 1 }}
        initial={
          previosPath != "carousel"
            ? "mainImage_initialFromCarousel"
            : "fadeIn_initial"
        }
        animate={
          previosPath != "carousel" ? "mainImage_active" : "fadeIn_active"
        }
        alt={props.header}
        src={props.img_src}
      ></motion.img>*/}
      <div className="content-header__container container container-force-screen-fit-y">
        <div className="content">
          <motion.img
            className="image round-wp"
            //  variants={variants}
            style={{ originY: 1 }}
            // initial="teaserImage_initialFromCarousel"
            // animate="teaserImage_active"
            alt={props.header}
            src={props.img_src}
          ></motion.img>
          <motion.div
            className="pretitle"
            variants={variants}
            onClick={(e) => {
              console.log(e);
            }}
            //initial="fadeIn_initial"
            //animate="fadeIn_active"
          >
            {props.about}
          </motion.div>
          <motion.h1
            onClick={(e) => {
              console.log(e);
            }}
            className="title"
             variants={variants}
            initial={ false
            }
            animate={
              previosPath !== "carousel" ? "title_active" : "fadeIn_active"
            }
          >
            {props.header}
          </motion.h1>
          <motion.div
            onClick={(e) => {
              console.log(e);
            }}
            className="subtitle"
            /*variants={variants}
            initial="fadeIn_initial"
            animate="fadeIn_active"*/
          >
            {props.text}
          </motion.div>
        </div>
        <div className="actions">
          <div
            className="btn"
            onClick={(e) => {
              /*if (props.action && props.action.type === "navigate") {
                         router.push(props.action.route_to);
                     }*/
            }}
          >
            {" "}
            {props.button_scroll}
          </div>
          {scroll}

          <div className="line-separator line-separator--overflowed line-separator--half-height"></div>
        </div>
      </div>
    </div>
  ); /*{!animated ? <div className="carousel-item container-force-screen-fit-y">
      <div ref={(ref) => listInnerRef.current = ref}  className="content">
        <img  className="image round-wp" alt={props.header} src={props.img_src} />
        <h2 className="title">{props.header}</h2>
      </div>
        <div className="actions">
   
            <a onClick={(e) => {
              console.log(e);
              setAnimated(true);
              setTimeout(() => {
                for (let i = 0; i < 500; i ++){
                  scrollTo({top: i,
                    behavior: 'smooth'})
                }

              }, 1000)
            }} className="btn">{props.button_scroll}</a>
          <div className="line-separator line-separator--half-height"></div>

        </div>
    </div> : <HeaderTop {...props}></HeaderTop> }*/
}
