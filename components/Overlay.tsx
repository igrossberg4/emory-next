import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../state/Store";

// eslint-disable-next-line react/display-name
export const Overlay = forwardRef((props: any, ref: any) => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useContext(Context) as any;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (expanded) {
        switch (e.key) {
          case "Escape":
            setExpanded(false);
            dispatch({ type: "IS_OVERLAY_EXPANDED", payload: false });
            document.body.style.overflow = "";
            if (props.onOverlayClose) props.onOverlayClose();
            return;
        }
      }
    },
    [expanded]
  );
  useImperativeHandle(
    ref,
    () => ({
      expand(value: boolean) {
        setExpanded(!expanded);
      },
    }),
    [expanded, setExpanded]
  );
  useEffect(() => {
    document.body.addEventListener("keydown", handleKey, { passive: false });
    return () => document.body.removeEventListener("keydown", handleKey);
  }, [expanded]); // @ts-ignore
  return (
    <Fragment>
      <div
        onClick={() => {
          setExpanded(true);
          document.body.style.overflow = "hidden";
          dispatch({ type: "IS_OVERLAY_EXPANDED", payload: true });
          if (props.onOverlayOpen) props.onOverlayOpen();
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
            transition={{ duration: 0.25 }}
            className="container-force-screen-fit-y overlay"
            style={{ pointerEvents: "auto" }}
          >
            <button
              type="button"
              className="close-popup text-label"
              onClick={() => {
                setExpanded(false);
                dispatch({ type: "IS_OVERLAY_EXPANDED", payload: false });
                if (props.onOverlayClose) props.onOverlayClose();
                document.body.style.overflow = "";
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
});
export default Overlay;
