import React, {Fragment, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overlay(props: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Fragment>
      <div
        onClick={() => {
          setExpanded(true);
        }}
      >
        {props.expand_action}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            // layoutId={layoutId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="container-force-screen-fit-y overlay"
            style={{ pointerEvents: "auto" }}
          >
            <button
              className="close-popup text-label"
              onClick={() => {
                setExpanded(false);
              }}
            >
              Close
            </button>
            {props.expanded_content}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
