import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { getAlt } from "../../Components/nonReactive/getAlt";
import BrowserInfo from "../../Components/GeneralInfo";
import Sidebar from "./Sidebar";
import AccountHistory from "./AccountHistory";

function clickAlt(
  genAlt: () => Promise<any>,
  setCurAlt: React.Dispatch<React.SetStateAction<string>>,
  setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>
): void {
  getAlt()
    .then((alt) => {
      setCurAlt(alt);
      setAccountHistory((oldArr) => [...oldArr, alt]);
    })
    .catch(alert);
}

export default React.memo(function Dashboard() {
  const [curAlt, setCurAlt] = useState("");
  const [gennedAltsNum, setGennedAltsNum] = useState<number>(
    Number.parseInt(localStorage.getItem("gennedAlts")) || 0
  );
  const [tab, setTab] = useState<"dashboard" | "history">("dashboard");
  const [accountHistory, setAccountHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("accHistory")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("accHistory", JSON.stringify(accountHistory));
  }, [accountHistory]);

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
          <GenerateAltBtn
            setCurAlt={setCurAlt}
            setGennedAltsNum={setGennedAltsNum}
            setAccountHistory={setAccountHistory}
          />
          <AltBox curAlt={curAlt} />
          <CopyToClipboard curAlt={curAlt} />
        </div>
      ) : (
        <AccountHistory
          accountHistory={accountHistory}
          setAccountHistory={setAccountHistory}
        />
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
  return <input type="text" value={curAlt} readOnly />;
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

const GenerateAltBtn = React.memo(function GenerateAltBtn({
  setCurAlt,
  setGennedAltsNum,
  setAccountHistory,
}: {
  setCurAlt: React.Dispatch<React.SetStateAction<string>>;
  setGennedAltsNum: React.Dispatch<React.SetStateAction<number>>;
  setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <button
      onClick={() => {
        clickAlt(getAlt, setCurAlt, setAccountHistory);
        setGennedAltsNum((curNum) => curNum + 1);
        // setAccountHistory(oldArr => [...oldArr, ])
      }}
    >
      Generate alt
    </button>
  );
});
