import React, { useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";
import { motion } from "framer-motion";

export default function MenuTop(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{position: "fixed", top:0, zIndex:10, right:0}}>
    <Menu >
      <MenuButton onClick={()=> {
        setExpanded(true);
      }}  as={Button} rightIcon={<IconButton icon="menu" />}>{props.title}</MenuButton>
    </Menu>
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
            <button className="close-popup text-label"
              onClick={() => {
                setExpanded(false);
              }}
            >
              Close
            </button>
            {props.options.map((option:any) => (
          <div
            key={option.title}
            onClick={() => {
              dispatch({ type: "SET_NAV", payload: props.link_to });

            }}
          >
            <Link href={option.link_to}>{option.title}</Link>
          </div>
        ))}
          </motion.div>
        ) : ("")}
    </div>
  );
}
