import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import "./Sidebar.scss";

export default function Sidebar({
  tab,
  setTab,
}: {
  tab: "dashboard" | "history";
  setTab: React.Dispatch<React.SetStateAction<"dashboard" | "history">>;
}) {
  return (
    <ul className="sidebar">
      <li onClick={() => setTab("dashboard")}>
        <HomeIcon className="icon" /> <span>Dashboard</span>
      </li>
      <li onClick={() => setTab("history")} >
        <HistoryIcon className="icon" />
        <span>History</span>
      </li>
    </ul>
  );
}
