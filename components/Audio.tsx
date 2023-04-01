import React, { useRef, useState } from "react";
import IconButton from "./IconButton";

export default function Audio(props: any) {
  const audioRef = useRef<HTMLAudioElement>();
  const [isPlaying, setPlaying] = useState(false);
  const [buttonHasUpdated, updatedButton] = useState(false);
  // const multipleSizesImgPrincipal = require(`../public/images/${props.img_src}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);

  let multipleSizesImgPrincipal;

  if (!props.hosted_externally) {
    multipleSizesImgPrincipal = require(`../public/images/${
      props.img_src ? props.img_src : props.media_src
    }?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);
  } else {
  }

  return (
    <div className="section audio">
      <div className="container">
        <div className="audio__image">
          <img
            alt={props.img_alt}
            src={
              props.hosted_externally
                ? props.thumb_src
                  ? props.thumb_src
                  : props.media_src
                : multipleSizesImgPrincipal.src
            }
            srcSet={
              props.hosted_externally ? null : multipleSizesImgPrincipal.srcSet
            }
          ></img>
          {isPlaying && (
            <div
              onClick={(e) => {
                updatedButton(true);
                audioRef?.current?.pause();
              }}
              className={buttonHasUpdated ? "updated" : ""}
            >
              <IconButton icon="audio-pause" label="Pause"></IconButton>
            </div>
          )}
          {!isPlaying && (
            <div
              onClick={(e) => {
                updatedButton(true);
                audioRef?.current?.play();
              }}
              className={buttonHasUpdated ? "updated" : ""}
            >
              <IconButton icon="audio-play" label="play"></IconButton>
            </div>
          )}
        </div>
        <audio
          onPause={(e) => {
            setPlaying(false);
          }}
          onPlay={(e) => {
            setPlaying(true);
          }}
          ref={(ref) => {
            if (ref) {
              audioRef.current = ref;
            }
          }}
          controls
          controlsList="nodownload"
          src={props.media_src}
        />
      </div>
    </div>
  );
}
