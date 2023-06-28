import Head from "next/head";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Context } from "../state/Store";
import Tag from "./Tag";
import DynamicComponentMatcher from "./DynamicComponentMatcher";
const hash = require("hash-sum");

export default function DynamicAccordion(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  const [hasAnchor, setHasAnchor] = useState(false);

  useEffect(() => {
    const anchorExists = router.asPath.includes("#");
    setHasAnchor(anchorExists);
  }, [router.asPath]);

  return (
    <Fragment>
      <div className="section container accordion">
        <Accordion
          allowToggle
          index={props.open_by_default || hasAnchor ? [0] : undefined}
        >
          <AccordionItem>
            <h3 className="accordion-item__title text-body--lg">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {props.title && <h2 className="header-h2">{props.title}</h2>}
                </Box>
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              {props.items.map((value: any, i: number) => {
                {
                  value.props.is_in_dynamic_accordion = true;
                }
                return (
                  <DynamicComponentMatcher
                    // Replace object-hash/MD5 with hash-sum/hash. MD5 is CPU-intensive and causes lag on large pages.
                    key={hash(value) + i.toString()}
                    view={[
                      {
                        component: "DynamicComponentMatcher",
                        props: {
                          view: value?.props?.view
                            ? [value.props.view[0]]
                            : [value],
                        },
                      },
                    ]}
                  ></DynamicComponentMatcher>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* <Accordion allowToggle>
          {props.items.map((item: any, index: number) => {
            return (
              <AccordionItem key={index.toString()}>
                <h3 className="accotdion-item__title text-body--lg">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {item.title}
                    </Box>
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  }
                  {item.read_more && !item.internal_link && (
                    <a href={item.read_more} className="readmore text-cta">
                      Read more
                      <span className="visually-hidden">
                        {" "}
                        about {item.title}
                      </span>
                    </a>
                  )}
                  {item.read_more && item.internal_link && (
                    <div
                      className="accordion__readmore"
                      onClick={(e) => {
                        e.preventDefault();
                        const linkPrepared =
                          item.read_more[0] !== "/"
                            ? `/${item.read_more}`
                            : item.read_more;
                        dispatch({
                          type: "SET_NAV",
                          payload: linkPrepared,
                        });
                        router.push(`${item.read_more ? item.read_more : "/"}`);
                      }}
                    >
                      <a
                        href={item.read_more ? item.read_more : "/"}
                        className="readmore text-cta"
                      >
                        Read more
                        <span className="visually-hidden">
                          {" "}
                          about {item.title}
                        </span>
                      </a>
                    </div>
                  )}
                  <div className="tags">
                    {item?.tags?.map((tag: any) => {
                      return (
                        <Tag
                          key={JSON.stringify(tag)}
                          {...props}
                          {...tag}
                        ></Tag>
                      );
                    })}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion> */}
      </div>
    </Fragment>
  );
}
