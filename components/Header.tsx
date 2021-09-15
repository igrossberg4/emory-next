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

  const prevScrollY = useRef(0);
  const handleScroll = useCallback(() => {
    setScroll(window.scrollY);
    const currentScrollY = window.scrollY;
    prevScrollY.current = currentScrollY;
  }, [scroll])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]); // @ts-ignore
  return (
    <header role="banner">
      <MainMenu {...props.main_menu}></MainMenu>
      LOGO
      <SchoolsMenu {...props.menu_school}></SchoolsMenu>
    </header>
  );
}
