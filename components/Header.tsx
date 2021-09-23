import Head from "next/head";
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import IconButton from "./IconButton";
import MainMenu from "./MainMenu";
import SchoolsMenu from "./SchoolsMenu";

export default function Header(props:any) {
  const [scroll, setScroll] = useState(0);
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const element =  document.getElementById('header');
    if (element) {
      if (currentScrollY > scroll && currentScrollY < 200) {
        element.classList.add('hide');
      } else {
        if (currentScrollY < scroll && currentScrollY < 200) {
          element.classList.remove('hide');
        }
      }
    }
    setScroll(window.scrollY);
  }, [scroll])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]); // @ts-ignore

  return (
    <header id="header" role="banner">
      <SchoolsMenu {...props.menu_school}></SchoolsMenu>
      <MainMenu {...props.main_menu}></MainMenu>
    </header>
  );
}
