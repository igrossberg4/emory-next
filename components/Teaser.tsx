import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function Teaser(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;

  return (
    <div className="teaser">
      <img className="teaser__image round-wp" src={props.img_src}></img>
      <h3 className="teaser__title">{props.title}</h3>
      <p className="teaser__body">{props.body}</p>
      {props.explore_link && !props.internal_link ? (
        <a href={props.explore_link} className="teaser__link text-cta">
          Explore
        </a>
      ) : (
        ""
      )}
      {props.explore_link && props.internal_link ? (
        <div
        onClick={(e) => {
          e.preventDefault();
          const linkPrepared =props.explore_link[0] !== '/' ? `/${props.explore_link}` : props.explore_link
          dispatch({ type: "SET_NAV", payload: linkPrepared });
          router.push(`${props.explore_link}`);
        }}
        >
        <a

          href={props.explore_link ? props.explore_link : '/'}
          className="teaser__link text-cta"
        >
          Explore
        </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
