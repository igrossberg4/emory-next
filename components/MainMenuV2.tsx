import React, { Fragment, useContext, useEffect, useState } from "react";
import { Menu, MenuButton, Button } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import Icons from "./Icons";
import IconButton from "./IconButton";
import Overlay from "./Overlay";

export default function MainMenuV2(props: any) {
  const [state, dispatch] = useContext(Context) as any;
  const [hideBanner, setHideBanner] = useState(true);

  useEffect(() => {
    setHideBanner(state.hideBanner);
  }, [state]);

  const newPages = props.options_campaigns
    .concat(props.options_explores)
    .filter((option: any) => !!option.new);

  return (
    <div className="header-menu header-menu--schools">
      <Overlay
        expand_action={
          <div className="header-menu__icon">
            <Menu>
              <MenuButton
                tabIndex={0}
                as={Button}
                rightIcon={<Icons icon="menu" />}
              >
                {props.title}
              </MenuButton>
            </Menu>
            {newPages.length > 0 && (
              <span className="header-menu__badge">{newPages.length}</span>
            )}
          </div>
        }
        expanded_content={
          <Fragment>
            <div className="menu-schools">
              <div className="container-fluid">
                <div className="row">
                  <div className="menu-schools__col col-md-6">
                    <h2 className="header-h2">The Campaign</h2>
                    {props.options_campaigns.map((option: any) => (
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
                    <div className="menu-main__cta">
                      <Link href="https://together.emory.edu/give">
                        <a className="link-button">Support The Campaign</a>
                      </Link>
                    </div>
                  </div>
                  <div className="menu-schools__col col-md-6">
                    <h2 className="header-h2">Explore More</h2>
                    {props.options_explores.map((option: any) => (
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
                    <div className="socials">
                      {props.social.map((option: any) => (
                        <div
                          key={option.type}
                          onClick={() => {
                            dispatch({
                              type: "SET_NAV",
                              payload: option.link_to ? option.link_to : "/",
                            });
                          }}
                        >
                          <IconButton
                            icon={option.type}
                            target={option.target}
                            link={option.link_to}
                            title={option.title}
                            label={option.title.capitalize}
                          ></IconButton>
                        </div>
                      ))}
                    </div>
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
