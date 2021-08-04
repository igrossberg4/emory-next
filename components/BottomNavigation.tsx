import Head from "next/head";
import React, { Fragment, useContext, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { Context } from "../state/Store";

function BottomNavigation(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <Fragment>
      <div>
        <div
          onClick={(e) => {
            dispatch({ type: "SET_NAV", payload: props.previous_route });
          }}
        >
          <Link  href={props.previous_route}>
            Previous
          </Link>
        </div>
        <h2>{props.previous_title}</h2>
        <Link href={props.previous_route}>
          <button>{"<"}</button>
        </Link>
      </div>
      <div></div>
      <div>
        <div
          onClick={(e) => {
            dispatch({ type: "SET_NAV", payload: props.next_route });
          }}
        >
          <Link href={props.next_route}>
            Next
          </Link>{" "}
        </div>
        <h2>{props.next_title}</h2>
        <Link href={props.next_route}>
          <button>{"<"}</button>
        </Link>
      </div>
    </Fragment>
  );
}

export default BottomNavigation;
