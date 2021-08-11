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
import IconButton from "./IconButton";

function BottomNavigation(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div className="section component-bottom-navigation">
      <div className="container">
        <div className="row">
          <div className="col-md-6"
            onClick={(e) => {
              dispatch({ type: "SET_NAV", payload: props.previous_route });
            }}
          >
            <div className="inner-wrapper">
              <Link href={props.previous_route}>
                <a className="pre-title text-label">Previous</a>
              </Link>
              <h6 className="title header-h2"><Link href={props.previous_route}>{props.previous_title.toUpperCase()}</Link></h6>
              <IconButton link={props.previous_route} icon="chevron-left"></IconButton>
            </div>
          </div>
          <div className="col-md-6"
            onClick={(e) => {
              dispatch({ type: "SET_NAV", payload: props.next_route });
            }}
          >
            <div className="inner-wrapper">
              <Link href={props.next_route}>
                <a className="pre-title text-label">Next</a>
              </Link>
              <h6 className="title header-h2"><Link href={props.next_route}>{props.next_title.toUpperCase()}</Link></h6>
              <IconButton link={props.next_route} icon="chevron-right"></IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;
