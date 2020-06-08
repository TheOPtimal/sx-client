import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { getAlt } from "../../Components/nonReactive/getAlt";
import useInterval from "../../Components/useInterval";

export default function Dashboard() {
  const [curAlt, setCurAlt] = useState("");
  const [autoGen, setAutoGen] = useState<boolean>(false);
  const [intervalDelay, setIntervalDelay] = useState(2);
  const intervalRef = useRef(null);

  function clickAlt(): void {
    getAlt()
      .then((alt) => {
        setCurAlt(alt);
      })
      .catch(alert);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.open("/", "_self");
    }
  }, []);

  useEffect(() => {
    if (autoGen) {
      clickAlt();
      intervalRef.current = setInterval(clickAlt, intervalDelay * 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoGen, intervalDelay]);

  return (
    <div className="dashboard">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.open("/", "_self");
        }}
      >
        Log Out
      </button>
      <input type="text" value={curAlt} />
      <button onClick={clickAlt}>Generate alt</button>
    </div>
  );
}
