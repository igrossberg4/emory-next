import Head from "next/head";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import IconButton from "./IconButton";

export default function Footer(props:any) {
  const [scroll, setScroll] = useState(0);
  const [state, dispatch] = useContext(Context) as any;

  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      const currentScrollY = window.scrollY;
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]); // @ts-ignore
  return (
    <footer role="contentinfo">
      <div className="container">
        {scroll > 170 ? 
        <div
          className="footer__scrolltop btn text-label"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setTimeout(() => {
              document.body.classList.remove("is-scrolled");
              dispatch({ type: "IS_TRANSITIONING", payload: true });
              dispatch({
                type: "GOING_UP",
                payload: false,
              });
              console.log("circleAnimateCollapse");
              setTimeout(() => {
                dispatch({ type: "IS_TRANSITIONING", payload: false });
              }, 600);
              const element = document.getElementById("selected");
              if (element) {
                const activeElement = element.querySelector(".content-header__container");
                activeElement?.setAttribute("data-animation", "no-active");
              }
              const elementHeader =  document.getElementById('header');
              if(element){
                element.classList.remove('hide');
              }
            }, 400)
          }}
        >
          <IconButton icon="chevron-up"></IconButton>
          Back to top
        </div> : ''
}
        <p className="footer__title">The future starts here</p>
        <Image src="/logos/emory-university-logo.svg" alt="EMORY" width="95px" height="20px"></Image>
        <p className="footer__copyright text-label">© {new Date().getFullYear()} EMORY UNIVERSITY</p>
      </div>
    </footer>
  );
}
