import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LateralImageExpanded(props:any) {
    const router = useRouter();
  return (
    <Fragment>
      <div className="container-force-screen-fit-y" style={{background:props.background}}>
        <button onClick={() => router.back()}>{props.button_close_text}</button>

        <motion.figure
          layout
          layoutId={props.img_src}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          >
          <Image alt="" width={200} height={200} src={props.img_src}></Image>
        </motion.figure>
        <h2>{props.header}</h2>
        <p>
          {props.text}
        </p>
      </div>
    </Fragment>
  );
}
