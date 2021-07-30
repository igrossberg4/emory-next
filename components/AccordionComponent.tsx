import Head from "next/head";
import React from "react";
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
    <Accordion allowToggle>
      {props.items.map((item: any, index: number) => {
        return (
          <AccordionItem key={index.toString()}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {item.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{item.description}</AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
