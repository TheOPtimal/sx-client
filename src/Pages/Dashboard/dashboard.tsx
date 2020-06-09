import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { getAlt } from "../../Components/nonReactive/getAlt";
import useInterval from "../../Components/useInterval";
import Info from "../../Components/GeneralInfo";
import BrowserInfo from "../../Components/GeneralInfo";

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
    <>
      <div className="dashboard">
        <LogOut />
        <AltBox curAlt={curAlt} />
        <button onClick={clickAlt}>Generate alt</button>
        <CopyToClipboard curAlt={curAlt} />
      </div>
      <BrowserInfo className="generalInfo" />
    </>
  );
}

const AltBox = React.memo(function AltBox({ curAlt }: { curAlt: string }) {
  return <input type="text" value={curAlt} />;
});

const CopyToClipboard = React.memo(function CopyToClipboard({ curAlt }: { curAlt: string }) {
  return (
    <button
      onClick={() =>
        navigator.clipboard.writeText(curAlt).then(() => alert("Copied!"))
      }
    >
      Copy
    </button>
  );
});

const LogOut = React.memo(function LogOut() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.open("/", "_self");
      }}
    >
      Log Out
    </button>
  );
});
