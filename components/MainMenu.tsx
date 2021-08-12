import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";
import { motion } from "framer-motion";
import Overlay from "./Overlay";

export default function MainMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;

  return (
    <div style={{ position: "fixed", top: 0, zIndex: 10, right: 0 }}>
      <Overlay
        expand_action={
          <Menu>
            <MenuButton as={Button} rightIcon={<IconButton icon="menu" />}>
              {props.title}
            </MenuButton>
          </Menu>
        }
        expanded_content={
          <Fragment>
            {props.options.map((option: any) => (
              <div
                key={option.title}
                onClick={() => {
                  dispatch({ type: "SET_NAV", payload: option.link_to });
                }}
              >
                <Link href={option.link_to}>{option.title}</Link>
              </div>
            ))}
          </Fragment>
        }
      ></Overlay>
    </div>
  );
}
