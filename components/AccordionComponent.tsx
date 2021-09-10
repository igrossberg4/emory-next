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
import Tag from "./Tag";

export default function AccordionComponent(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;

  return (
    <Fragment>
      <div className="section container accordion">
        {props.pretitle && (
          <p className="accordion__pretitle text-label">{props.pretitle}</p>
        )}
        {props.title && (
          <h2 className="accordion__title header-h2">{props.title}</h2>
        )}
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
                  {item.read_more && !item.internal_link && (
                    <a href={item.read_more} className="readmore text-cta">
                      Read more
                    </a>
                  )}
                  {item.read_more && item.internal_link && (
                    <div className="accordion__readmore"
                      onClick={(e) => {
                        e.preventDefault();
                        const linkPrepared = item.read_more[0] !== '/' ? `/${item.read_more}` : item.read_more
                        dispatch({
                          type: "SET_NAV",
                          payload: linkPrepared,
                        });
                        router.push(`${item.read_more ? item.read_more : '/'}`);
                      }}
                    >
                      <a
                        href={item.read_more ? item.read_more : "/"}
                        className="readmore text-cta"
                      >
                        Read more
                      </a>
                    </div>
                  )}
                  <div className="tags">
                  {item?.tags?.map((tag:any)=>{
                    return <Tag key={JSON.stringify(tag)} {...props} {...tag}></Tag>
                  })}</div>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </Fragment>
  );
}
