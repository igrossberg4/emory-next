import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";
import { motion } from "framer-motion";
import MenuTop from "./MenuTop";

export default function SchoolsMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  console.log(props);
  return (
    <div style={{ position: "fixed", top: 0, zIndex: 10, left: 0 }}>
      <MenuTop
        menu_select={      <Menu>
          <MenuButton
            as={Button}
            leftIcon={<IconButton icon="menu" />}
          >
            {props.title}
          </MenuButton>

        
        </Menu>}
        menu_options=
          {
            <Fragment>
              {props.options_schools.map((option: any) => (
              <div
                key={option.title}
                onClick={() => {
                  dispatch({ type: "SET_NAV", payload: props.link_to });
                }}
              >
                <Link href={option.link_to}>{option.title}</Link>
              </div>
            ))}
             {props.options_units.map((option: any) => (
              <div
                key={option.title}
                onClick={() => {
                  dispatch({ type: "SET_NAV", payload: props.link_to });
                }}
              >
                <Link href={option.link_to}>{option.title}</Link>
              </div>
            ))}
            </Fragment>

          }
        

      >
        
      </MenuTop>
    </div>
  );
}
