import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { getAlt } from "../../Components/nonReactive/getAlt";
import BrowserInfo from "../../Components/GeneralInfo";
import Sidebar from "./Sidebar";
import AccountHistory from "./AccountHistory";
import Tooltip from "../../Components/Tooltip/Tooltip";

function clickAlt(
	genAlt: () => Promise<any>,
	setCurAlt: React.Dispatch<React.SetStateAction<string>>,
	setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>,
	setTooltipMessage: (newMessage: string) => void,
	setGennedAltsNum: React.Dispatch<React.SetStateAction<number>>
): void {
	getAlt()
		.then((alt) => {
			setCurAlt(alt);
			setAccountHistory((oldArr) => [...oldArr, alt]);
			setGennedAltsNum((curNum) => curNum + 1);
		})
		.catch(setTooltipMessage);
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
	const [tooltipMessage, setTooltipMessage] = useState<string>(
		"Welcome to your dashboard!"
	);
	const [tooltipActive, setTooltipActive] = useState<boolean>(true);

	useEffect(() => {
		if (tooltipActive) {
			setTimeout(() => setTooltipActive(false), 2000);
		}
	}, [tooltipActive]);

	function secondarySetTooltipMessage(newMessage) {
		setTooltipActive(true);
		setTooltipMessage(newMessage);
	}

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
					<div className="dashboardContainer">
						<Card name="Generate an alt" mode="column">
							<GenerateAltBtn
								setCurAlt={setCurAlt}
								setGennedAltsNum={setGennedAltsNum}
								setAccountHistory={setAccountHistory}
								setTooltipMessage={secondarySetTooltipMessage}
							/>
							<AltBox curAlt={curAlt} />
							<CopyToClipboard
								curAlt={curAlt}
								setTooltipMessage={secondarySetTooltipMessage}
							/>
						</Card>
						<Card name="Alt info" mode="row">
							Coming soon
						</Card>
						<Card name="Generated alts" mode="row">
							<AltCounter genAltCount={gennedAltsNum} />
						</Card>
					</div>
				</div>
			) : (
				<AccountHistory
					accountHistory={accountHistory}
					setAccountHistory={setAccountHistory}
					setTooltipMessage={secondarySetTooltipMessage}
				/>
			)}
			<BrowserInfo className="generalInfo" />
			<Sidebar tab={tab} setTab={setTab} />
			<Tooltip message={tooltipMessage} active={tooltipActive} />
		</>
	);
});

const Card = React.memo(function Card({
	children,
	name,
	mode,
}: {
	children: React.ReactNode;
	name: string;
	mode: "row" | "column";
}) {
	return (
		<div className="card">
			<h1>{name}</h1>
			<div className={`content-container ${mode}`}>{children}</div>
		</div>
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
	return (
		<>
			<label htmlFor="altBox">Alt</label>
			<input type="text" name="altBox" value={curAlt} readOnly />
		</>
	);
});

const CopyToClipboard = React.memo(function CopyToClipboard({
	curAlt,
	setTooltipMessage,
}: {
	curAlt: string;
	setTooltipMessage: (newMessage: string) => void;
}) {
	return (
		<button
			onClick={() =>
				navigator.clipboard
					.writeText(curAlt)
					.then(() => setTooltipMessage("Copied!"))
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
	setTooltipMessage,
}: {
	setCurAlt: React.Dispatch<React.SetStateAction<string>>;
	setGennedAltsNum: React.Dispatch<React.SetStateAction<number>>;
	setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
	setTooltipMessage: (newMessage: any) => void;
}) {
	return (
		<button
			onClick={() =>
				clickAlt(
					getAlt,
					setCurAlt,
					setAccountHistory,
					setTooltipMessage,
					setGennedAltsNum
				)
			}
		>
			Generate alt
		</button>
	);
});
