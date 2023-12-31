import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function Quote(props: any) {
  return (
    <div className="quote container">
      <svg
        width="69"
        height="54"
        viewBox="0 0 69 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.68514 42.8764C4.84644 49.3483 10.9374 54 17.6178 54C26.263 54 33.3363 47.1236 33.7293 38.0225C33.9258 28.9213 26.6559 21.4382 17.8143 21.4382C13.8846 21.4382 10.348 22.8539 7.59721 25.2809C7.00776 25.6854 6.41832 25.8876 5.82887 25.8876C4.25702 25.8876 2.68516 24.2697 3.2746 22.4494C5.82887 13.3483 12.1163 5.46068 21.1545 1.41572L20.565 0C4.45349 7.2809 -3.20933 26.0899 2.68514 42.8764ZM37.6589 42.8764C39.8202 49.3483 45.9112 54 52.5916 54C61.4333 54 68.5067 47.1236 68.7031 38.0225C68.8996 28.9213 61.6298 21.4382 52.7881 21.4382C48.8584 21.4382 45.3218 22.8539 42.571 25.2809C41.9816 25.6854 41.3921 25.8876 40.8027 25.8876C39.2308 25.8876 37.659 24.2697 38.2484 22.4494C40.8027 13.3483 47.0901 5.46068 56.1283 1.41572L55.5388 0C39.4273 7.2809 31.7645 26.0899 37.6589 42.8764Z"
          fill="white"
        />
      </svg>
      <blockquote>
        <div
          className="text-body--lg"
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></div>
      </blockquote>
      {props.attribution && (
        <div
          className="quote__attribution text-label"
          dangerouslySetInnerHTML={{ __html: props.attribution }}
        ></div>
      )}
    </div>
  );
}
