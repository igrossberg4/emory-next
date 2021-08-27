import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import "../styles/embla.scss";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import Store from "../state/Store";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <CookiesProvider>
    <Store>
      <Component {...pageProps} key={router.route} />
    </Store>
    </CookiesProvider>
  );
}
export default MyApp;

