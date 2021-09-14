import Head from "next/head";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import Video from "./Video";
import CarouselItem from "./CarouselItem";
import { MD5 } from "object-hash";
import { Context } from "../state/Store";
const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};

export default function CarouselItem2036(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const memo = useMemo(() => {
    return  <Fragment>
    {true ? (
      <div
        className="content-header__container header-2036 container-force-screen-fit-y"
        id={`${props.active ? 'active' : ''}`}
      >
        <div className="header-inner-content">
          <div className="header-2036__title">
            <span className="header-2036__title__2">
              <svg
                width="136"
                height="194"
                viewBox="0 0 136 194"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6898 184.054C32.4859 182.958 47.2821 182.684 62.0783 182.684H135.237V193.644H1.52358L0.153564 184.054C27.8279 159.393 55.5022 134.185 83.1765 109.251C99.8907 94.4546 113.591 78.8364 113.591 55.8201C113.591 28.1458 93.0407 11.7056 61.8043 11.7056C27.5539 11.7056 15.7717 28.9678 13.8537 44.586H0.701571C0.701571 24.8577 18.7858 0.197449 62.3523 0.197449C100.987 0.197449 126.743 19.9257 126.743 55.2721C126.743 82.6724 111.399 100.209 91.9446 117.745L17.6898 184.054Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="header-2036__title__3">
              <svg
                width="135"
                height="194"
                viewBox="0 0 135 194"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M121.827 131.733C121.827 102.689 98.2627 85.1525 68.3963 85.1525C62.9163 85.1525 46.4761 85.7005 37.708 92.2766L31.4059 83.7825L107.031 11.4456H6.19759V0.211502H127.855V7.8836L56.3402 75.5624L56.6142 76.1104C60.9983 75.2884 65.3823 74.7404 69.7663 74.7404C105.113 74.7404 134.157 95.2906 134.157 131.733C134.157 166.257 108.401 193.932 59.9022 193.932C33.8719 193.932 12.4997 186.534 0.717529 176.122L8.38963 167.627C20.9938 177.492 38.53 182.424 59.9022 182.424C101.277 182.15 121.827 158.585 121.827 131.733Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="header-2036__title__6">
              <svg
                width="141"
                height="197"
                viewBox="0 0 141 197"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0678 108.429C25.302 84.5904 52.1543 73.0823 75.4446 73.0823C109.421 73.0823 140.657 97.4686 140.657 135.555C140.657 171.997 111.887 196.658 74.0746 196.658C27.22 196.658 0.367676 159.393 0.367676 103.497C0.367676 45.956 28.5901 0.197449 79.0067 0.197449C98.1869 0.197449 115.175 7.04753 123.669 15.2676C120.655 18.0077 117.915 20.7477 114.901 23.2137C107.777 16.6376 94.0769 11.7056 79.2807 11.7056C37.0842 11.7056 13.5199 52.8061 13.5199 104.593C13.5199 105.963 13.5198 107.333 13.7938 108.703L14.0678 108.429ZM74.0746 185.15C103.667 185.15 128.053 165.421 128.053 135.281C128.053 104.593 102.297 84.3164 74.6226 84.3164C46.4003 84.3164 11.0538 105.415 17.3559 139.665C22.836 166.517 46.6742 185.698 74.0746 185.15Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
  
          <div
            className="header-inner-content__img image round-wp"
            ref={(ref) => {}}
          >
            {props.children}
          </div>
  
          <div className="header-inner-content__text">
            <div className="pretitle text-label">{props.about}</div>
            <h1
              className="title"
              dangerouslySetInnerHTML={{ __html: props.header }}
            ></h1>
            <h1 className="title_expanded header-h4">
              {props.header_expanded}
            </h1>
            <div className="subtitle text-body--lg">{props.text}</div>
          </div>
        </div>
  
        <div className="actions">
          <div
            className="btn"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              const contentElement =
                document.getElementById("carouselContent");
              //contentElement?.scrollIntoView({behavior: 'smooth'});
              window.scrollTo({
                top: 200, //contentElement?.offsetTop,
                behavior: "smooth",
              });
            }}
          >
            {" "}
            {!state.goingUp ? props.about_before_scroll : props.button_scroll }
          </div>
        </div>
      </div>
    ) : (
      ""
    )}
  </Fragment>
  }, [state.goingUp, props.active])
  
  return  memo;
}
