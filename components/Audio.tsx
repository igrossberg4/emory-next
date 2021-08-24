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
  return (
    <div className="section audio">
      <div className="container">
        <div className="audio__image">
          <img alt={props.img_alt} src={props.img_src}></img>
          {isPlaying ? (
            <div onClick={(e) => { audioRef?.current?.pause(); }}>
              <IconButton icon="pause"></IconButton>
            </div>
          ) : (
            <div onClick={(e) => { audioRef?.current?.play(); }}>
              <IconButton icon="play"></IconButton>
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
