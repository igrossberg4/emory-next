import React, { Fragment, useContext } from "react";
import { Menu, MenuButton, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import Icons from "./Icons";
import IconButton from "./IconButton";
import Overlay from "./Overlay";

export default function MainMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;

  return (
    <div className="header-menu header-menu--main">
      <Overlay
        expand_action={
          <Menu>
            <MenuButton tabIndex={0} as={Button} rightIcon={<Icons icon="menu" />}>
              {props.title}
            </MenuButton>
          </Menu>
        }
        expanded_content={
          <Fragment>
            <div className="menu-main">
              {props.options.map((option: any) => (
                <div
                  className="menu-main__link header-h2"
                  key={option.title}
                  onClick={() => {
                    dispatch({ type: "SET_NAV", payload: option.link_to ? option.link_to :'/'});
                  }}
                >
                  <Link href={option.link_to}>{option.title}</Link>
                </div>
              ))}
              <div className="socials">
                {props.social.map((option: any) => (
                  <div
                    key={option.type}
                    onClick={() => {
                      dispatch({ type: "SET_NAV", payload: option.link_to ? option.link_to : '/'});
                    }}
                  >
                    <IconButton
                      icon={option.type}
                      target={option.target}
                      link={option.link_to}
                      title={option.title}
                    >
                    </IconButton>
                  </div>
                ))}
              </div>

            </div>
          </Fragment>
        }
      ></Overlay>
    </div>
  );
}
