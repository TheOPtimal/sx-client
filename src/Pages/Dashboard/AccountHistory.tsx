import React from "react";
import "./AccountHistory.scss";

export default React.memo(function AccountHistory({
	accountHistory,
	setAccountHistory,
	setTooltipMessage,
}: {
	accountHistory: string[];
	setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
	setTooltipMessage: (newMessage: any) => void;
}) {
	return (
		<div className="accountHistory">
			<div className="accounts">
				{accountHistory.map((acc, i) => (
					<Account account={acc} key={i} alert={setTooltipMessage} />
				))}
			</div>
			<Clear setAccountHistory={setAccountHistory} alert={setTooltipMessage} />
		</div>
	);
});

const Clear = React.memo(function Clear({
	setAccountHistory,
	alert,
}: {
	setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
	alert: (newMessage: any) => void;
}) {
	return (
		<button
			className="clear"
			onClick={() => {
				setAccountHistory([]);
				alert("Cleared!");
			}}
		>
			Clear
		</button>
	);
});

const Account = React.memo(function Account({
	account,
	alert,
}: {
	account: string;
	alert: (newMessage: any) => void;
}) {
	return (
		<div
			className="account"
			onClick={() => navigator.clipboard.writeText(account) && alert("Copied!")}
		>
			{account}
		</div>
	);
});
