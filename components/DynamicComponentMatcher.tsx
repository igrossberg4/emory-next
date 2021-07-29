import Head from "next/head";
import React, { Fragment } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import VideoIntro from "./VideoIntro";
import MenuTop from "./MenuTop";
import HeaderTop from "./HeaderTop";
import LateralImageText from "./LateralImageText";
import LateralImageExpanded from './LateralImageExpanded';
import CarouselNavigation from "./CarouselNavigation";
import AccordionComponent from './AccordionComponent';
export default function DynamicComponentMatcher(props:any) {
  return (
    <Fragment>
      {props.view.map((component:any, i:number) => {
        switch (component.component) {
          case "VideoIntro":
            return (
              <VideoIntro key={i.toString()} {...component.props}></VideoIntro>
            );
          case "MenuTop":
            return <MenuTop key={i.toString()} {...component.props}></MenuTop>;
          case "HeaderTop":
            return (
              <HeaderTop key={i.toString()} {...component.props}></HeaderTop>
            );
          case "LateralImageText":
            return (
              <LateralImageText
                key={i.toString()}
                {...component.props}
              ></LateralImageText>
            );
          case "LateralImageExpanded":
            return (
                <LateralImageExpanded
                  key={i.toString()}
                  {...component.props}
                ></LateralImageExpanded>
              );
              case "CarouselNavigation":
                return (
                    <CarouselNavigation
                      key={i.toString()}
                      {...component.props}
                    ></CarouselNavigation>
                  );
          case "DynamicComponentMatcher":
            return (
              <DynamicComponentMatcher
                key={i.toString()}
                {...component.props}
              ></DynamicComponentMatcher>
            );
          case "AccordionComponent":
            return <AccordionComponent key={i.toString()} {...component.props}></AccordionComponent>
          default:
            return "";
        }
      })}
    </Fragment>
  );
}
