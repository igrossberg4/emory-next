import { useAnimation } from "framer-motion";
import React, { createContext, useReducer } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import Reducer from "./Reducer";

export interface IVideoController {
  paused: boolean;
  muted: boolean;
  videoRef: HTMLVideoElement;
  skipped: boolean;
}
export interface IStore {
  videoStore: { [key: string]: IVideoController };
  route: string;
}

const initialState = {
  route: "",
  activeFocusXPATH: "",
  videoStore: {},
  videoPlayed: process.browser ? localStorage.getItem("video_played") : "not",
  // This properties indicates that the navigation is coming from carousel and is required for avoid video animation.
  comesFromCarousel: false,
  isCircleExpanded: process.browser ? window.scrollY > 1 : false,
  scrollComesFromUser: false,
  isTransitionEnd: true,
  isCircleOnAnimation: false,
  isVideoOnExpansion: false,
  isOverlayExpanded: false,
  captionVideoEnabled: false,
  hideBanner: process.browser ? !!localStorage.getItem('hide_banner') : true
};

const Store = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch] as any}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
