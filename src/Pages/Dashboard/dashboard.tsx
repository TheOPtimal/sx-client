import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { getAlt } from "../../Components/nonReactive/getAlt";
import BrowserInfo from "../../Components/GeneralInfo";
import Sidebar from "./Sidebar";

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
  const [gennedAltsNum, setGennedAltsNum] = useState<number>(
    Number.parseInt(localStorage.getItem("gennedAlts")) || 0
  );
  const [tab, setTab] = useState<"dashboard" | "history">("dashboard")
  // const [accountHistory, setAccountHistory] = useState<string[]>(
  //   JSON.parse(localStorage.getItem("accHistory")) ?? []
  // );

  // useEffect(() => {
  //   localStorage.setItem("accHistory", JSON.stringify(accountHistory));
  // }, [accountHistory]);

  useEffect(() => {
    localStorage.setItem("gennedAlts", JSON.stringify(gennedAltsNum));
  }, [gennedAltsNum]);

  // useEffect(() => {
  //   if (curAlt !== "") {
  //     setAccountHistory((oldArr) => [...oldArr, curAlt]);
  //   }
  // }, [curAlt]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.open("/", "_self");
    }
  }, []);

  return (
    <>
      {tab === "dashboard" ? (
        <div className="dashboard">
          <LogOut />
          <AltBox curAlt={curAlt} />
          <GenerateAltBtn
            setCurAlt={setCurAlt}
            setGennedAltsNum={setGennedAltsNum}
            // setAccountHistory={setAccountHistory}
          />
          <CopyToClipboard curAlt={curAlt} />
        </div>
      ) : (
        <AccountHistory />
      )}
      <BrowserInfo className="generalInfo" />
      <AltCounter genAltCount={gennedAltsNum} />
      <Sidebar tab={tab} setTab={setTab} />
    </>
  );
});

const AltCounter = React.memo(function AltCounter({
  genAltCount,
}: {
  genAltCount: number;
}) {
  return <div className="altsNum">Generated Alts: {genAltCount}</div>;
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
const GenerateAltBtn = React.memo(function GenerateAltBtn({
  setCurAlt,
  setGennedAltsNum,
}: // setAccountHistory,
{
  setCurAlt: React.Dispatch<React.SetStateAction<string>>;
  setGennedAltsNum: React.Dispatch<React.SetStateAction<number>>;
  // setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <button
      onClick={() => {
        clickAlt(getAlt, setCurAlt);
        setGennedAltsNum((curNum) => curNum + 1);
        // setAccountHistory(oldArr => [...oldArr, ])
      }}
    >
      Generate alt
    </button>
  );
});

const AccountHistory = React.memo(function AccountHistory() {
  return (
    <>
      <button>Open Account History</button>
    </>
  );
});
