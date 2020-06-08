import React from "react";

export default function BrowserInfo() {
  return (
    <div>
      <div>{navigator.appCodeName}</div>
      <div>
        {navigator.appName} {navigator.appVersion} on {navigator.platform} using{" "}
        {navigator.product}
      </div>
      <div>{navigator.userAgent}</div>
    </div>
  );
}
