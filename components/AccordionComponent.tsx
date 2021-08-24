import Head from "next/head";
import React, { Fragment, useContext } from "react";
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

export default function AccordionComponent(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <Fragment>
      <div className="section container accordion">
        {props.pretitle && <p className="accordion__pretitle text-label">{props.pretitle}</p>}
        {props.title && <h2 className="accordion__title header-h2">{props.title}</h2>}
        <Accordion allowToggle>
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
                  {item.description}
                  {item.read_more && !item.internal_link && <a href={item.read_more} className="readmore text-cta">Read more</a>}
                  {item.read_more && item.internal_link && <a
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "SET_NAV", payload: `/${item.read_more}`});
                    router.push(`/${item.read_more}`)
                  }}
                  href={item.read_more} className="readmore text-cta">Read more</a>}

                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </Fragment>
  );
}
