import Head from "next/head";
import React, { Fragment, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Context } from "../state/Store";

export default function LateralImageText(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;

  return (
    <Fragment>
      <Box>
        <h2>{props.header}</h2>
        <p>

          {props.text}
        </p>
        <motion.figure
        layout
        layoutId={props.img_src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
      <Image alt="" width={200} height={200} src={props.img_src}></Image>
        </motion.figure>
        <button  onClick={()=> {
          dispatch({ type: "SET_NAV", payload: props.route_expand });
          router.push(props.route_expand)
        }
        } >X</button>
      </Box>
    </Fragment>
  );
}
