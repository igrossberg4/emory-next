import Head from "next/head";
import React, { Fragment, useContext, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Box,
} from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CircleContentWrapper(props:any) {
  return (
    <Fragment>
      <motion.div 
              layoutId="mainMedia"
              layout
              transition={{duration:2, delay:2}}
              //enter={{width:'100%'}}
              animate={{width:'200px',  borderRadius:'50%', display:'block', position:'relative', top:0}}
      className="circle-wrapper" style={{maxWidth: '400px',  margin:'0 auto', border:'1px solid', position:'absolute', top:'50%'}}>
        {props.children}
      </motion.div>
    </Fragment>
  );
}
