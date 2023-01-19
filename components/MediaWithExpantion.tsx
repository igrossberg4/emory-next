import React, { Fragment, useCallback, useContext, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Video from "./Video";
import IconButton from "./IconButton";
import Overlay from "./Overlay";
import { imageLoader } from "./utils/imageLoader";
import Audio from "./Audio";
import AsdfCarousel from "./AsdfCarousel";
import classNames from "classnames";

export default function MediaWithExpantion(props: any) {
  let multipleSizesImgPrincipal;
  let multipleSizesImgExpanded;

  multipleSizesImgPrincipal = require(`../public/images/${
    props.img_src ? props.img_src : props.media_src
  }?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);
  if (props.media_type != "video") {
    multipleSizesImgExpanded = require(`../public/images/${props.media_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=1200,sizes[]=2048&format=png`);
  }

  const onSlideClick = useCallback(() => {
    if (props.galleryApi && props.galleryApi.clickAllowed()) {
      // You might wanna check that the zoom mode isn't active here too

      // Re-initalize Embla without pointer interactions
      props.galleryApi.reInit({ draggable: false });

      // Activate zoom here because Embla says the pointer interaction was a click and NOT a drag move
    }
  }, [props.galleryApi]);

  const handleOverlayOpen = () => {
    // code to run when overlay is closed
    // Fix for carousels with galleries
    var elements = document.getElementsByClassName("embla__container");
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.setProperty(
        "transform",
        "none",
        "important"
      );
    }
    () => onSlideClick();
  };

  const handleOverlayClose = () => {
    // code to run when overlay is closed
    // Fix for carousels with galleries
    var elements = document.getElementsByClassName("embla__container");
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.setProperty("transform", "none");
    }

    if (props.galleryApi) {
      props.galleryApi.reInit({ draggable: true });
    }
  };

  //const files = fs.readdirSync(__dirname);
  //const moduleName = path.join(__dirname, files[0]);
  return (
    <>
      <div
        className={`component-media-with-expansion${
          props.links && props.links.length > 0
            ? " component-media-with-expansion--has-link"
            : ""
        }${props.disabled ? " component-media-with-expansion--disabled" : ""}`}
      >
        <motion.figure
          className={classNames("round-wp", {
            ["size--" + props.size]: props.size !== "normal",
            teaser__image_carousel: props.is_carousel,
          })}
          // layout
          // layoutId={layoutId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.figure
          // layout
          // layoutId={layoutId}
          // initial={{ opacity: 1 }}
          // animate={{ opacity: 1 }}
          >
            <img
              className={classNames({
                teaser__image: props.is_carousel,
              })}
              alt={props.media_alt}
              srcSet={multipleSizesImgPrincipal.srcSet}
              src={multipleSizesImgPrincipal.src}
              style={props.img_size ? { objectFit: props.img_size } : {}}
            />
          </motion.figure>
          {props.disabled && <div className="image-overlay" />}
        </motion.figure>
        {!props.disabled && (
          <Overlay
            onOverlayOpen={handleOverlayOpen}
            onOverlayClose={handleOverlayClose}
            is_carousel={true}
            expand_action={
              !props.hide_icons ? (
                <div className="actions" onClick={() => onSlideClick()}>
                  {props.media_type === "image" ? (
                    <IconButton icon={"eye"} label="See more"></IconButton>
                  ) : (
                    <IconButton icon={"play"} label="See more" />
                  )}
                </div>
              ) : (
                ""
              )
            }
            expanded_content={
              <>
                <motion.figure data-media={props.media_type}>
                  {props.type === "gallery" ? (
                    <AsdfCarousel slides={props.slides}></AsdfCarousel>
                  ) : props.media_type === "image" ? (
                    <div className="image-wrapper">
                      <Image
                        loader={imageLoader(multipleSizesImgExpanded) as any}
                        priority={true}
                        alt={props.media_alt}
                        src={multipleSizesImgExpanded.src}
                        layout={"responsive"}
                        width={multipleSizesImgExpanded.width}
                        height={multipleSizesImgExpanded.height}
                      ></Image>
                    </div>
                  ) : (
                    <Video {...props} controls={true}></Video>
                  )}
                  <figcaption className="overlay__text">
                    <h6 className="title text-body">{props.header}</h6>
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: props.text }}
                    />
                    {props.byline && (
                      <div
                        className="byline"
                        dangerouslySetInnerHTML={{ __html: props.byline }}
                      />
                    )}
                  </figcaption>
                </motion.figure>
              </>
            }
          />
        )}
        {props.links && (
          <div className="links">
            {props.links.map((link: any, idx: number) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                <img src={`/${link.icon}`} alt={link.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
