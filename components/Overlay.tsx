import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";
import { motion } from "framer-motion";

export default function Overlay(props: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Fragment>
    <div
      onClick={() => {
        setExpanded(true);
      }}
    >
      {props.expand_action}

    </div>
    {expanded ? (
      <motion.div
        // layoutId={layoutId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="container-force-screen-fit-y overlay"
        style={{ pointerEvents: "auto" }}
      >
        <button
          className="close-popup text-label"
          onClick={() => {
            setExpanded(false);
          }}
        >
          Close
        </button>
        {props.expanded_content}
      </motion.div>
    ) : (
      ""
    )}
    </Fragment>
  );
}
