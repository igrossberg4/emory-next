import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import MenuTop from "./MenuTop";
import HeaderTop from "./HeaderTop";
import LateralImageText from "./LateralImageText";
import LateralImageExpanded from "./LateralImageExpanded";
import CarouselNavigation from "./CarouselNavigation";
import AccordionComponent from "./AccordionComponent";
import CarouselItem from "./CarouselItem";
import IntroPage from "./IntroPage";
import BottomNavigation from "./BottomNavigation";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
function DynamicComponentMatcher(props: any) {
  return (
    <Fragment>
      {props.view.map((component: any, i: number) => {
        switch (component.component) {
          case "IntroPage":
            return (
              <IntroPage key={i.toString()} {...component.props}></IntroPage>
            );
          case "MenuTop":
            return <MenuTop key={i.toString()} {...component.props}></MenuTop>;
          case "HeaderTop":
            return (
              <HeaderTop key={i.toString()} {...component.props}></HeaderTop>
            );
          case "AnimatePresence":
            return (
              <AnimatePresence key={i.toString()} {...component.props}>
                <DynamicComponentMatcher
                  key={i.toString()}
                  {...component.props}
                ></DynamicComponentMatcher>
              </AnimatePresence>
            );
          case "AnimatedTransition":
            return (
              <AnimateSharedLayout key={i.toString()} {...component.props}>
                <DynamicComponentMatcher
                  key={i.toString()}
                  {...component.props}
                ></DynamicComponentMatcher>
              </AnimateSharedLayout>
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
          case "CarouselItem":
            return (
              <CarouselItem
                key={i.toString()}
                {...component.props}
              ></CarouselItem>
            );
          case "DynamicComponentMatcher":
            return (
              <DynamicComponentMatcher
                key={i.toString()}
                {...component.props}
              ></DynamicComponentMatcher>
            );
          case "BottomNavigation":
            return (
              <BottomNavigation
                key={i.toString()}
                {...component.props}
              ></BottomNavigation>
            );
          case "AccordionComponent":
            return (
              <AccordionComponent
                key={i.toString()}
                {...component.props}
              ></AccordionComponent>
            );
          default:
            return "";
        }
      })}
    </Fragment>
  );
}
export default (DynamicComponentMatcher)