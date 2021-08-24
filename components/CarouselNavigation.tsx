import dynamic from "next/dynamic";
import React, { Fragment, useContext, useRef } from "react";

const EmblaCarousel = dynamic(()=> import('./Carousel'));

export default function CarouselNavigation(props: any) {
  return <EmblaCarousel key="id" navigation={true} slides={props.slides} actual={props} />;
}
