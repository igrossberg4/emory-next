import Head from "next/head";
import React, { Fragment } from "react";
import Image from "next/image";
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
const Quote = dynamic(()=> import('./Quote'));
const VideoQuote = dynamic(()=> import('./VideoQuote'));
const ColumnsText = dynamic(()=> import('./ColumnsText'));
const QuoteParagraphColumn = dynamic(()=> import('./QuoteParagraphColumn'));
const TextBg = dynamic(()=> import('./TextBg'));
const Footer = dynamic(()=> import('./Footer'));
const TextImageBg = dynamic(()=> import('./TextImageBg'));
const Carousel = dynamic(()=> import('./Carousel'));
const CampaignCarousel = dynamic(()=> import('./CampaignCarousel'));
const Audio = dynamic(()=> import('./Audio'));
const Teaser = dynamic(()=> import('./Teaser'));
const CarouselItem2036 = dynamic(()=> import('./CarouselItem2036'));
const TextImageHeader = dynamic(()=> import('./TextImageHeader'));
const TextLargeImage = dynamic(()=> import('./TextLargeImage'));
const Tag = dynamic(()=> import('./Tag'));
const Header = dynamic(()=> import('./Header'));
const ImageTextOneColumn = dynamic(()=> import('./ImageTextOneColumn'));

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

          case 'Quote':
            return <Quote {...component.props} key={i.toString()}></Quote>

          case 'VideoQuote':
            return <VideoQuote {...component.props} key={i.toString()}></VideoQuote>

          case 'ColumnsText':
            return <ColumnsText {...component.props} key={i.toString()}></ColumnsText>

          case 'QuoteParagraphColumn':
            return <QuoteParagraphColumn {...component.props} key={i.toString()}></QuoteParagraphColumn>

          case 'TextBg':
            return <TextBg {...component.props} key={i.toString()}></TextBg>

          case 'Footer':
            return <Footer {...component.props} key={i.toString()}></Footer>

          case 'TextImageBg':
            return <TextImageBg {...component.props} key={i.toString()}></TextImageBg>

          case 'CampaignCarousel':
            return <CampaignCarousel {...component.props} key={i.toString}></CampaignCarousel>

          case 'Audio':
            return <Audio {...component.props} key={i.toString()}></Audio>

          case 'Teaser':
            return <Teaser {...component.props} key={i.toString()}></Teaser>

            case "MediaWithExpantion":
              return (
                <MediaWithExpantion
                {...component.props}
                key={i.toString()}>
                </MediaWithExpantion>
              );

          case 'CarouselItem2036':
            return (<CarouselItem2036 key={i.toString()}
              {...component.props}></CarouselItem2036>)

          case 'TextImageHeader':
            return <TextImageHeader {...component.props} key={i.toString()}></TextImageHeader>

          case 'TextLargeImage':
            return <TextLargeImage {...component.props} key={i.toString()}></TextLargeImage>

          case 'Tag':
            return <Tag {...component.props} key={i.toString()}></Tag>

          case 'Header':
            return <Header {...component.props} key={i.toString()}></Header>

          case 'ImageTextOneColumn':
            return <ImageTextOneColumn {...component.props} key={i.toString()}></ImageTextOneColumn>

          default:
            return "";
        }
      })}
    </Fragment>
  );
}
export default (DynamicComponentMatcher)
