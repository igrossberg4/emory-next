import React, { Fragment, useContext, useEffect, useState } from "react";
import { Menu, MenuButton, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import Icons from "./Icons";
import IconButton from "./IconButton";
import Overlay from "./Overlay";

export default function MainMenu(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const [hideBanner, setHideBanner] = useState(true);

  useEffect(() => {
    setHideBanner(state.hideBanner);
  }, [state]);

  const newPages = props.options.filter((option: any) => !!option.new);

  return (
    <div className="header-menu header-menu--main">
      {!hideBanner && newPages.length > 0 && (
        <div className="header-menu__newpages">
          New pages have been launched!
          <IconButton
            icon="close"
            onClick={() => {
              dispatch({ type: "HIDE_BANNER" });
            }}
          />
        </div>
      )}
      <Overlay
        expand_action={
          <div className="header-menu__icon">
            <Menu>
              <MenuButton tabIndex={0} as={Button} rightIcon={<Icons icon="menu" />}>
                {props.title}
              </MenuButton>
            </Menu>
            {newPages.length > 0 && <span className="header-menu__badge">{newPages.length}</span>}
          </div>
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
                  {option.new && (
                    <span className="menu-main__badge">
                      <Icons icon="new" />
                    </span>
                  )}
                </div>
              ))}
              <div className="menu-main__cta">
                <Link  href="https://together.emory.edu/give">
                  <a className="link-button">Support Emory</a>
                </Link>
              </div>
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
                      label={option.title.capitalize}
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
