import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import {Box, Container} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function CarouselItem(props: any) {
  const router = useRouter();
  // debugger;
  return (
    <div className="carousel-item container-force-screen-fit-y">
      <div className="content">
        <img className="image round-wp" alt={props.header} src={props.img_src} />
        <h2 className="title">{props.header}</h2>
      </div>
        <div className="actions">
          <Link href={{
            pathname: props.action.route_to,
            query: { from: 'carousel' },
          }}
          as={ props.action.route_to + '#carousel' }
          shallow={false}>
            <a className="btn">{props.button_scroll}</a>
          </Link>
          <div className="line-separator line-separator--half-height"></div>

        </div>
    </div>
  );
}
