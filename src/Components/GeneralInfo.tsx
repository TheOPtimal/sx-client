import React from "react";
import * as appInfo from "./nonReactive/appInfo";

export default function BrowserInfo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div>{navigator.appCodeName}</div>
      <div>
        {navigator.appName} {navigator.appVersion} on {navigator.platform} using{" "}
        {navigator.product}
      </div>
      <div>{navigator.userAgent}</div>
      <div>{navigator.vendor}</div>
      <div>
        {appInfo.appName} {appInfo.appVersion} {appInfo.appBuild} build
      </div>
    </div>
  );
}
