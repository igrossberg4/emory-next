import Head from "next/head";
import React, { Fragment } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeaderTop(props: any) {
  const router = useRouter();
  return (
    <Fragment>
      <Container>
        <Box>
          <div>{props.about}</div>
          <h2>{props.header}</h2>
          <p>{props.extra}</p>
        </Box>
        <Box>
          <motion.figure transition={{delay:0.2}} layoutId={props.img_src}>
            <Image alt="" src={props.img_src} width={!props.img_full ? 200 : 500} height={!props.img_full ? 200 : 500} ></Image>
          </motion.figure>
        </Box>
        <Box>
          <div
            onClick={(e) => {
              if (props.action && props.action.type === "navigate") {
                router.push(props.action.route_to);
              }
            }}
          >
            {" "}
            {props.button_scroll}
          </div>
        </Box>
      </Container>
    </Fragment>
  );
}
