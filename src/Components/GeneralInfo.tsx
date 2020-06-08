import React from "react";
import * as appInfo from "./nonReactive/appInfo";

export default function BrowserInfo() {
  return (
    <div>
      <div>{navigator.appCodeName}</div>
      <div>
        {navigator.appName} {navigator.appVersion} on {navigator.platform} using{" "}
        {navigator.product}
      </div>
      <div>{navigator.userAgent}</div>
      <div>{navigator.vendor}</div>
      <div>
        {appInfo.appName} {appInfo.appVersion}
      </div>
    </div>
  );
}
