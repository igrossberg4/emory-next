import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";
import { motion } from "framer-motion";
import Overlay from "./Overlay";

export default function SchoolsMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div style={{ position: "fixed", top: 0, zIndex: 100, left: 0 }}>
      <Overlay
        expand_action={
          <Menu>
            <MenuButton as={Button} rightIcon={<IconButton icon="chevron-down" />}>
              {props.title}
            </MenuButton>
          </Menu>}
        expanded_content=
          {
            <Fragment>
              <div className="menu-schools">
                <div className="container-fluid">
                  <div className="row">
                    <div className="menu-schools__col col-md-6">
                      <h2 className="header-h2">Schools</h2>
                      {props.options_schools.map((option: any) => (
                      <div
                        className="menu-schools__link text-label"
                        key={option.title}
                        onClick={() => {
                          dispatch({ type: "SET_NAV", payload: props.link_to });
                        }}
                      >
                        <Link href={option.link_to}>{option.title}</Link>
                      </div>
                      ))}
                    </div>
                    <div className="menu-schools__col col-md-6">
                      <h2 className="header-h2">Units</h2>
                      {props.options_units.map((option: any) => (
                        <div
                          className="menu-schools__link text-label"
                          key={option.title}
                          onClick={() => {
                            dispatch({ type: "SET_NAV", payload: props.link_to });
                          }}
                        >
                          <Link href={option.link_to}>{option.title}</Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            </Fragment>
          }
      >
      </Overlay>
    </div>
  );
}
