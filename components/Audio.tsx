import Head from "next/head";
import React, { Fragment, useContext, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";
import IconButton from "./IconButton";

export default function Audio(props: any) {
  const audioRef = useRef<HTMLAudioElement>();
  const [isPlaying, setPlaying] = useState(false);
  const multipleSizesImgPrincipal = require(`../public/images/${(props.img_src)}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`);

  return (
    <div className="section audio">
      <div className="container">
        <div className="audio__image">
          <img alt={props.img_alt} src={multipleSizesImgPrincipal.src} srcSet={multipleSizesImgPrincipal.srcSet} ></img>
          {isPlaying ? (
            <div onClick={(e) => { audioRef?.current?.pause(); }}>
              <IconButton icon="pause" label="Pause"></IconButton>
            </div>
          ) : (
            <div onClick={(e) => { audioRef?.current?.play(); }}>
              <IconButton icon="play" label="play"></IconButton>
            </div>
          )}
        </div>
        <audio
          onPause={(e) => { setPlaying(false); }}
          onPlay={(e) => { setPlaying(true); }}
          ref={(ref) => {
            if (ref) {
              audioRef.current = ref;
            }
          }}
          controls
          controlsList="nodownload"
          src={props.audio_src}
        ></audio>
      </div>
    </div>
  );
}
