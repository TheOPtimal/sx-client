import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import "./Sidebar.scss";
import SXLogo from "../../Images/SXaccounts.svg";
import LogOutIcon from "../../Images/LogOut";

export default function Sidebar({
	// tab,
	setTab,
}: {
	tab: "dashboard" | "history";
	setTab: React.Dispatch<React.SetStateAction<"dashboard" | "history">>;
}) {
	return (
		<ul className="sidebar">
			<li>
				<img
					src={SXLogo}
					alt="S--X logo"
					className="icon"
					style={{
						boxShadow: "0px 0px 5px black",
						borderRadius: "2px",
					}}
				/>
				<span>S--X</span>
			</li>
			<li onClick={() => setTab("dashboard")}>
				<HomeIcon className="icon" /> <span>Dashboard</span>
			</li>
			<li onClick={() => setTab("history")}>
				<HistoryIcon className="icon" />
				<span>History</span>
			</li>
			<li
				onClick={() => {
					localStorage.removeItem("token");
					window.open("/", "_self");
				}}
				className="flex-end"
			>
				<LogOutIcon className="icon" />
				<span>Log Out</span>
			</li>
		</ul>
	);
}
