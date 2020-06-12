import React, { useState } from "react";
import useInterval from "./nonReactive/useInterval";

export default React.memo(function Clock() {
  const [time, setTime] = useState(new Date());

  useInterval(() => {
    setTime(new Date());
  }, 500);

  return <div className="clock">{time.toLocaleTimeString()}</div>;
});
