import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import IconButton from "./IconButton";

export default function Footer(props:any) {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div
          className="footer__scrolltop btn text-label"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <IconButton icon="chevron-up"></IconButton>
          Back to top
        </div>
        <p className="footer__title">The future starts here</p>
        <Image src="/logos/emory-university-logo.svg" alt="EMORY" width="95px" height="20px"></Image>
        <p className="footer__copyright text-label">© {new Date().getFullYear()} EMORY UNIVERSITY</p>
      </div>
    </footer>
  );
}
