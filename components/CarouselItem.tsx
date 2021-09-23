import React from "react";
import { useMemo, useContext } from "react";

import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import { animateScroll } from "react-scroll";
import SmoothScroll from "smooth-scroll";
import { Context } from "../state/Store";

const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem(props: any) {
  const [state, dispatch] = useContext(Context) as any;

  const multipleSizesImgPrincipal = require(`../public/images/${props.img_src}?resize&sizes[]=1024,sizes[]=2048&format=png`);
  const memo = useMemo(() => {
    return <div
        className="content-header__container container-force-screen-fit-y"
        onTransitionEnd={(e) => {
          /*if(e.propertyName === 'padding-top'){
            


            /*setTimeout(() => {
             const element = document.getElementById("selected")?.querySelector('.title.header-h2');
             if(state.isCircleExpanded && element && window.scrollY < (element as any).clientHeight + 80){
              window.scrollTo({top: (element as any).clientHeight + 80, behavior:'smooth'})
            }
            }, 1000)*/
            
            
          
             /*if(state.isCircleExpanded && element && window.scrollY < (element as any).clientHeight + 80){
               window.scrollTo({top: (element as any).clientHeight + 80, behavior:'smooth'})
             }*/
       }}
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
              const element = document.getElementById("selected");
              document.body.classList.add("is-scrolled");

              dispatch({ type: "IS_TRANSITIONING", payload: true });
              if (element) {
                const activeElement = element.querySelector(".content-header__container");
                activeElement?.setAttribute("data-animation", "active");
              }
              dispatch({
                type: "GOING_UP",
                payload: true,
              });
              setTimeout(() => {
                dispatch({ type: "IS_TRANSITIONING", payload: false });
              }, 600);
              const elementHeader =  document.getElementById('header');
              if(elementHeader){
                elementHeader.classList.add('hide');
              }

          }}
          >
            {" "}
            {props.button_scroll}
          </div>
        </div>
      </div>
    
  }, [state.isCircleExpanded]);

  return memo;
  // <motion.div className="content-header">

  // </motion.div>
}
