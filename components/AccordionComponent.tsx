import Head from "next/head";
import React, { Fragment } from "react";
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

export default function AccordionComponent(props: any) {
  const router = useRouter();
  return (
    <Fragment>
      <div className="container accordion">
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
                <AccordionPanel pb={4}>{item.description}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </Fragment>
  );
}
