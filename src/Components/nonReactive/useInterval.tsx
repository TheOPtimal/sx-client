import { useRef, useEffect } from "react";
import { callback } from "../types";

export default function useInterval(callback: callback, delay: number) {
  const savedCallback = useRef(callback); // This is where we will store the callback

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
