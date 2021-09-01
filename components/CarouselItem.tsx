import Head from "next/head";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeaderTop from "./HeaderTop";
const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem(props: any) {
  const [goingUp, setGoingUp] = useState(false);
  const multipleSizesImgPrincipal = require(`../public/images/${(props.img_src)}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp`);
  const memo = useMemo(() => {
    return  <div className="content-header__container container-force-screen-fit-y" data-animation={props.active && goingUp ? "active" : "not-active"}>
    <div className="header-inner-content">
        <div className="header-inner-content__img round-wp">
          <img src={multipleSizesImgPrincipal.src} srcSet={multipleSizesImgPrincipal.srcSet} alt={props.header} className="image"></img>
        </div>
        <div className="header-inner-content__text">
          <div className="pretitle text-label">{props.about}</div>
          <h1 className="title header-h2" dangerouslySetInnerHTML={{ __html: props.header }}></h1>
          <div className="subtitle text-body--lg">{props.text}</div>
        </div>
    </div>
    <div className="actions">
      <div
        className="btn"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          const contentElement = document.getElementById("carouselContent");
          //contentElement?.scrollIntoView({behavior: 'smooth'});
          window.scrollTo({
            top: 200, //contentElement?.offsetTop,
            behavior: "smooth",
          });
        }}
      >
        {" "}
        {props.button_scroll}
      </div>
    </div>
  </div>
  }, [goingUp, multipleSizesImgPrincipal, props])

  useEffect(() => {
     const handleScroll = () => {
      if(props.active){
        //setScroll(window.scrollY);
        const currentScrollY = window.scrollY;
        if(currentScrollY > 25){
          setGoingUp(true);
        }else{
          setGoingUp(false);
        }
  
        if (currentScrollY >= 25 && !document.body.classList.contains('is-scrolled')) {
          document.body.classList.add('is-scrolled');
        }
        else if (currentScrollY < 25 && document.body.classList.contains('is-scrolled')) {
          document.body.classList.remove('is-scrolled');
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]); // @ts-ignore
  return (memo
    // <motion.div className="content-header">
   
    // </motion.div>
  );
}
