import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import HeaderTop from "./HeaderTop";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import dynamic from 'next/dynamic'

const IntroPage = dynamic(()=> import('./IntroPage'));
const SectionIntro = dynamic(()=> import('./SectionIntro'));
const LateralImageExpanded = dynamic(()=> import('./LateralImageExpanded'));
const CarouselNavigation = dynamic(()=> import('./CarouselNavigation'));
const CarouselItem = dynamic(()=> import('./CarouselItem'));
const BottomNavigation = dynamic(()=> import('./BottomNavigation'));
const AccordionComponent = dynamic(()=> import('./AccordionComponent'));
const Video = dynamic(()=> import('./Video'));
const CircleContentWrapper = dynamic(()=> import('./CircleContentWrapper'));
const MediaWithExpantion = dynamic(()=> import('./MediaWithExpantion'));
const MainMenu = dynamic(()=> import('./MainMenu'));
const SchoolsMenu = dynamic(()=> import('./SchoolsMenu'));

function DynamicComponentMatcher(props: any) {
  return (
    <Fragment>
      {props.view.map((component: any, i: number) => {
        switch (component.component) {
          case "IntroPage":

            return <IntroPage key={i.toString()} {...component.props}></IntroPage>;
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
          case "SectionIntro":
            return (
              <SectionIntro
                key={i.toString()}
                {...component.props}
              ></SectionIntro>
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
          case "Video":
            return <Video key={i.toString()} {...component.props}></Video>;
          case "CircleContentWrapper":
            return (
              <CircleContentWrapper key={i.toString()}>
                <DynamicComponentMatcher
                  {...component.props}
                ></DynamicComponentMatcher>
              </CircleContentWrapper>
            );
            case "MediaWithExpantion":
              return (
                <MediaWithExpantion 
                {...component.props}
                key={i.toString()}>
                </MediaWithExpantion>
              );

          case 'MainMenu':
            return <MainMenu {...component.props} key={i.toString()}></MainMenu>;
          case 'SchoolsMenu':
            return <SchoolsMenu {...component.props} key={i.toString()}></SchoolsMenu>
          default:
            return "";
        }
      })}
    </Fragment>
  );
}
export default (DynamicComponentMatcher)
