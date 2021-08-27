import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";
import Link from "next/link";

export default function Tag(props:any) {
  const [state, dispatch] = useContext(Context) as any;
  const router = useRouter();
  return (
    <Fragment>
      {!props.internal_link && <a href={props.url} className="tag text-label">{props.label}</a>}
      {props.internal_link &&<div
       className="tag text-label"
      onClick={(e)=>{
        e.preventDefault();
        const linkPrepared = props.url[0] !== '/' ? `/${props.url}` : props.url
        dispatch({ type: "SET_NAV", payload: linkPrepared });
        router.push(props.url ? props.url : '/');
      }}
      >
        <a href={props.url ? props.url : '/'}>{props.label}</a>
        </div>}
    </Fragment>
  );
}
