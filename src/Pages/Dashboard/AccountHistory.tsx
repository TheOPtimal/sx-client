import React from "react";
import "./AccountHistory.scss";

export default React.memo(function AccountHistory({
  accountHistory,
  setAccountHistory,
}: {
  accountHistory: string[];
  setAccountHistory: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="accountHistory">
      <div className="accounts">
        {accountHistory.map((acc, i) => (
          <Account account={acc} key={i} />
        ))}
      </div>
      <button className="clear" onClick={() => setAccountHistory([])}>
        Clear
      </button>
    </div>
  );
});

const Account = React.memo(function Account({ account }: { account: string }) {
  return (
    <div
      className="account"
      onClick={() => navigator.clipboard.writeText(account)}
    >
      {account}
    </div>
  );
});
