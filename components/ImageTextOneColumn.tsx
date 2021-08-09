import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";

export default function ImageTextOneColumn(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);
  return (
            <div className="section component-image-text-one-column" style={{backgroundImage:props.background_image ?  `url(/${props.background_image})` : ''}}>
                <div className="container">
                  <div className="row">
                    <div className="column">
                        <h2 className="title header-h3">{props.header}</h2>
                        <div className="body">
                        <div className="floating-media">
                            <motion.figure
                                className="round-wp"
                                layout
                                layoutId={props.img_src}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Image alt="" width={200} height={200} src={props.img_src}></Image>
                            </motion.figure>
                            <button  onClick={()=> {
                                setExpanded(true);
                            }
                            } >X</button>
                        </div>

                            {props.text}

                        </div>
                    </div>
                  </div>
                </div>
            </div>
  );
}
