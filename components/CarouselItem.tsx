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
const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem(props: any) {
  const [animated, setAnimated] = useState(true);
  const [scroll, setScroll] = useState(0);
  const listInnerRef = useRef();
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      const currentScrollY = window.scrollY;

      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }

      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;

      if (currentScrollY > 25) {
        document.body.classList.add('is-scrolled');
      }
      else {
        document.body.classList.remove('is-scrolled');
      }

    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, scroll]); // @ts-ignore
  return (
    // <motion.div className="content-header">
    <div className="content-header__container container-force-screen-fit-y" data-animation={props.active && scroll > 25 ? "active" : "not-active"}>
      <div className="header-inner-content">
        <div className="wrapper">
          <div className="header-inner-content__img">
            <img src={props.img_src} alt={props.header} className="image"></img>
          </div>
          <div className="header-inner-content__text">
            <div className="pretitle text-label">{props.about}</div>
            <h1 className="title header-h2">{props.header.toUpperCase()}</h1>
            <div className="subtitle text-body--lg">{props.text}</div>
          </div>
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
        <div className="line-separator line-separator--overflowed line-separator--half-height"></div>
      </div>
    </div>
    // </motion.div>
  );
}
