import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import { animateScroll } from "react-scroll";
import SmoothScroll from "smooth-scroll";

const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem(props: any) {
  const [goingUp, setGoingUp] = useState(false);
  const multipleSizesImgPrincipal = require(`../public/images/${props.img_src}?resize&sizes[]=1024,sizes[]=2048&format=webp`);
  const memo = useMemo(() => {
    return (
      <div
        className="content-header__container container-force-screen-fit-y"
        id={`${props.active ? 'active' : ''}`}
      >
        <div className="header-inner-content">
          <div className="header-inner-content__img round-wp">
            <Image
              priority={true}
              src={multipleSizesImgPrincipal.src}
              alt={props.header}
              layout={"fill"}
            />
          </div>
          <div className="header-inner-content__text">
            <div className="pretitle text-label">{props.about}</div>
            <h1
              className="title header-h2"
              dangerouslySetInnerHTML={{ __html: props.header }}
            ></h1>
            <div className="subtitle text-body--lg">{props.text}</div>
          </div>
        </div>
        <div className="actions">
          <div
            className="btn"
            style={{ cursor: "pointer" }}
            onClick={async (e) => {
              const contentElement = document.getElementById("carouselContent");
              //contentElement?.scrollIntoView({behavior: 'smooth'});
              window.scrollTo({top:200, behavior:'smooth'})
          }}
          >
            {" "}
            {props.button_scroll}
          </div>
        </div>
      </div>
    );
  }, [goingUp, multipleSizesImgPrincipal, props]);

  return memo;
  // <motion.div className="content-header">

  // </motion.div>
}
