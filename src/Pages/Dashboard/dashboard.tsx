import React, { useState, useEffect, useRef } from "react";
import "./dashboard.scss";
import { getAlt } from "../../Components/nonReactive/getAlt";
import useInterval from "../../Components/useInterval";
import Info from "../../Components/GeneralInfo";
import BrowserInfo from "../../Components/GeneralInfo";
import Clock from "../../Components/Clock";

function clickAlt(
  genAlt: () => Promise<any>,
  setCurAlt: React.Dispatch<React.SetStateAction<string>>
): void {
  getAlt()
    .then((alt) => {
      setCurAlt(alt);
    })
    .catch(alert);
}

export default React.memo(function Dashboard() {
  const [curAlt, setCurAlt] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.open("/", "_self");
    }
  }, []);

  return (
    <>
      <Clock />
      <div className="dashboard">
        <LogOut />
        <AltBox curAlt={curAlt} />
        <GenerateAltBtn setCurAlt={setCurAlt} />
        <CopyToClipboard curAlt={curAlt} />
      </div>
      <BrowserInfo className="generalInfo" />
    </>
  );
});

const AltBox = React.memo(function AltBox({ curAlt }: { curAlt: string }) {
  return <input type="text" value={curAlt} />;
});

const CopyToClipboard = React.memo(function CopyToClipboard({
  curAlt,
}: {
  curAlt: string;
}) {
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
function GenerateAltBtn({
  setCurAlt,
}: {
  setCurAlt: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button onClick={() => clickAlt(getAlt, setCurAlt)}>Generate alt</button>
  );
}
