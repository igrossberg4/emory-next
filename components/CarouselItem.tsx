import React from "react";
import { useMemo, useContext } from "react";

import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import { animateScroll } from "react-scroll";
import SmoothScroll from "smooth-scroll";
import { Context } from "../state/Store";
import { imageLoader } from "./utils/imageLoader";
import Link from "next/link";

const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem(props: any) {
  const [state, dispatch] = useContext(Context) as any;

  const multipleSizesImgPrincipal = require(`../public/images/${props.img_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);
  const memo = useMemo(() => {
    return (
      <div
        className="content-header__container container-force-screen-fit-y"
        ref={(ref) => {
          if (!document.getElementById("carousel")) {
            document.body.style.visibility = "visible";
          }
        }}
      >
        <div className="header-inner-content">
          <div className="header-inner-content__img round-wp">
            <Image
              loader={imageLoader(multipleSizesImgPrincipal) as any}
              priority={true}
              src={multipleSizesImgPrincipal.src}
              alt={props.header}
              layout={"fill"}
            />
          </div>
          <div className="header-inner-content__text">
            <div className="pretitle text-label">{props.about}</div>
            <h1
              className="title"
              dangerouslySetInnerHTML={{ __html: props.header }}
            ></h1>

            <div className="subtitle text-body--lg">
              <div dangerouslySetInnerHTML={{ __html: props.text }}></div>

              {props.cta_button_text && props.cta_button_link ? (
                <Link href={props.cta_button_link}>
                  <a
                    className="subtitle header-cta link-button"
                    target={props.cta_button_new_tab ? "_blank" : "_self"}
                  >
                    {props.cta_button_text}
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={`actions ${
            props.vertical_header_line ? "vertical-line" : ""
          }`}
        >
          <div
            className="btn expand"
            style={{ cursor: state.isCircleExpanded ? "auto" : "pointer" }}
            onClick={async (e) => {
              if (!state.isCircleExpanded) {
                const element = document.getElementById("selected");
                document.body.classList.add("is-scrolled");

                dispatch({ type: "IS_TRANSITIONING", payload: true });
                if (element) {
                  const activeElement = element.querySelector(
                    ".content-header__container"
                  );
                  activeElement?.setAttribute("data-animation", "active");
                } else {
                  // Handler for independent pages. The use the same name class, but there's not selected id.
                  const activeElement = document.querySelector(
                    ".content-header__container"
                  );
                  if (activeElement) {
                    activeElement?.setAttribute("data-animation", "active");
                  }
                }
                dispatch({
                  type: "GOING_UP",
                  payload: true,
                });
                setTimeout(() => {
                  dispatch({ type: "IS_TRANSITIONING", payload: false });
                }, 600);
                const elementHeader = document.getElementById("header");
                if (elementHeader) {
                  elementHeader.classList.add("hide");
                }
                window.scrollTo({
                  top: window.innerHeight / 4,
                  behavior: "smooth",
                });
              }
            }}
          >
            {" "}
            {props.button_scroll}
          </div>
        </div>
      </div>
    );
  }, [state.isCircleExpanded]);

  return memo;
  // <motion.div className="content-header">

  // </motion.div>
}
