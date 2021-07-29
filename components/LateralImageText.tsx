import Head from "next/head";
import React, { Fragment } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LateralImageText(props:any) {
  const router = useRouter();
  return (
    <Fragment>
      <Box>
        <h2>{props.header}</h2>
        <p>
          
          {props.text}
        </p>
        <motion.figure
        layoutId={props.img_src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
      <Image alt="" width={200} height={200} src={props.img_src}></Image>
        </motion.figure>
        <button  onClick={()=> router.push(props.route_expand)} >X</button>
      </Box>
    </Fragment>
  );
}
