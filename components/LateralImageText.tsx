import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import LateralImageExpanded from "./LateralImageExpanded";

export default function LateralImageText(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);
  return (
    <Fragment>
      <AnimateSharedLayout type="crossfade">

      {!expanded ? 
            <div className="section component-text-center">
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
                :
      <LateralImageExpanded {...props} setExpanded={setExpanded}></LateralImageExpanded> }
            </AnimateSharedLayout>

    </Fragment>
  );
}
