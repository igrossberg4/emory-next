import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box, Tab } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";
import Tag from "./Tag";
import { MD5 } from "object-hash";
import DynamicComponentMatcher from "./DynamicComponentMatcher";

export default function EventContainer(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div className="event-container">
      <h2 className="title header-h1">{props.header}</h2>
      <h4 className="subheader">{props.subheader}</h4>

      {props.items.map((value: any, i: number) => {
        return (
          <DynamicComponentMatcher
            key={MD5(value) + i.toString()}
            view={[
              {
                component: "DynamicComponentMatcher",
                props: {
                  view: value?.props?.view ? [value.props.view[0]] : [value],
                },
              },
            ]}
          ></DynamicComponentMatcher>
        );
      })}
    </div>
  );
}
