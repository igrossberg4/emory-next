import React, { Fragment, useContext } from "react";
import { Menu, MenuButton, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import Icons from "./Icons";
import IconButton from "./IconButton";
import Overlay from "./Overlay";

export default function SchoolsMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div className="header-menu header-menu--schools">
      <Overlay
        expand_action={
          <Menu>
            <MenuButton
              tabIndex={0}
              as={Button}
              rightIcon={<Icons icon="chevron-down" />}
            >
              <span className="hide-sm"></span> School/Unit
            </MenuButton>
          </Menu>
        }
        expanded_content={
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
                          dispatch({
                            type: "SET_NAV",
                            payload: option.link_to ? option.link_to : "/",
                          });
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
                          dispatch({
                            type: "SET_NAV",
                            payload: option.link_to ? option.link_to : "/",
                          });
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
      ></Overlay>
    </div>
  );
}
