import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LateralImageExpanded(props: any) {
  const router = useRouter();
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        className="container-force-screen-fit-y overlay"
        style={{ background: props.background, pointerEvents: "auto" }}
      >
        <button
          onClick={() => {
            props.setExpanded(false);
          }}
        >
          {props.button_close_text}
        </button>

        <motion.figure
          layout
          layoutId={props.img_src}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <Image alt="" width={200} height={200} src={props.img_src}></Image>
        </motion.figure>
        <h2>{props.header}</h2>
        <p>{props.text}</p>
      </motion.div>
    </Fragment>
  );
}
