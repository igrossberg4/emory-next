import Head from "next/head";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import Image from "next/image";
import IconButton from "./IconButton";
import Link from "next/link";

export default function Footer(props: any) {
  const [scroll, setScroll] = useState(0);
  const [state, dispatch] = useContext(Context) as any;

  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      const currentScrollY = window.scrollY;
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]); // @ts-ignore
  return (
    <footer role="contentinfo">
      <div className="container">
        {scroll > 170 ? (
          <div
            className="footer__scrolltop btn text-label"
            style={{ cursor: "pointer" }}
          >
            {props?.cta_contact_info?.person ? (
              <IconButton
                icon="address-book-thin"
                label="Contact us"
                onClick={(e: any) => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                  setTimeout(() => {
                    document.body.classList.remove("is-scrolled");
                    dispatch({ type: "IS_TRANSITIONING", payload: true });
                    dispatch({
                      type: "GOING_DOWN",
                      payload: false,
                    });
                    setTimeout(() => {
                      dispatch({ type: "IS_TRANSITIONING", payload: false });
                    }, 600);
                    const element = document.getElementById("selected");
                    if (element) {
                      const activeElement = element.querySelector(
                        ".content-header__container"
                      );
                      activeElement?.setAttribute(
                        "data-animation",
                        "no-active"
                      );
                    }
                    const elementHeader = document.getElementById("header");
                    if (element) {
                      element.classList.remove("hide");
                    }
                  }, 400);
                }}
              ></IconButton>
            ) : null}
            <IconButton
              icon="chevron-up"
              label="Back to top"
              onClick={(e: {
                target: any;
                currentTarget: any;
                relatedTarget: any;
              }) => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setTimeout(() => {
                  document.body.classList.remove("is-scrolled");
                  dispatch({ type: "IS_TRANSITIONING", payload: true });
                  dispatch({
                    type: "GOING_UP",
                    payload: false,
                  });
                  setTimeout(() => {
                    dispatch({ type: "IS_TRANSITIONING", payload: false });
                  }, 600);
                  const element = document.getElementById("selected");
                  if (element) {
                    const activeElement = element.querySelector(
                      ".content-header__container"
                    );
                    activeElement?.setAttribute("data-animation", "no-active");
                  }
                  const elementHeader = document.getElementById("header");
                  if (element) {
                    element.classList.remove("hide");
                  }
                }, 400);
              }}
            ></IconButton>
            <span className="back-to-top">Back to top</span>
          </div>
        ) : (
          ""
        )}
        {props.cta_contact_info?.big_title ? (
          <h2 className="header-h1">{props.cta_contact_info.big_title}</h2>
        ) : (
          <p className="footer__title">The future starts here</p>
        )}
        <div className="footer__cta">
          {props.cta_support_button !== false ? (
            props.cta_contact_info?.hide_cta_button ? (
              <Link
                href={
                  props?.cta_support_button?.url
                    ? props?.cta_support_button?.url
                    : "https://together.emory.edu/give"
                }
              >
                <a className="link-button">
                  {props?.cta_support_button?.text
                    ? props?.cta_support_button?.text
                    : "Support Emory"}
                </a>
              </Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {!props?.cta_contact_info?.raw_block &&
          props.cta_contact_info !== false ? (
            <div className="footer__contact">
              <div className="footer__contact__heading">
                {props?.cta_contact_info?.heading
                  ? props?.cta_contact_info?.heading
                  : "Learn more about ways to support 2O36."}
              </div>
              <div className="footer__contact__person">
                {props?.cta_contact_info?.person
                  ? props?.cta_contact_info?.person
                  : ""}
              </div>
              <div className="footer__contact__title">
                {props?.cta_contact_info?.title
                  ? props?.cta_contact_info?.title
                  : ""}
              </div>
              <div className="footer__contact__links">
                <a
                  href={`mailto: ${
                    props?.cta_contact_info?.email
                      ? props?.cta_contact_info?.email
                      : "support2O36@emory.edu"
                  }`}
                >
                  {props?.cta_contact_info?.email
                    ? props?.cta_contact_info?.email
                    : "support2O36@emory.edu"}
                </a>
                {props?.cta_contact_info?.telephone ? (
                  <a href={`tel:${props?.cta_contact_info?.telephone}`}>
                    {props?.cta_contact_info?.telephone}
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : props.cta_contact_info !== false ? (
            <div
              className="footer__contact"
              dangerouslySetInnerHTML={{
                __html: props?.cta_contact_info?.raw_block,
              }}
            ></div>
          ) : (
            ""
          )}
        </div>
        <Image
          src="/logos/emory-university-logo.svg"
          alt="EMORY"
          width="95px"
          height="20px"
        ></Image>
      </div>
    </footer>
  );
}
