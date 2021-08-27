import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function Tag(props:any) {
  return (
    <a href={props.url} className="tag text-label">{props.label}</a>
  );
}
